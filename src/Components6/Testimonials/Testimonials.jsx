import { FaStar } from "react-icons/fa";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useKeenSlider } from "keen-slider/react";
import "../../Components4/Testimonial/testimonials.css";
import "keen-slider/keen-slider.min.css";

const Testimonial = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [loaded] = useState(false);
  const [sliderRef, instanceRef] = useKeenSlider({
    breakpoints: {
      "(min-width: 600px)": {
        slides: { perView: 1, spacing: 20 },
      },
      "(min-width: 768px)": {
        slides: { perView: 2, spacing: 20 },
      },
    },
    loop: true,
    initial: 0,
    slideChanged(slider) {
      setCurrentSlide(slider.track.details.rel);
    },
    created() {
      // setLoaded(true);
    },
  });

  return (
    <section className="bg-[url('/images/extra/testimonial-bg.jpg')] bg-[rgba(30,30,30,0.4)] dark:bg-[rgba(30,30,30,0.6)] bg-opacity-40 grid items-center justify-center bg-no-repeat bg-cover">
      <div className="Container py-20 lg:py-[120px]">
        {/* section title */}
        <div
          className="text-center sm:px-8 md:px-[80px] lg:px-[120px] xl:px-[200px]  2xl:px-[335px] mx-auto px-5"
          data-aos="fade-up"
          data-aos-duration="1000"
        >
          {/* Section logo */}
          <div className="flex items-center justify-center space-x-2 mb-4 lg:mb-5">
            <hr className="w-[100px] h-[1px]  text-[#473f39] " />
            <img
              src="/images/extra/site-logo.png"
              alt="room_section_logo"
              className="w-[50px] h-[50px]"
            />
            <hr className="w-[100px] h-[1px]  text-[#473f39] " />
          </div>
          <h4 className="text-base lg:text-lg font-medium text-khaki leading-[28px]">THE LUXEDR EXPERIENCE</h4>
          <h1 className="text-xl sm:text-2xl md:text-3xl 2xl:text-[38px] leading-[42px] 2xl:leading-[52px] text-white mt-[20px] mb-[16px] font-Garamond font-semibold uppercase">
            Unforgettable Moments, Shared by Our Guests
          </h1>
          <Link to={"/pricing"}>
            <button className="btn-primary">Explore Packages</button>
          </Link>
        </div>

        {/* very small screen Show and 567px hidden */}
        <div
          className="mt-14 sm:hidden px-1"
          data-aos="fade-up"
          data-aos-duration="1000"
        >
          {/* Small device show one testimonials section */}
          <div className="py-[10px] pt-4 sm:hidden">
            <div className="bg-white dark:bg-normalBlack p-5 md:p-10 relative before:absolute before:w-[85%]  before:h-[10px] before:bg-khaki before:mx-auto before:-top-[10px] before:left-0 before:right-0 after:absolute after:w-[85%] after:h-[10px] after:bg-khaki after:mx-auto after:-bottom-[10px] after:left-0 after:right-0 sm:hidden">
              {/* quote icon */}
              <img
                src="/images/home-1/testi-quote.png"
                alt=""
                className="absolute  right-3 xl:right-10 -top-8"
              />

              {/* rating icon */}
              <ul className="flex items-center text-khaki space-x-[4px]">
                <li>
                  <FaStar size={"16px"} />
                </li>
                <li>
                  <FaStar size={"16px"} />
                </li>
                <li>
                  <FaStar size={"16px"} />
                </li>
                <li>
                  <FaStar size={"16px"} />
                </li>
                <li>
                  <FaStar size={"16px"} />
                </li>
              </ul>
              <p className="font-Lora text-sm sm:text-base leading-[26px] text-gray dark:text-lightGray font-normal xl:text-lg mt-[30px] italic mb-[45px] before:absolute before:h-[30px] before:left-0 before:bottom-[-36px] before:bg-khaki before:w-[1px] relative">
                “Our stay at LUXEDR was nothing short of magical. The private chef exceeded all expectations, creating dishes tailored perfectly to our preferences. Every meal was an unforgettable culinary journey.”
              </p>
              <span className="w-[1px] h-[25px] bg-[#ddd]"></span>

              <div className="flex items-center space-x-6 ">
                <img
                  src="/images/extra/author-1.webp"
                  className="w-[65px] h-[65px]"
                  alt=""
                />

                <div className="">
                  <h4 className="text-base lg:text-[22px] leading-[26px] text-lightBlack dark:text-white font-semibold font-Garamond">
                    Sarah & Michael Thompson
                  </h4>
                  <p className="pt-1 text-sm md:text-base leading-[26px] font-normal text-gray dark:text-lightGray flex items-center">
                    <span className="w-5 h-[1px] inline-block text-khaki bg-khaki mr-2"></span>
                    New York, USA
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* testimonial */}
        <div
          className="mt-14 2xl:mt-[60px] relative keen-slider  hidden sm:block"
          ref={sliderRef}
        >
          {/* slider one */}
          <div className="keen-slider__slide number-slide1 hidden sm:block">
            <div
              className="py-[10px] pt-10 hidden sm:block"
              data-aos="fade-up"
              data-aos-duration="1000"
            >
              <div className="bg-white dark:bg-normalBlack p-5 md:p-10 relative before:absolute before:w-[85%]  before:h-[10px] before:bg-khaki before:mx-auto before:-top-[10px] before:left-0 before:right-0 after:absolute after:w-[85%] after:h-[10px] after:bg-khaki after:mx-auto after:-bottom-[10px] after:left-0 after:right-0 hidden sm:block">
                {/* quote icon */}
                <img
                  src="/images/home-1/testi-quote.png"
                  alt=""
                  className="absolute  right-3 xl:right-10 -top-8"
                />

                {/* rating icon */}
                <ul className="flex items-center text-khaki space-x-[4px]">
                  <li>
                    <FaStar size={"16px"} />
                  </li>
                  <li>
                    <FaStar size={"16px"} />
                  </li>
                  <li>
                    <FaStar size={"16px"} />
                  </li>
                  <li>
                    <FaStar size={"16px"} />
                  </li>
                  <li>
                    <FaStar size={"16px"} />
                  </li>
                </ul>
                <p className="font-Lora text-sm sm:text-base leading-[26px] text-gray dark:text-lightGray font-normal xl:text-lg mt-[30px] italic mb-[45px] before:absolute before:h-[30px] before:left-0 before:bottom-[-36px] before:bg-khaki before:w-[1px] relative">
                  “The attention to detail at LUXEDR Resort is incredible. From the moment we arrived until our departure, every need was anticipated and met. The Gourmet experience alone is worth the trip.”
                </p>
                <span className="w-[1px] h-[25px] bg-[#ddd]"></span>

                <div className="flex items-center space-x-6 ">
                  <img
                    src="/images/extra/author-2.webp"
                    className="w-[65px] h-[65px]"
                    alt=""
                  />

                  <div className="">
                    <h4 className="text-base lg:text-[22px] leading-[26px] text-lightBlack dark:text-white font-semibold font-Garamond">
                      Carlos Mendez
                    </h4>
                    <p className="pt-1 text-sm md:text-base leading-[26px] font-normal text-gray dark:text-lightGray flex items-center">
                      <span className="w-5 h-[1px] inline-block text-khaki bg-khaki mr-2"></span>
                      Madrid, Spain
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* slider two */}
          <div className="keen-slider__slide number-slide1 hidden sm:block">
            <div
              className="py-[10px] pt-10 hidden sm:block"
              data-aos="fade-up"
              data-aos-duration="1000"
            >
              <div className="bg-white dark:bg-normalBlack p-5 md:p-10 relative before:absolute before:w-[85%]  before:h-[10px] before:bg-khaki before:mx-auto before:-top-[10px] before:left-0 before:right-0 after:absolute after:w-[85%] after:h-[10px] after:bg-khaki after:mx-auto after:-bottom-[10px] after:left-0 after:right-0 hidden sm:block">
                {/* quote icon */}
                <img
                  src="/images/home-1/testi-quote.png"
                  alt=""
                  className="absolute  right-3 xl:right-10 -top-8"
                />

                {/* rating icon */}
                <ul className="flex items-center text-khaki space-x-[4px]">
                  <li>
                    <FaStar size={"16px"} />
                  </li>
                  <li>
                    <FaStar size={"16px"} />
                  </li>
                  <li>
                    <FaStar size={"16px"} />
                  </li>
                  <li>
                    <FaStar size={"16px"} />
                  </li>
                  <li>
                    <FaStar size={"16px"} />
                  </li>
                </ul>
                <p className="font-Lora text-sm sm:text-base leading-[26px] text-gray dark:text-lightGray font-normal xl:text-lg mt-[30px] italic mb-[45px] before:absolute before:h-[30px] before:left-0 before:bottom-[-36px] before:bg-khaki before:w-[1px] relative">
                  “We've traveled to many luxury resorts, but LUXEDR stands out. The personalized service, exquisite cuisine, and stunning location made our anniversary celebration truly special.”
                </p>
                <span className="w-[1px] h-[25px] bg-[#ddd]"></span>

                <div className="flex items-center space-x-6 ">
                  <img
                    src="/images/extra/author-3.webp"
                    className="w-[65px] h-[65px]"
                    alt=""
                  />

                  <div className="">
                    <h4 className="text-base lg:text-[22px] leading-[26px] text-lightBlack dark:text-white font-semibold font-Garamond">
                      Jennifer & David Lee
                    </h4>
                    <p className="pt-1 text-sm md:text-base leading-[26px] font-normal text-gray dark:text-lightGray flex items-center">
                      <span className="w-5 h-[1px] inline-block text-khaki bg-khaki mr-2"></span>
                      Toronto, Canada
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* slider three */}
          <div className="keen-slider__slide number-slide1 hidden sm:block">
            <div
              className="py-[10px] pt-10 hidden sm:block"
              data-aos="fade-up"
              data-aos-duration="1000"
            >
              <div className="bg-white dark:bg-normalBlack p-5 md:p-10 relative before:absolute before:w-[85%]  before:h-[10px] before:bg-khaki before:mx-auto before:-top-[10px] before:left-0 before:right-0 after:absolute after:w-[85%] after:h-[10px] after:bg-khaki after:mx-auto after:-bottom-[10px] after:left-0 after:right-0 hidden sm:block">
                {/* quote icon */}
                <img
                  src="/images/home-1/testi-quote.png"
                  alt=""
                  className="absolute  right-3 xl:right-10 -top-8"
                />

                {/* rating icon */}
                <ul className="flex items-center text-khaki space-x-[4px]">
                  <li>
                    <FaStar size={"16px"} />
                  </li>
                  <li>
                    <FaStar size={"16px"} />
                  </li>
                  <li>
                    <FaStar size={"16px"} />
                  </li>
                  <li>
                    <FaStar size={"16px"} />
                  </li>
                  <li>
                    <FaStar size={"16px"} />
                  </li>
                </ul>
                <p className="font-Lora text-sm sm:text-base leading-[26px] text-gray dark:text-lightGray font-normal xl:text-lg mt-[30px] italic mb-[45px] before:absolute before:h-[30px] before:left-0 before:bottom-[-36px] before:bg-khaki before:w-[1px] relative">
                  “As a food enthusiast, I was blown away by the culinary expertise at LUXEDR. Each dish was a masterpiece, showcasing fresh local ingredients prepared with world-class technique.”
                </p>
                <span className="w-[1px] h-[25px] bg-[#ddd]"></span>

                <div className="flex items-center space-x-6 ">
                  <img
                    src="/images/extra/author-5.webp"
                    className="w-[65px] h-[65px]"
                    alt=""
                  />

                  <div className="">
                    <h4 className="text-base lg:text-[22px] leading-[26px] text-lightBlack dark:text-white font-semibold font-Garamond">
                      Alessandro Rossi
                    </h4>
                    <p className="pt-1 text-sm md:text-base leading-[26px] font-normal text-gray dark:text-lightGray flex items-center">
                      <span className="w-5 h-[1px] inline-block text-khaki bg-khaki mr-2"></span>
                      Milan, Italy
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="keen-slider__slide number-slide1 hidden sm:block">
            <div
              className="py-[10px] pt-10 hidden sm:block"
              data-aos="fade-up"
              data-aos-duration="1000"
            >
              <div className="bg-white dark:bg-normalBlack p-5 md:p-10 relative before:absolute before:w-[85%]  before:h-[10px] before:bg-khaki before:mx-auto before:-top-[10px] before:left-0 before:right-0 after:absolute after:w-[85%] after:h-[10px] after:bg-khaki after:mx-auto after:-bottom-[10px] after:left-0 after:right-0 hidden sm:block">
                {/* quote icon */}
                <img
                  src="/images/home-1/testi-quote.png"
                  alt=""
                  className="absolute  right-3 xl:right-10 -top-8"
                />

                {/* rating icon */}
                <ul className="flex items-center text-khaki space-x-[4px]">
                  <li>
                    <FaStar size={"16px"} />
                  </li>
                  <li>
                    <FaStar size={"16px"} />
                  </li>
                  <li>
                    <FaStar size={"16px"} />
                  </li>
                  <li>
                    <FaStar size={"16px"} />
                  </li>
                  <li>
                    <FaStar size={"16px"} />
                  </li>
                </ul>
                <p className="font-Lora text-sm sm:text-base leading-[26px] text-gray dark:text-lightGray font-normal xl:text-lg mt-[30px] italic mb-[45px] before:absolute before:h-[30px] before:left-0 before:bottom-[-36px] before:bg-khaki before:w-[1px] relative">
                  “The perfect blend of relaxation and Gourmet excellence. The staff went above and beyond to ensure our dietary restrictions were accommodated without compromising on flavor or presentation.”
                </p>
                <span className="w-[1px] h-[25px] bg-[#ddd]"></span>

                <div className="flex items-center space-x-6 ">
                  <img
                    src="/images/extra/author-4.webp"
                    className="w-[65px] h-[65px]"
                    alt=""
                  />

                  <div className="">
                    <h4 className="text-base lg:text-[22px] leading-[26px] text-lightBlack dark:text-white font-semibold font-Garamond">
                      Emily Chen
                    </h4>
                    <p className="pt-1 text-sm md:text-base leading-[26px] font-normal text-gray dark:text-lightGray flex items-center">
                      <span className="w-5 h-[1px] inline-block text-khaki bg-khaki mr-2"></span>
                      Singapore
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="keen-slider__slide number-slide1 hidden sm:block">
            <div
              className="py-[10px] pt-10 hidden sm:block"
              data-aos="fade-up"
              data-aos-duration="1000"
            >
              <div className="bg-white dark:bg-normalBlack p-5 md:p-10 relative before:absolute before:w-[85%]  before:h-[10px] before:bg-khaki before:mx-auto before:-top-[10px] before:left-0 before:right-0 after:absolute after:w-[85%] after:h-[10px] after:bg-khaki after:mx-auto after:-bottom-[10px] after:left-0 after:right-0 hidden sm:block">
                {/* quote icon */}
                <img
                  src="/images/home-1/testi-quote.png"
                  alt=""
                  className="absolute  right-3 xl:right-10 -top-8"
                />

                {/* rating icon */}
                <ul className="flex items-center text-khaki space-x-[4px]">
                  <li>
                    <FaStar size={"16px"} />
                  </li>
                  <li>
                    <FaStar size={"16px"} />
                  </li>
                  <li>
                    <FaStar size={"16px"} />
                  </li>
                  <li>
                    <FaStar size={"16px"} />
                  </li>
                  <li>
                    <FaStar size={"16px"} />
                  </li>
                </ul>
                <p className="font-Lora text-sm sm:text-base leading-[26px] text-gray dark:text-lightGray font-normal xl:text-lg mt-[30px] italic mb-[45px] before:absolute before:h-[30px] before:left-0 before:bottom-[-36px] before:bg-khaki before:w-[1px] relative">
                  “LUXEDR Resort redefined luxury for us. The private chef experience was extraordinary, and the beautiful setting made it an escape we'll never forget. Already planning our return!”
                </p>
                <span className="w-[1px] h-[25px] bg-[#ddd]"></span>

                <div className="flex items-center space-x-6 ">
                  <img
                    src="/images/extra/author-1.webp"
                    className="w-[65px] h-[65px]"
                    alt=""
                  />

                  <div className="">
                    <h4 className="text-base lg:text-[22px] leading-[26px] text-lightBlack dark:text-white font-semibold font-Garamond">
                      Robert & Patricia Williams
                    </h4>
                    <p className="pt-1 text-sm md:text-base leading-[26px] font-normal text-gray dark:text-lightGray flex items-center">
                      <span className="w-5 h-[1px] inline-block text-khaki bg-khaki mr-2"></span>
                      London, UK
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* slide changer */}
        <div className="mx-auto  ">
          {loaded && instanceRef.current && (
            <div className="dots flex items-center justify-center">
              {[
                ...Array(
                  instanceRef.current.track.details.slides.length
                ).keys(),
              ].map((idx) => {
                return (
                  <button
                    key={idx}
                    onClick={() => {
                      instanceRef.current?.moveToIdx(idx);
                    }}
                    className={"dot" + (currentSlide === idx ? " active" : "")}
                  ></button>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Testimonial;
