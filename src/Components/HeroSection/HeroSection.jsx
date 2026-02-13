import "swiper/css";
import "swiper/css/navigation";
import "./style.css";

import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { FaStar } from "react-icons/fa";
// import { BiPhoneCall } from "react-icons/bi";
import { Link } from "react-router-dom";

// Configuration data for the slides
const sliderData = [
  {
    id: 1,
    bgImage: "/images/extra/hero-bg.png",
    location: "The Dominican Republic",
  },
  // {
  //   id: 2,
  //   bgImage: "/images/home-1/hero-bg2.jpg",
  //   location: "the Dominican Republic",
  // },
  // {
  //   id: 3,
  //   bgImage: "/images/home-1/hero-bg.jpg",
  //   location: "the Dominican Republic",
  // },
  // {
  //   id: 4,
  //   bgImage: "/images/home-1/hero-bg2.jpg",
  //   location: "the Dominican Republic",
  // },
];

const HeroSection = () => {
  // Helper to render the 5 stars
  const renderStars = () => (
    <div className="flex space-x-2 items-center justify-center mb-5 lg:mb-6">
      {[...Array(5)].map((_, index) => (
        <FaStar
          key={index}
          className="w-[14px] h-[14px] lg:w-[16px] lg:h-[16px] text-[#fdc477]"
        />
      ))}
    </div>
  );

  return (
    <div className="">
      <Swiper
        centeredSlides={true}
        navigation={true}
        speed={3000}
        autoplay={{
          delay: 10000,
          disableOnInteraction: true,
        }}
        pagination={{
          clickable: true,
        }}
        modules={[Navigation, Autoplay, Pagination]}
        className="mySwiper"
      >
        {sliderData.map((slide) => (
          <SwiperSlide key={slide.id}>
            <div
              className={`w-full h-[700px] md:h-[800px] xl:h-[850px] 3xl:h-[950px] bg-[rgba(30,30,30,0.4)] bg-opacity-40 grid items-center bg-cover justify-center text-white relative pb-[150px] lg:pb-16 xl:pb-0`}
              style={{ backgroundImage: `url('${slide.bgImage}')` }}
              data-aos="fade-down"
            >
              <div className="font-Garamond text-center">
                {renderStars()}

                <h4 className="text-base mb-4">
                  CURATED CARIBBEAN EXPERIENCES
                </h4>

                <div className="mb-7 md:mb-8 lg:mb-9 xl:mb-10">
                  <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl 3xl:text-6xl font-semibold leading-[40px] md:leading-[50px] 3xl:leading-[70px]">
                    Your Private Luxury Experience
                  </h1>
                  <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl 3xl:text-6xl font-semibold leading-[40px] lg:leading-[50px] 2xl:leading-[60px]">
                    In {slide.location}
                  </h1>
                  {/* <p className="text-base lg:text-lg leading-7 font-medium"> */}
                  <p className="font-Lora text-sm sm:text-base leading-[26px] text-gray dark:text-lightGray font-normal xl:text-lg italic">
                    From gourmet meals prepared just for you to unforgettable
                    nights and curated adventures, we handle everything.
                  </p>
                </div>

                <Link to="/packages">
                  <button className="w-[185px] h-[48px] lg:h-[56px] bg-khaki relative before:w-8 before:h-[1px] before:bg-khaki before:absolute before:left-0 before:top-16 text-base font-Garamond font-medium mt-[-6px] hover-animBg after:bg-normalBlack after:rounded-none hover:before:bg-normalBlack uppercase">
                    Book Now
                  </button>
                </Link>
              </div>

              {/* Contact Info Sidebar */}
              {/* <div className="w-[221px] h-[50px] border-white border hidden md:flex items-center justify-center absolute left-0 top-1/2 -rotate-90">
                <BiPhoneCall className="w-5 h-5 mr-2 text-khaki" />
                +980 123 4567 890
              </div> */}
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default HeroSection;
