import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";
import { Link } from "react-router-dom";

const Gallery = () => {
  const [sliderRef] = useKeenSlider({
    breakpoints: {
      "(min-width: 400px)": {
        slides: { origin: "center", perView: 1.5 },
      },
      "(min-width: 600px)": {
        slides: { origin: "center", perView: 2 },
      },
      "(min-width: 768px)": {
        slides: { origin: "center", perView: 2.5 },
      },
      "(min-width: 992px)": {
        slides: { origin: "center", perView: 3.5 },
      },
      "(min-width: 1200px)": {
        slides: { origin: "center", perView: 4.5 },
      },
    },
    loop: true,
    initial: 0,
  });

  return (
    <section className=" dark:bg-lightBlack py-20 2xl:py-[120px]">
      <div className="">
        {/* section title */}
        <div
          className="text-center px-5"
          data-aos="fade-up"
          data-aos-duration="1000"
        >
          <p className="text-base leading-7 md:leading-10 lg:leading-[40px] 3xl:leading-[66px] text-khaki mb-1 md:mb-0 font-normal font-Lora">
            Gallery
          </p>
          <h1 className="text-2xl md:text-3xl 2xl:text-[38px] leading-[38px] lg:leading-[44px] text-lightBlack dark:text-white mt-2 md:mt-[10px]  mb-[12px] font-bold font-Garamond">
            LUXEDR Experiences
          </h1>
          <Link to={"/experiences"}>
            <button className="btn-primary 3xl:w-[211px] mt-[10px]">
              View More
            </button>
          </Link>
        </div>

        {/* Section content */}
        <div className="mt-14">
          <div ref={sliderRef} className="keen-slider">
            <div className="keen-slider__slide number-slide1">
              <div
                className="gallery-effect bg-[url('/images/extra/gallery-image-1.png')] group"
                data-aos="fade-up"
                data-aos-duration="1000"
              >
                <img
                  src="/images/extra/gallery-image-1.png"
                  alt=""
                  className="w-full h-full opacity-0"
                />
                <div className="px-[25px] py-10 absolute bottom-[-300px] lg:bottom-[-330px] 3xl:bottom-[-300px] group-hover:bottom-[25%] sm:group-hover:bottom-[20%]  lg:group-hover:bottom-[20%] left-[18px] right-[18px] my-[18px] transition-all z-20 duration-500 scale-50 group-hover:scale-100 text-center">
                  <h3 className="text-2xl md:text-[26px]  leading-5 md:leading-[26px] xl:text-[25px] 2xl:text-3xl 3xl:text-4xl 2xl:leading-[42px] text-white  font-Garamond font-semibold ">
                    Welcome Experience
                  </h3>
                  <Link to="/experiences">
                    <p className="text-sm sm:text-base leading-[22px] lg:leading-[26px] xl:leading-[38px] font-Lora font-normal text-white mt-2 ">
                      Check Details
                    </p>
                  </Link>
                </div>
              </div>
            </div>
            <div className="keen-slider__slide number-slide2">
              <div
                className="gallery-effect bg-[url('/images/extra/gallery-image-2.png')] group "
                data-aos="fade-down"
                data-aos-duration="1000"
              >
                <img
                  src="/images/extra/gallery-image-2.png"
                  alt=""
                  className="w-full h-full opacity-0"
                />
                <div className="px-[25px] py-10 absolute bottom-[-300px] lg:bottom-[-330px] 3xl:bottom-[-300px] group-hover:bottom-[25%] sm:group-hover:bottom-[20%]  lg:group-hover:bottom-[20%] left-[18px] right-[18px] my-[18px] transition-all z-20 duration-500 scale-50 group-hover:scale-100 text-center">
                  <h3 className="text-2xl md:text-[26px]  leading-5 md:leading-[26px] xl:text-[25px] 2xl:text-3xl 3xl:text-4xl 2xl:leading-[42px] text-white  font-Garamond font-semibold ">
                    Seasonal Delights
                  </h3>
                  <Link to="/experiences">
                    <p className="text-sm sm:text-base leading-[22px] lg:leading-[26px] xl:leading-[38px] font-Lora font-normal text-white mt-2 ">
                      Check Details
                    </p>
                  </Link>
                </div>
              </div>
            </div>
            <div className="keen-slider__slide number-slide3">
              <div
                className="gallery-effect bg-[url('/images/extra/gallery-image-3.png')] group "
                data-aos="fade-up"
                data-aos-duration="1000"
              >
                <img
                  src="/images/extra/gallery-image-3.png"
                  alt=""
                  className="w-full h-full opacity-0"
                />
                <div className="px-[25px] py-10 absolute bottom-[-300px] lg:bottom-[-330px] 3xl:bottom-[-300px] group-hover:bottom-[25%] sm:group-hover:bottom-[20%]  lg:group-hover:bottom-[20%] left-[18px] right-[18px] my-[18px] transition-all z-20 duration-500 scale-50 group-hover:scale-100 text-center">
                  <h3 className="text-2xl md:text-[26px]  leading-5 md:leading-[26px] xl:text-[25px] 2xl:text-3xl 3xl:text-4xl 2xl:leading-[42px] text-white  font-Garamond font-semibold ">
                    Evening Ambiance
                  </h3>
                  <Link to="/experiences">
                    <p className="text-sm sm:text-base leading-[22px] lg:leading-[26px] xl:leading-[38px] font-Lora font-normal text-white mt-2 ">
                      Check Details
                    </p>
                  </Link>
                </div>
              </div>
            </div>
            <div className="keen-slider__slide number-slide4">
              <div
                className="gallery-effect bg-[url('/images/extra/gallery-image-4.png')] group "
                data-aos="fade-down"
                data-aos-duration="1000"
              >
                <img
                  src="/images/extra/gallery-image-4.png"
                  alt=""
                  className="w-full h-full opacity-0"
                />
                <div className="px-[25px] py-10 absolute bottom-[-300px] lg:bottom-[-330px] 3xl:bottom-[-300px] group-hover:bottom-[25%] sm:group-hover:bottom-[20%]  lg:group-hover:bottom-[20%] left-[18px] right-[18px] my-[18px] transition-all z-20 duration-500 scale-50 group-hover:scale-100 text-center">
                  <h3 className="text-2xl md:text-[26px]  leading-5 md:leading-[26px] xl:text-[25px] 2xl:text-3xl 3xl:text-4xl 2xl:leading-[42px] text-white  font-Garamond font-semibold ">
                    Signature Dishes
                  </h3>
                  <Link to="/experiences">
                    <p className="text-sm sm:text-base leading-[22px] lg:leading-[26px] xl:leading-[38px] font-Lora font-normal text-white mt-2 ">
                      Check Details
                    </p>
                  </Link>
                </div>
              </div>
            </div>
            <div className="keen-slider__slide number-slide5">
              <div
                className="gallery-effect bg-[url('/images/extra/gallery-image-5.png')] group "
                data-aos="fade-up"
                data-aos-duration="1000"
              >
                <img
                  src="/images/extra/gallery-image-5.png"
                  alt=""
                  className="w-full h-full opacity-0"
                />
                <div className="px-[25px] py-10 absolute bottom-[-300px] lg:bottom-[-330px] 3xl:bottom-[-300px] group-hover:bottom-[25%] sm:group-hover:bottom-[20%]  lg:group-hover:bottom-[20%] left-[18px] right-[18px] my-[18px] transition-all z-20 duration-500 scale-50 group-hover:scale-100 text-center">
                  <h3 className="text-2xl md:text-[26px]  leading-5 md:leading-[26px] xl:text-[25px] 2xl:text-3xl 3xl:text-4xl 2xl:leading-[42px] text-white  font-Garamond font-semibold ">
                    Oceanside Dining
                  </h3>
                  <Link to="/experiences">
                    <p className="text-sm sm:text-base leading-[22px] lg:leading-[26px] xl:leading-[38px] font-Lora font-normal text-white mt-2 ">
                      Check Details
                    </p>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Gallery;
