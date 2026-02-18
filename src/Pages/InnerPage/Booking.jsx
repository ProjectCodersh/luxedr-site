import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import BreadCrumb from "../../BreadCrumb/BreadCrumb";

// Package options matching Packages page (used for dropdown and URL param pre-selection)
export const PACKAGE_OPTIONS = [
  { id: "essence-getaway", name: "The Essence Getaway", price: "$1,660" },
  { id: "indulge-stay", name: "Indulge Stay", price: "$2,900" },
  { id: "serenity-week", name: "Serenity Week", price: "$3,680" },
  { id: "imperial-retreat", name: "Imperial Retreat", price: "$5,180" },
];

// solving the issue of api keys related errors 
// Same source as ServiceDetails – breakfast, lunch, dinner menus from food.menu.json
const CUSTOM_MENU_PLACEHOLDER =
  "Mention your cuisine preference, dietary restrictions, specific dishes, allergies, or any special requests here.";

const PERSONALIZATION_PLACEHOLDER =
  "Mention any celebration themes, surprise arrangements, romantic décor, adventure preferences, accessibility needs, or any other custom experience requests.";

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

  // Guest information state - initialize with 4 empty guests
  const [guests, setGuests] = useState([
    { name: "", age: "", gender: "" },
    { name: "", age: "", gender: "" },
    { name: "", age: "", gender: "" },
    { name: "", age: "", gender: "" },
  ]);

  const ADDITIONAL_GUEST_CHARGE = 60; // $60 per additional guest
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
  const additionalGuests = guests.length > 4 ? guests.slice(4) : [];
  const additionalGuestCount = additionalGuests.length;
  const additionalCharges = additionalGuestCount * ADDITIONAL_GUEST_CHARGE;

  // Calculate total price
  const packagePriceValue = packageId
    ? parseFloat(PACKAGE_OPTIONS.find((p) => p.id === packageId)?.price.replace(/[^0-9.]/g, "") || 0)
    : 0;
  const totalPrice = packagePriceValue + additionalCharges;

  // Update guest information
  const updateGuest = (index, field, value) => {
    const updatedGuests = [...guests];
    updatedGuests[index] = { ...updatedGuests[index], [field]: value };
    setGuests(updatedGuests);

    // Clear validation error for this specific field when user starts typing
    if (fieldErrors[`guest_${index}_${field}`]) {
      const updatedErrors = { ...fieldErrors };
      delete updatedErrors[`guest_${index}_${field}`];
      setFieldErrors(updatedErrors);
    }
  };

  // Add a new guest
  const addGuest = () => {
    // Clear any existing validation errors when adding a guest
    setFieldErrors({});
    setError("");
    setGuests([...guests, { name: "", age: "", gender: "" }]);
  };

  // Remove a guest (only if beyond the first 4)
  const removeGuest = (index) => {
    if (index >= 4 && guests.length > 4) {
      // Clear validation errors for the removed guest
      const updatedErrors = { ...fieldErrors };
      delete updatedErrors[`guest_${index}_name`];
      delete updatedErrors[`guest_${index}_age`];
      delete updatedErrors[`guest_${index}_gender`];
      setFieldErrors(updatedErrors);

      const updatedGuests = guests.filter((_, i) => i !== index);
      setGuests(updatedGuests);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");
    setFieldErrors({});

    // Validate required fields (package, all three meals, personalization notes)
    const newErrors = {};

    if (!packageId) {
      newErrors.package = "Please select a package.";
    }
    if (!breakfastMenu) {
      newErrors.breakfastMenu = "Please select a breakfast menu.";
    }
    if (!lunchMenu) {
      newErrors.lunchMenu = "Please select a lunch menu.";
    }
    if (!dinnerMenu) {
      newErrors.dinnerMenu = "Please select a dinner menu.";
    }
    if (!additionalRequests.trim()) {
      newErrors.additionalRequests = "Please add your personalization notes.";
    }

    // Validate guest information
    guests.forEach((guest, index) => {
      if (!guest.name.trim()) {
        newErrors[`guest_${index}_name`] = `Guest ${index + 1} name is required.`;
      }
      if (!guest.age || parseInt(guest.age) <= 0) {
        newErrors[`guest_${index}_age`] = `Guest ${index + 1} age is required.`;
      }
      if (!guest.gender) {
        newErrors[`guest_${index}_gender`] = `Guest ${index + 1} gender is required.`;
      }
    });

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
        guests: guests.filter((g) => g.name.trim() && g.age && g.gender), // Only include filled guests
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
                  onChange={(e) => {
                    setPackageId(e.target.value);
                    // Clear package validation error when user selects a package
                    if (fieldErrors.package) {
                      const updatedErrors = { ...fieldErrors };
                      delete updatedErrors.package;
                      setFieldErrors(updatedErrors);
                    }
                  }}
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
                    onChange={(e) => {
                      setValue(e.target.value);
                      // Clear validation error when user selects a menu
                      if (fieldErrors[`${key}Menu`]) {
                        const updatedErrors = { ...fieldErrors };
                        delete updatedErrors[`${key}Menu`];
                        setFieldErrors(updatedErrors);
                      }
                    }}
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

              {/* Guest Information Section */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <label className="block text-white font-Lora font-medium">
                    Guest Information
                  </label>
                  <span className="text-sm text-lightGray font-Lora">
                    {guests.length} guest{guests.length !== 1 ? "s" : ""}
                  </span>
                </div>

                {guests.map((guest, index) => (
                  <div
                    key={index}
                    // className="bg-gray/20 p-4 rounded-lg border border-gray/50 space-y-3"
                    className="border border-gray bg-[#272727] text-white font-Lora p-4 outline-none space-y-3"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-white font-Lora font-medium">
                        Guest {index + 1}
                        {index >= 4 && (
                          <span className="ml-2 text-[#fdc477] font-semibold text-md">
                            (+${ADDITIONAL_GUEST_CHARGE})
                          </span>
                        )}
                      </h3>
                      {index >= 4 && (
                        <button
                          type="button"
                          onClick={() => removeGuest(index)}
                          className="text-khaki font-bold text-md font-Lora"
                        >
                          Remove
                        </button>
                      )}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                      <div>
                        <label className="block text-lightGray text-sm font-Lora mb-1">
                          Name *
                        </label>
                        <input
                          type="text"
                          value={guest.name}
                          onChange={(e) => updateGuest(index, "name", e.target.value)}
                          placeholder="Full name"
                          className="w-full h-[45px] border border-gray bg-lightBlack text-white font-Lora px-4 outline-none focus:ring-1 focus:ring-khaki focus:border-khaki placeholder:text-lightGray"
                        />
                        {fieldErrors[`guest_${index}_name`] && (
                          <p className="mt-1 text-xs text-red-400 font-Lora">
                            {fieldErrors[`guest_${index}_name`]}
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
                          value={guest.age}
                          onChange={(e) => updateGuest(index, "age", e.target.value)}
                          placeholder="Age"
                          className="w-full h-[45px] border border-gray bg-lightBlack text-white font-Lora px-4 outline-none focus:ring-1 focus:ring-khaki focus:border-khaki placeholder:text-lightGray"
                        />
                        {fieldErrors[`guest_${index}_age`] && (
                          <p className="mt-1 text-xs text-red-400 font-Lora">
                            {fieldErrors[`guest_${index}_age`]}
                          </p>
                        )}
                      </div>

                      <div>
                        <label className="block text-lightGray text-sm font-Lora mb-1">
                          Gender *
                        </label>
                        <select
                          value={guest.gender}
                          onChange={(e) => updateGuest(index, "gender", e.target.value)}
                          className="w-full h-[45px] border border-gray bg-lightBlack text-white font-Lora px-4 outline-none focus:ring-1 focus:ring-khaki focus:border-khaki"
                        >
                          <option value="">Select</option>
                          <option value="male">Male</option>
                          <option value="female">Female</option>
                          <option value="other">Other</option>
                          <option value="prefer-not-to-say">Prefer not to say</option>
                        </select>
                        {fieldErrors[`guest_${index}_gender`] && (
                          <p className="mt-1 text-xs text-red-400 font-Lora">
                            {fieldErrors[`guest_${index}_gender`]}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                ))}

                {/* <button
                  type="button"
                  onClick={addGuest}
                  className="w-full py-2 border border-khaki text-khaki hover:bg-khaki hover:text-lightBlack font-Lora transition-colors duration-200 rounded"
                >
                  + Add Additional Guest (${ADDITIONAL_GUEST_CHARGE} per guest)
                </button> */}

                <button
                  type="submit"
                  onClick={addGuest}
                  className="btn-primary1 disabled:opacity-50 disabled:cursor-not-allowed"
                  style={{ minWidth: "325px", maxWidth: "375px", width: "100%" }}
                >
                  Add Additional Guest ( ${ADDITIONAL_GUEST_CHARGE} per guest )
                </button>

              </div>

              {/* Price Breakdown */}
              {packageId && (
                <div className="bg-gray/20 p-4 rounded-lg border border-gray/50">
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
                  onChange={(e) => {
                    setAdditionalRequests(e.target.value);
                    // Clear validation error when user starts typing
                    if (fieldErrors.additionalRequests) {
                      const updatedErrors = { ...fieldErrors };
                      delete updatedErrors.additionalRequests;
                      setFieldErrors(updatedErrors);
                    }
                  }}
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
