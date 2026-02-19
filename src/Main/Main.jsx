import { Outlet } from "react-router-dom";
// import Footer from "../Shared/Footer/Footer";
import Navbar from "../Shared/Navbar/Navbar";
import ScrollToTop from "../ScrollToTop";
import GoToTop from "../Shared/GoToTop";
import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import HelmetChanger from "../Shared/Helmet/Helmet";
import Footer2 from "../Shared/Footer/Footer2";

const Main = () => {
  useEffect(() => {
    AOS.init();
    AOS.refresh();
  }, []);

  return (
    <>
      <HelmetChanger
        title="LUXEDR Resort | Luxury Stay & Gourmet Experience"
        description="Experience luxury stays, private chef dining, and personalized concierge services at LuxDR Resort in the Dominican Republic."
      />

      <ScrollToTop />
      <GoToTop />
      <Navbar />
      <div>
        <Outlet />
      </div>
      <Footer2 />
    </>
  );
};

export default Main;
