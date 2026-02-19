import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import BreadCrumb from "../../BreadCrumb/BreadCrumb";
import HelmetChanger from "../../Shared/Helmet/Helmet";

// Package options matching Packages page (used for dropdown and URL param pre-selection)
export const PACKAGE_OPTIONS = [
  { id: "essence-getaway", name: "The Essence Getaway", price: "$1,660", durationDays: 3, durationNights: 2 },
  { id: "indulge-stay", name: "Indulge Stay", price: "$2,900", durationDays: 5, durationNights: 4 },
  { id: "serenity-week", name: "Serenity Week", price: "$3,680", durationDays: 5, durationNights: 4 },
  { id: "imperial-retreat", name: "Imperial Retreat", price: "$5,180", durationDays: 5, durationNights: 4 },
];

// solving the issue of api keys related errors 
// Same source as ServiceDetails – breakfast, lunch, dinner menus from food.menu.json
const CUSTOM_MENU_PLACEHOLDER =
  "Mention your cuisine preference, dietary restrictions, specific dishes, allergies, or any special requests here.";

const PERSONALIZATION_PLACEHOLDER =
  "Mention any celebration themes, surprise arrangements, romantic décor, adventure preferences, accessibility needs, or any other custom experience requests.";

function addDaysToISODate(isoDate, daysToAdd) {
  if (!isoDate || Number.isNaN(daysToAdd)) return "";
  const parts = isoDate.split("-").map((v) => parseInt(v, 10));
  if (parts.length !== 3 || parts.some((n) => Number.isNaN(n))) return "";

  const [year, month, day] = parts;
  const dt = new Date(Date.UTC(year, month - 1, day));
  dt.setUTCDate(dt.getUTCDate() + daysToAdd);
  return dt.toISOString().slice(0, 10);
}

