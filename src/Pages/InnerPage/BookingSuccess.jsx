import { useEffect, useState } from "react";
import { useSearchParams, Link } from "react-router-dom";
import BreadCrumb from "../../BreadCrumb/BreadCrumb";

const BookingSuccess = () => {
  const [searchParams] = useSearchParams();
  const sessionId = searchParams.get("session_id");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (sessionId) {
      // Verify the session was successful
      fetch(`/api/verify-session?session_id=${sessionId}`)
        .then((res) => res.json())
        .then((data) => {
          if (data.error) {
            setError(data.error);
          }
          setLoading(false);
        })
        .catch((err) => {
          console.error("Error verifying session:", err);
          setError("Unable to verify booking. Please contact support.");
          setLoading(false);
        });
    } else {
      setError("Invalid session. Please contact support.");
      setLoading(false);
    }
  }, [sessionId]);

  return (
    <>
      <BreadCrumb title="Booking Confirmed" home="" />
      <section className="bg-whiteSmoke dark:bg-normalBlack py-20 2xl:py-[120px]">
        <div className="Container">
          <div
            className="bg-lightBlack p-6 sm:p-8 xl:p-10 rounded-lg shadow-xl text-center"
            data-aos="fade-up"
            data-aos-duration="1000"
          >
            {loading ? (
              <div className="py-10">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-khaki mx-auto mb-4"></div>
                <p className="text-white">Verifying your booking...</p>
              </div>
            ) : error ? (
              <div>
                <div className="text-red-400 text-5xl mb-4">⚠️</div>
                <h2 className="text-white text-2xl font-bold font-Garamond mb-4">
                  Verification Error
                </h2>
                <p className="text-lightGray mb-6">{error}</p>
                <Link to="/contact" className="btn-primary1">
                  Contact Support
                </Link>
              </div>
            ) : (
              <div>
                <div className="text-green-400 text-6xl mb-4">✓</div>
                <h2 className="text-white text-2xl sm:text-3xl font-bold font-Garamond mb-4">
                  Booking Confirmed!
                </h2>
                <p className="text-lightGray mb-6">
                  Thank you for your booking with LuxeDR. Your payment has been processed successfully.
                </p>
                <p className="text-white mb-6">
                  A confirmation email has been sent to your email address with all the booking details.
                </p>
                <p className="text-lightGray text-sm mb-8">
                  We'll be in touch soon to confirm the details of your stay.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link to={"/"}>
                    <button className="btn-primary">Return Home</button>
                  </Link>
                  <Link to={"/packages"}>
                    <button className="btn-primary">View Packages </button>
                  </Link>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>
    </>
  );
};

export default BookingSuccess;
