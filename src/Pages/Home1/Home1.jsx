// import Action from "../../Components/CallDoAction/Action";
// import Facilities from "../../Components/Facilities/Facilities";
// import HotelAndFacilities from "../../Components/HotelAndFacilities/HotelAndFacilities";
// import HotelAndResort from "../../Components/HotelAndResort/HotelAndResort";
// import LatestBlog from "../../Components/LatestBlog/LatestBlog";
// import Offers from "../../Components/Offers/Offers";
// import Rooms from "../../Components/Rooms/Rooms";
// import Testimonial from "../../Components/Testimonial/Testimonial";
import HeroSection from "../../Components/HeroSection/HeroSection";
import Best_Offer from "../../Components6/Best_Offer/Best_Offer";
import Apartments from "../../Components6/Apartments/Apartments";
import Testimonials from "../../Components6/Testimonials/Testimonials";
import Gallery from "../../Components6/Gallery/Gallery";

const Home1 = () => {
  return (
    <>
      <HeroSection />
      <Apartments />
      <Best_Offer />
      <Testimonials />
      <Gallery />
      {/* <Rooms />
      <HotelAndResort />
      <HotelAndFacilities />
      <Action />
      <Facilities />
      <Offers />
      <Testimonial />
      <LatestBlog /> */}
    </>
  );
};

export default Home1;