function getTodayISODateLocal() {
  const now = new Date();
  const y = now.getFullYear();
  const m = String(now.getMonth() + 1).padStart(2, "0");
  const d = String(now.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}

const Booking = () => {
  const [searchParams] = useSearchParams();
  const packageParam = searchParams.get("package") || "";

  const [menu, setMenu] = useState([]);
  const [packageId, setPackageId] = useState("");
  const [breakfastMenu, setBreakfastMenu] = useState("");
  const [lunchMenu, setLunchMenu] = useState("");
  const [dinnerMenu, setDinnerMenu] = useState("");
  const [customBreakfast, setCustomBreakfast] = useState(false);
  const [customLunch, setCustomLunch] = useState(false);
  const [customDinner, setCustomDinner] = useState(false);
  const [customBreakfastNotes, setCustomBreakfastNotes] = useState("");
  const [customLunchNotes, setCustomLunchNotes] = useState("");
  const [customDinnerNotes, setCustomDinnerNotes] = useState("");
  const [additionalRequests, setAdditionalRequests] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [fieldErrors, setFieldErrors] = useState({});

  // Primary guest information (person making the booking)
  const [mainGuest, setMainGuest] = useState({
    name: "",
    age: "",
    gender: "",
    email: "",
    phone: "",
  });

  // Number of additional people (0–4)
  const [additionalPeople, setAdditionalPeople] = useState(0);

  const MAX_ADDITIONAL_PEOPLE = 4;
  const ADDITIONAL_GUEST_CHARGE = 60; // $60 per additional person

  // Dates
  const [arrivalDate, setArrivalDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const todayISO = getTodayISODateLocal();
  // CHECKING CHANGESS
  // Load menu from same JSON as ServiceDetails (breakfast, lunch, dinner)
  useEffect(() => {
    fetch("/food.menu.json")
      .then((res) => res.json())
      .then((data) => setMenu(data));
  }, []);

  const breakfastMenus = menu.filter((item) => item.category === "breakfast");
  const lunchMenus = menu.filter((item) => item.category === "lunch");
  const dinnerMenus = menu.filter((item) => item.category === "dinner");

  // Pre-select package when coming from Packages page via ?package=id
  useEffect(() => {
    if (packageParam && PACKAGE_OPTIONS.some((p) => p.id === packageParam)) {
      setPackageId(packageParam);
    }
  }, [packageParam]);

  // Calculate additional guest charges
  const additionalGuestCount = additionalPeople;
  const additionalCharges = additionalGuestCount * ADDITIONAL_GUEST_CHARGE;

  // Calculate total price
  const packagePriceValue = packageId
    ? parseFloat(PACKAGE_OPTIONS.find((p) => p.id === packageId)?.price.replace(/[^0-9.]/g, "") || 0)
    : 0;
  const totalPrice = packagePriceValue + additionalCharges;

  const selectedPackage = PACKAGE_OPTIONS.find((p) => p.id === packageId) || null;
  const packageDurationDays = selectedPackage?.durationDays || 0;
  const packageDurationNights = selectedPackage?.durationNights || 0;

  // Auto-calculate end date based on package duration (departure = arrival + nights)
  useEffect(() => {
    if (!arrivalDate || !packageDurationDays) {
      setEndDate("");
      return;
    }

    const daysToAdd = Math.max(packageDurationDays - 1, 0);
    setEndDate(addDaysToISODate(arrivalDate, daysToAdd));
  }, [arrivalDate, packageDurationDays]);

  // Prevent past dates (in case of autofill / manual edits)
  useEffect(() => {
    if (arrivalDate && arrivalDate < todayISO) {
      setArrivalDate("");
      setEndDate("");
    }
  }, [arrivalDate, todayISO]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");
    setFieldErrors({});
    const newErrors = {};

    // --- A. Package selection ---

    if (!packageId) {
      newErrors.package = "Please select a package.";
    }

    // --- B. Meal preferences & custom menus ---
    // For each meal: either a default menu OR custom notes are required.
    if (!customBreakfast && !breakfastMenu) {
      newErrors.breakfastMenu = "Please select a breakfast menu or choose a custom menu.";
    }
    if (customBreakfast && !customBreakfastNotes.trim()) {
      newErrors.breakfastMenu = "Please describe your custom breakfast preferences.";
    }

    if (!customLunch && !lunchMenu) {
      newErrors.lunchMenu = "Please select a lunch menu or choose a custom menu.";
    }
    if (customLunch && !customLunchNotes.trim()) {
      newErrors.lunchMenu = "Please describe your custom lunch preferences.";
    }

    if (!customDinner && !dinnerMenu) {
      newErrors.dinnerMenu = "Please select a dinner menu or choose a custom menu.";
    }
    if (customDinner && !customDinnerNotes.trim()) {
      newErrors.dinnerMenu = "Please describe your custom dinner preferences.";
    }

    // --- C. Personalization notes ---
    if (!additionalRequests.trim()) {
      newErrors.additionalRequests = "Please add your personalization notes.";
    }

    // --- D. Dates ---
    if (!arrivalDate) {
      newErrors.arrivalDate = "Please select your arrival date.";
    }
    if (arrivalDate && packageDurationDays && !endDate) {
      newErrors.endDate = "End date could not be calculated. Please reselect your arrival date.";
    }

    // --- E. Primary guest information ---
    if (!mainGuest.name.trim()) {
      newErrors.mainGuestName = "Please enter your full name.";
    }
    const ageNumber = parseInt(mainGuest.age, 10);
    const MIN_AGE = 18;
    const MAX_AGE = 100;
    if (!mainGuest.age || Number.isNaN(ageNumber)) {
      newErrors.mainGuestAge = "Please enter your age.";
    } else if (ageNumber < MIN_AGE || ageNumber > MAX_AGE) {
      newErrors.mainGuestAge = `Age must be between ${MIN_AGE} and ${MAX_AGE} years.`;
    }
    if (!mainGuest.gender) {
      newErrors.mainGuestGender = "Please select your gender.";
    }
    if (!mainGuest.email.trim()) {
      newErrors.mainGuestEmail = "Please enter your email address.";
    } else {
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailPattern.test(mainGuest.email.trim())) {
        newErrors.mainGuestEmail = "Please enter a valid email address.";
      }
    }
    if (!mainGuest.phone.trim()) {
      newErrors.mainGuestPhone = "Please enter your phone number.";
    } else {
      const digitsOnly = mainGuest.phone.replace(/\D/g, "");
      if (digitsOnly.length < 7 || digitsOnly.length > 15) {
        newErrors.mainGuestPhone = "Please enter a valid contact number (7–15 digits).";
      }
    }

    if (Object.keys(newErrors).length > 0) {
      setFieldErrors(newErrors);
      setError("Please fill in all required fields before continuing.");
      setIsLoading(false);
      return;
    }

    try {
      // Prepare booking data
      const bookingData = {
        packageId,
        packageName: PACKAGE_OPTIONS.find((p) => p.id === packageId)?.name || "",
        packagePrice: PACKAGE_OPTIONS.find((p) => p.id === packageId)?.price || "",
        arrivalDate,
        endDate,
        packageDurationDays,
        packageDurationNights,
        meals: {
          breakfast: {
            menu: breakfastMenu,
            customRequested: customBreakfast,
            customNotes: customBreakfastNotes,
          },
          lunch: {
            menu: lunchMenu,
            customRequested: customLunch,
            customNotes: customLunchNotes,
          },
          dinner: {
            menu: dinnerMenu,
            customRequested: customDinner,
            customNotes: customDinnerNotes,
          },
        },
        additionalRequests,
        mainGuest,
        additionalGuestCount,
        additionalCharges,
        totalPrice,
      };

      // Call API to create Stripe Checkout Session
      const response = await fetch("/api/create-checkout-session", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(bookingData),
      });

      if (!response.ok) {
        const contentType = response.headers.get("content-type") || "";
        const errorData = contentType.includes("application/json")
          ? await response.json().catch(() => ({}))
          : { error: await response.text().catch(() => "") };
        throw new Error(
          errorData.error || `Failed to create checkout session (HTTP ${response.status})`
        );
      }

      const { url } = await response.json();

      if (!url) {
        throw new Error("Checkout URL was not returned from the server.");
      }

      // Redirect directly to Stripe Checkout URL (redirectToCheckout is removed in latest Stripe.js)
      window.location.href = url;
    } catch (err) {
      console.error("Booking error:", err);
      setError(err.message || "An error occurred. Please try again.");
      setIsLoading(false);
    }
  };

  return (
    <>
      <HelmetChanger title="Book Your Stay | LUXEDR Luxury Resort Experience" description="Reserve your LUXEDR experience with custom menus, luxury accommodations, and full concierge service in the Dominican Republic." />
      <BreadCrumb title="Booking" home="" />
      <section className="bg-whiteSmoke dark:bg-normalBlack py-20 2xl:py-[120px]">
        <div className="Container">
          <div
            className="bg-lightBlack p-6 sm:p-8 xl:p-10 rounded-lg shadow-xl"
            data-aos="fade-up"
            data-aos-duration="1000"
          >
            <div className="flex items-center mb-3">
              <div className="relative mr-[10px]">
                <hr className="w-10 h-[2px] bg-khaki text-khaki" />
                <span className="w-[8px] h-[8px] bg-khaki rounded-full absolute -top-[3px] animation-move"></span>
              </div>
              <p className="text-sm font-medium font-Lora leading-[26px] text-khaki">
                Complete your experience
              </p>
            </div>
            <h2 className="text-white text-[22px] sm:text-3xl md:text-4xl font-bold font-Garamond mb-8">
              Booking
            </h2>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* A. Package Selection */}
              <div>
                <label htmlFor="package" className="block text-white font-Lora font-medium mb-2">
                  Select Your Package
                </label>
                <select
                  id="package"
                  value={packageId}
                  onChange={(e) => setPackageId(e.target.value)}
                  className="w-full h-[50px] border border-gray bg-lightBlack text-white font-Lora px-4 outline-none focus:ring-1 focus:ring-khaki focus:border-khaki"
                  required
                >
                  <option value="">Select Your Package</option>
                  {PACKAGE_OPTIONS.map((pkg) => (
                    <option key={pkg.id} value={pkg.id}>
                      {pkg.name} ({pkg.price} USD)
                    </option>
                  ))}
                </select>
                {fieldErrors.package && (
                  <p className="mt-1 text-sm text-red-400 font-Lora">{fieldErrors.package}</p>
                )}
                {selectedPackage?.durationDays ? (
                  <p className="mt-2 text-xs text-lightGray font-Lora">
                    Duration: {selectedPackage.durationDays} day{selectedPackage.durationDays !== 1 ? "s" : ""} &{" "}
                    {selectedPackage.durationNights} night{selectedPackage.durationNights !== 1 ? "s" : ""}
                  </p>
                ) : null}
              </div>

              {/* A2. Arrival Date + Auto End Date */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="arrival-date" className="block text-white font-Lora font-medium mb-2">
                    Arrival Date
                  </label>
                  <input
                    id="arrival-date"
                    type="date"
                    min={todayISO}
                    value={arrivalDate}
                    onChange={(e) => setArrivalDate(e.target.value)}
                    className="w-full h-[50px] border border-gray bg-lightBlack text-white font-Lora px-4 outline-none focus:ring-1 focus:ring-khaki focus:border-khaki"
                  />
                  {fieldErrors.arrivalDate && (
                    <p className="mt-1 text-sm text-red-400 font-Lora">{fieldErrors.arrivalDate}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="end-date" className="block text-white font-Lora font-medium mb-2">
                    End Date (Auto)
                  </label>
                  <input
                    id="end-date"
                    type="date"
                    value={endDate}
                    readOnly
                    disabled
                    className="w-full h-[50px] border border-gray bg-lightBlack text-white font-Lora px-4 outline-none opacity-70 cursor-not-allowed"
                  />
                  {fieldErrors.endDate && (
                    <p className="mt-1 text-sm text-red-400 font-Lora">{fieldErrors.endDate}</p>
                  )}
                </div>
              </div>

              {/* B & C. Meal Preferences + Custom Menu (from food.menu.json, same as ServiceDetails) */}
              {[
                { meal: "Breakfast", key: "breakfast", menus: breakfastMenus, value: breakfastMenu, setValue: setBreakfastMenu, customChecked: customBreakfast, setCustomChecked: setCustomBreakfast, customNotes: customBreakfastNotes, setCustomNotes: setCustomBreakfastNotes },
                { meal: "Lunch", key: "lunch", menus: lunchMenus, value: lunchMenu, setValue: setLunchMenu, customChecked: customLunch, setCustomChecked: setCustomLunch, customNotes: customLunchNotes, setCustomNotes: setCustomLunchNotes },
                { meal: "Dinner", key: "dinner", menus: dinnerMenus, value: dinnerMenu, setValue: setDinnerMenu, customChecked: customDinner, setCustomChecked: setCustomDinner, customNotes: customDinnerNotes, setCustomNotes: setCustomDinnerNotes },
              ].map(({ meal, key, menus, value, setValue, customChecked, setCustomChecked, customNotes, setCustomNotes }) => (
                <div key={key} className="space-y-3 pb-4 border-b border-gray last:border-0">
                  <label className="block text-white font-Lora font-medium mb-2">
                    {meal} – Select Menu
                  </label>
                  <select
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                    disabled={customChecked}
                    aria-disabled={customChecked}
                    className={`w-full h-[50px] border border-gray bg-lightBlack text-white font-Lora px-4 outline-none focus:ring-1 focus:ring-khaki focus:border-khaki ${customChecked ? "opacity-50 cursor-not-allowed" : ""}`}
                  >
                    <option value="">Select Menu</option>
                    {menus.map((item) => (
                      <option key={item.title} value={item.title}>
                        {item.title}
                      </option>
                    ))}
                  </select>
                  {fieldErrors[`${key}Menu`] && (
                    <p className="mt-1 text-sm text-red-400 font-Lora">
                      {fieldErrors[`${key}Menu`]}
                    </p>
                  )}
                  <label className="flex items-center gap-2 mt-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={customChecked}
                      onChange={(e) => setCustomChecked(e.target.checked)}
                      className="w-4 h-4 accent-[#7d4d00] bg-lightBlack"
                    />
                    <span className="text-lightGray font-Lora text-sm">
                      I would like to request a custom menu for this meal.
                    </span>
                  </label>
                  {customChecked && (
                    <textarea
                      value={customNotes}
                      onChange={(e) => setCustomNotes(e.target.value)}
                      placeholder={CUSTOM_MENU_PLACEHOLDER}
                      rows={4}
                      className="w-full border border-gray bg-lightBlack text-white font-Lora px-4 py-3 outline-none focus:ring-1 focus:ring-khaki focus:border-khaki placeholder:text-lightGray resize-none"
                    />
                  )}
                </div>
              ))}

              {/* Primary Guest Information + Additional People */}
              <div className="space-y-4">
                <div>
                  <h3 className="text-white font-Lora font-medium mb-3">
                    Primary Guest Details
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-lightGray text-sm font-Lora mb-1">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        value={mainGuest.name}
                        onChange={(e) =>
                          setMainGuest((prev) => ({ ...prev, name: e.target.value }))
                        }
                        placeholder="Your full name"
                        className="w-full h-[45px] border border-gray bg-lightBlack text-white font-Lora px-4 outline-none focus:ring-1 focus:ring-khaki focus:border-khaki placeholder:text-lightGray"
                      />
                      {fieldErrors.mainGuestName && (
                        <p className="mt-1 text-xs text-red-400 font-Lora">
                          {fieldErrors.mainGuestName}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="block text-lightGray text-sm font-Lora mb-1">
                        Age *
                      </label>
                      <input
                        type="number"
                        min="1"
                        value={mainGuest.age}
                        onChange={(e) =>
                          setMainGuest((prev) => ({ ...prev, age: e.target.value }))
                        }
                        placeholder="Your age"
                        className="w-full h-[45px] border border-gray bg-lightBlack text-white font-Lora px-4 outline-none focus:ring-1 focus:ring-khaki focus:border-khaki placeholder:text-lightGray"
                      />
                      {fieldErrors.mainGuestAge && (
                        <p className="mt-1 text-xs text-red-400 font-Lora">
                          {fieldErrors.mainGuestAge}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="block text-lightGray text-sm font-Lora mb-1">
                        Gender *
                      </label>
                      <select
                        value={mainGuest.gender}
                        onChange={(e) =>
                          setMainGuest((prev) => ({ ...prev, gender: e.target.value }))
                        }
                        className="w-full h-[45px] border border-gray bg-lightBlack text-white font-Lora px-4 outline-none focus:ring-1 focus:ring-khaki focus:border-khaki"
                      >
                        <option value="">Select</option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                        <option value="other">Other</option>
                        <option value="prefer-not-to-say">Prefer not to say</option>
                      </select>
                      {fieldErrors.mainGuestGender && (
                        <p className="mt-1 text-xs text-red-400 font-Lora">
                          {fieldErrors.mainGuestGender}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="block text-lightGray text-sm font-Lora mb-1">
                        Email *
                      </label>
                      <input
                        type="email"
                        value={mainGuest.email}
                        onChange={(e) =>
                          setMainGuest((prev) => ({ ...prev, email: e.target.value }))
                        }
                        placeholder="you@example.com"
                        className="w-full h-[45px] border border-gray bg-lightBlack text-white font-Lora px-4 outline-none focus:ring-1 focus:ring-khaki focus:border-khaki placeholder:text-lightGray"
                      />
                      {fieldErrors.mainGuestEmail && (
                        <p className="mt-1 text-xs text-red-400 font-Lora">
                          {fieldErrors.mainGuestEmail}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="block text-lightGray text-sm font-Lora mb-1">
                        Phone Number *
                      </label>
                      <input
                        type="tel"
                        value={mainGuest.phone}
                        onChange={(e) =>
                          setMainGuest((prev) => ({ ...prev, phone: e.target.value }))
                        }
                        placeholder="Contact number"
                        className="w-full h-[45px] border border-gray bg-lightBlack text-white font-Lora px-4 outline-none focus:ring-1 focus:ring-khaki focus:border-khaki placeholder:text-lightGray"
                      />
                      {fieldErrors.mainGuestPhone && (
                        <p className="mt-1 text-xs text-red-400 font-Lora">
                          {fieldErrors.mainGuestPhone}
                        </p>
                      )}
                    </div>
                  </div>
                </div>

                <div className="border border-gray text-white font-Lora p-4 space-y-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium">Additional People</h4>
                      <p className="text-xs text-lightGray mt-1">
                        You can bring up to {MAX_ADDITIONAL_PEOPLE} additional people (maximum 8 guests in total).
                      </p>
                    </div>
                  </div>
                  <div className="mt-2 max-w-xs">
                    <label className="block text-lightGray text-sm font-Lora mb-1">
                      Number of additional people
                    </label>
                    <select
                      value={additionalPeople}
                      onChange={(e) => setAdditionalPeople(parseInt(e.target.value, 10) || 0)}
                      className="w-full h-[45px] border border-gray bg-lightBlack text-white font-Lora px-4 outline-none focus:ring-1 focus:ring-khaki focus:border-khaki"
                    >
                      {Array.from({ length: MAX_ADDITIONAL_PEOPLE + 1 }).map((_, idx) => (
                        <option key={idx} value={idx}>
                          {idx}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              {/* Price Breakdown */}
              {packageId && (
                <div className="p-4 border border-gray/50">
                  <h3 className="text-white font-Lora font-medium mb-3">Price Breakdown</h3>
                  <div className="space-y-2 text-lightGray font-Lora">
                    <div className="flex justify-between">
                      <span>Package Price:</span>
                      <span className="text-white">
                        ${packagePriceValue.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                      </span>
                    </div>
                    {additionalGuestCount > 0 && (
                      <div className="flex justify-between">
                        <span>
                          Additional Guests ({additionalGuestCount} × ${ADDITIONAL_GUEST_CHARGE}):
                        </span>
                        <span className="text-white">
                          ${additionalCharges.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                        </span>
                      </div>
                    )}
                    <div className="flex justify-between pt-2 border-t border-gray/50">
                      <span className="text-white font-medium">Total:</span>
                      <span className="text-khaki font-bold text-lg">
                        ${totalPrice.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                      </span>
                    </div>
                  </div>
                </div>
              )}

              {/* D. Personalization & Special Requests */}
              <div>
                <label htmlFor="additional-requests" className="block text-white font-Lora font-medium mb-2">
                  Additional Requests / Personalization Notes
                </label>
                <textarea
                  id="additional-requests"
                  value={additionalRequests}
                  onChange={(e) => setAdditionalRequests(e.target.value)}
                  placeholder={PERSONALIZATION_PLACEHOLDER}
                  rows={5}
                  className="w-full border border-gray bg-lightBlack text-white font-Lora px-4 py-3 outline-none focus:ring-1 focus:ring-khaki focus:border-khaki placeholder:text-lightGray resize-none"
                />
                {fieldErrors.additionalRequests && (
                  <p className="mt-1 text-sm text-red-400 font-Lora">
                    {fieldErrors.additionalRequests}
                  </p>
                )}
              </div>

              {/* Error Message */}
              {error && (
                <div className="bg-red-900/20 border border-red-500 text-red-200 px-4 py-3 rounded">
                  {error}
                </div>
              )}

              {/* E. Submit */}
              <button
                type="submit"
                className="btn-primary1 disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={isLoading}
              >
                {isLoading ? "Processing..." : "Book"}
              </button>
            </form>
          </div>
        </div>
      </section>
    </>
  );
};

export default Booking;
