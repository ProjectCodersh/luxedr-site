import { useState } from "react";
import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";
import "../../../Components4/Testimonial/testimonials.css";
import { Link } from "react-router-dom";
import { LiaDotCircleSolid } from "react-icons/lia";
// Added icons for the buttons
import { BsChevronLeft, BsChevronRight } from "react-icons/bs";

const Rooms = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [loaded, setLoaded] = useState(false); // Changed to include setLoaded

  const [sliderRef, instanceRef] = useKeenSlider({
    breakpoints: {
      "(min-width: 320px)": {
        slides: { perView: 1, spacing: 20 },
      },
      "(min-width: 768px)": {
        slides: { perView: 2, spacing: 20 },
      },
      "(min-width:1080px)": {
        slides: { perView: 3, spacing: 20 },
      },
    },
    loop: true,
    initial: 0,
    created() {
      setLoaded(true); // Set to true when slider is ready
    },
    slideChanged(slider) {
      setCurrentSlide(slider.track.details.rel);
    },
  });

  return (
    <section className="bg-normalBlack py-20 2xl:py-[120px]">
      <div className="Container">
        {/* Header Section with Buttons */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10" data-aos="fade-up" data-aos-duration="1000">
          <div className="w-full md:w-[60%]">
            <div className="flex items-center">
              <div className="relative mr-[10px]">
                <hr className="w-10 h-[2px] bg-khaki text-khaki" />
                <span className="w-[8px] h-[8px] bg-khaki rounded-full absolute -top-[3px] animation-move"></span>
              </div>
              <p className="text-sm font-medium font-Lora leading-[26px] text-khaki">
                Pricing plans
              </p>
            </div>

            <h2 className="text-white text-[22px] sm:text-3xl md:text-4xl xl:text-[38px] leading-7 md:leading-9 lg:leading-10 2xl:leading-[46px] font-bold font-Garamond mt-1 mb-5">
              Know Our Packages
            </h2>
            <p className="text-sm lg:text-base leading-[22px] sm:leading-[26px] text-lightGray font-normal font-Lora">
              Choose the perfect retreat for your personalized Gourmet journey.
            </p>
          </div>

          {/* Slider Controls Container */}
          <div className="hidden sm:flex items-center space-x-3 mt-5 md:mt-0">
            <button
              onClick={(e) => e.stopPropagation() || instanceRef.current?.prev()}
              className="lg:w-[50px] w-[35px] h-[35px] lg:h-[50px] flex items-center justify-center border-[1px] border-gray text-lightGray hover:bg-khaki hover:border-khaki group transition-all duration-300"
            >
              <BsChevronLeft className="w-5 h-5 text-white" />
            </button>
            <button
              onClick={(e) => e.stopPropagation() || instanceRef.current?.next()}
              className="lg:w-[50px] w-[35px] h-[35px] lg:h-[50px] flex items-center justify-center border-[1px] border-gray text-lightGray hover:bg-khaki hover:border-khaki group transition-all duration-300"
            >
              <BsChevronRight className="w-5 h-5 text-white" />
            </button>
          </div>
        </div>

        {/* Slider */}
        <div ref={sliderRef} className="keen-slider relative mt-14 2xl:mt-[60px]">
          {/* Slide 1 */}
          <div className="bg-lightBlack keen-slider__slide number-slide1 group">
            <div data-aos="fade-up" data-aos-duration="1000">
              {" "}
              <div className="relative">
                <img
                  src="/images/extra/package-bg-1.png"
                  alt="room_images_one"
                  className="w-full h-full"
                />

              </div>
              <div className="px-5 py-7 xl:px-[30px] xl:py-[34px]">
                <h3 className="text-white  text-lg md:text-xl 2xl:text-[22px] leading-[30px] font-normal font-Lora mb-6">
                  <Link to="/home5/room">The Essence Getaway</Link>
                </h3>

                <div className="sm:flex items-center justify-between  ">
                  <ul className="space-y-2 2xl:space-y-3">
                    <li className="flex items-center space-x-[8px]">
                      <LiaDotCircleSolid size={16} className="text-khaki" />
                      <p className="text-sm sm:text-base leading-[26px] text-white font-medium font-Lora">
                        3 Days & 2 Nights
                      </p>
                    </li>
                    <li className="flex items-center space-x-[8px]">
                      <LiaDotCircleSolid size={16} className="text-khaki" />
                      <p className="text-sm sm:text-base leading-[26px] text-white font-medium font-Lora">
                        Group Size: Up to 4 Guests
                      </p>
                    </li>
                    <li className="flex items-center space-x-[8px]">
                      <LiaDotCircleSolid size={16} className="text-khaki" />
                      <p className="text-sm sm:text-base leading-[26px] text-white font-medium font-Lora">
                        Airport pickup & return
                      </p>
                    </li>
                    <li className="flex items-center space-x-[8px]">
                      <LiaDotCircleSolid size={16} className="text-khaki" />
                      <p className="text-sm sm:text-base leading-[26px] text-white font-medium font-Lora">
                        Daily private chef + all food ingredients
                      </p>
                    </li>
                    <li className="flex items-center space-x-[8px]">
                      <LiaDotCircleSolid size={16} className="text-khaki" />
                      <p className="text-sm sm:text-base leading-[26px] text-white font-medium font-Lora">
                        Dedicated host for your stay
                      </p>
                    </li>
                    <li className="flex items-center space-x-[8px]">
                      <LiaDotCircleSolid size={16} className="text-khaki" />
                      <p className="text-sm sm:text-base leading-[26px] text-white font-medium font-Lora">
                        One beach tour
                      </p>
                    </li>
                  </ul>
                </div>

                <div className="flex items-center justify-between mt-10 mb-2">
                  <p className="text-Lora text-[15px] sm:text-[18px] leading-6 font-normal text-white">
                    <span className="text-khaki font-bold "> $1,660</span> USD
                  </p>
                  <Link to="/booking?package=essence-getaway">
                    <button className="btn-primary1">Choose Package</button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
          {/* Slider -2 */}
          <div className="bg-lightBlack keen-slider__slide number-slide1 group">
            <div data-aos="fade-up" data-aos-duration="1000">
              <div className="relative">
                <img
                  src="/images/extra/package-bg-6.png"
                  alt="room_images_one"
                  className="w-full h-full"
                />
              </div>
              <div className="px-5 py-7 xl:px-[30px] xl:py-[34px]">
                <h3 className="text-white  text-lg md:text-xl 2xl:text-[22px] leading-[30px] font-normal font-Lora mb-6">
                  <Link to="/home5/room">Indulge Stay</Link>
                </h3>
                <div className="sm:flex items-center justify-between  ">
                  <ul className="space-y-2 2xl:space-y-3">
                    <li className="flex items-center space-x-[8px]">
                      <LiaDotCircleSolid size={16} className="text-khaki" />
                      <p className="text-sm sm:text-base leading-[26px] text-white font-medium font-Lora">
                        5 Days & 4 Nights
                      </p>
                    </li>
                    <li className="flex items-center space-x-[8px]">
                      <LiaDotCircleSolid size={16} className="text-khaki" />
                      <p className="text-sm sm:text-base leading-[26px] text-white font-medium font-Lora">
                        Group Size: Up to 4 Guests
                      </p>
                    </li>
                    <li className="flex items-center space-x-[8px]">
                      <LiaDotCircleSolid size={16} className="text-khaki" />
                      <p className="text-sm sm:text-base leading-[26px] text-white font-medium font-Lora">
                        Airport transfers
                      </p>
                    </li>
                    <li className="flex items-center space-x-[8px]">
                      <LiaDotCircleSolid size={16} className="text-khaki" />
                      <p className="text-sm sm:text-base leading-[26px] text-white font-medium font-Lora">
                        Private chef (daily) + ingredients
                      </p>
                    </li>
                    <li className="flex items-center space-x-[8px]">
                      <LiaDotCircleSolid size={16} className="text-khaki" />
                      <p className="text-sm sm:text-base leading-[26px] text-white font-medium font-Lora">
                        Host service
                      </p>
                    </li>
                    <li className="flex items-center space-x-[8px]">
                      <LiaDotCircleSolid size={16} className="text-khaki" />
                      <p className="text-sm sm:text-base leading-[26px] text-white font-medium font-Lora">
                        One adventure excursion
                      </p>
                    </li>
                  </ul>
                </div>

                <div className="flex items-center justify-between mt-10 mb-2">
                  <p className="text-Lora text-[15px] sm:text-[18px] leading-6 font-normal text-white">
                    <span className="text-khaki font-bold ">$2,900</span> USD
                  </p>
                  <Link to="/booking?package=indulge-stay">
                    <button className="btn-primary1">Choose Package</button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
          {/* slider-3 */}
          <div className="bg-lightBlack keen-slider__slide number-slide1 group">
            <div data-aos="fade-up" data-aos-duration="1000">
              <div className="relative">
                <img
                  src="/images/extra/package-bg-5.png"
                  alt="room_images_one"
                  className="w-full h-full"
                />

              </div>
              <div className="px-5 py-7 xl:px-[30px] xl:py-[34px]">
                <h3 className="text-white  text-lg md:text-xl 2xl:text-[22px] leading-[30px] font-normal font-Lora mb-6">
                  <Link to="/home5/room">Serenity Week</Link>
                </h3>

                <div className="sm:flex items-center justify-between  ">
                  <ul className="space-y-2 2xl:space-y-3">
                    <li className="flex items-center space-x-[8px]">
                      <LiaDotCircleSolid size={16} className="text-khaki" />
                      <p className="text-sm sm:text-base leading-[26px] text-white font-medium font-Lora">
                        5 Days & 4 Nights
                      </p>
                    </li>
                    <li className="flex items-center space-x-[8px]">
                      <LiaDotCircleSolid size={16} className="text-khaki" />
                      <p className="text-sm sm:text-base leading-[26px] text-white font-medium font-Lora">
                        Group Size: Up to 4 Guests
                      </p>
                    </li>
                    <li className="flex items-center space-x-[8px]">
                      <LiaDotCircleSolid size={16} className="text-khaki" />
                      <p className="text-sm sm:text-base leading-[26px] text-white font-medium font-Lora">
                        Airport transfers
                      </p>
                    </li>
                    <li className="flex items-center space-x-[8px]">
                      <LiaDotCircleSolid size={16} className="text-khaki" />
                      <p className="text-sm sm:text-base leading-[26px] text-white font-medium font-Lora">
                        Private chef (daily) + ingredients
                      </p>
                    </li>
                    <li className="flex items-center space-x-[8px]">
                      <LiaDotCircleSolid size={16} className="text-khaki" />
                      <p className="text-sm sm:text-base leading-[26px] text-white font-medium font-Lora">
                        Host service
                      </p>
                    </li>
                    <li className="flex items-center space-x-[8px]">
                      <LiaDotCircleSolid size={16} className="text-khaki" />
                      <p className="text-sm sm:text-base leading-[26px] text-white font-medium font-Lora">
                        Nightlife tour experience
                      </p>
                    </li>
                  </ul>
                </div>

                <div className="flex items-center justify-between mt-10 mb-2">
                  <p className="text-Lora text-[15px] sm:text-[18px] leading-6 font-normal text-white">
                    <span className="text-khaki font-bold ">$3,680</span> USD
                  </p>
                  <Link to="/booking?package=serenity-week">
                    <button className="btn-primary1">Choose Package </button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
          {/* slider-4 */}
          <div className="bg-lightBlack keen-slider__slide number-slide1 group">
            <div data-aos="fade-up" data-aos-duration="1000">
              <div className="relative">
                <img
                  src="/images/extra/package-bg-4.png"
                  alt="room_images_one"
                  className="w-full h-full"
                />

              </div>
              <div className="px-5 py-7 xl:px-[30px] xl:py-[34px]">
                <h3 className="text-white  text-lg md:text-xl 2xl:text-[22px] leading-[30px] font-normal font-Lora mb-6">
                  Imperial Retreat
                </h3>


                <div className="sm:flex items-center justify-between  ">
                  <ul className="space-y-2 2xl:space-y-3">
                    <li className="flex items-center space-x-[8px]">
                      <LiaDotCircleSolid size={16} className="text-khaki" />
                      <p className="text-sm sm:text-base leading-[26px] text-white font-medium font-Lora">
                        5 Days & 4 Nights
                      </p>
                    </li>
                    <li className="flex items-center space-x-[8px]">
                      <LiaDotCircleSolid size={16} className="text-khaki" />
                      <p className="text-sm sm:text-base leading-[26px] text-white font-medium font-Lora">
                        Group Size: Up to 4 Guests
                      </p>
                    </li>
                    <li className="flex items-center space-x-[8px]">
                      <LiaDotCircleSolid size={16} className="text-khaki" />
                      <p className="text-sm sm:text-base leading-[26px] text-white font-medium font-Lora">
                        Airport transfers
                      </p>
                    </li>
                    <li className="flex items-center space-x-[8px]">
                      <LiaDotCircleSolid size={16} className="text-khaki" />
                      <p className="text-sm sm:text-base leading-[26px] text-white font-medium font-Lora">
                        Private chef (daily) + ingredients
                      </p>
                    </li>
                    <li className="flex items-center space-x-[8px]">
                      <LiaDotCircleSolid size={16} className="text-khaki" />
                      <p className="text-sm sm:text-base leading-[26px] text-white font-medium font-Lora">
                        Host service
                      </p>
                    </li>
                    <li className="flex items-center space-x-[8px]">
                      <LiaDotCircleSolid size={16} className="text-khaki" />
                      <p className="text-sm sm:text-base leading-[26px] text-white font-medium font-Lora">
                        Sports-bar / entertainment tour
                      </p>
                    </li>
                  </ul>
                </div>

                <div className="flex items-center justify-between mt-10 mb-2">
                  <p className="text-Lora  leading-6 font-normal text-white">
                    <span className="text-khaki font-bold text-[15px] sm:text-[18px]">
                      $5,180
                    </span>{" "}
                    USD
                  </p>
                  <Link to="/booking?package=imperial-retreat">
                    <button className="btn-primary1">Choose Package</button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Optional Dots Pagination */}
        {/* <div className="mx-auto mt-10 hidden md:block">
          {loaded && instanceRef.current && (
            <div className="dots flex items-center justify-center">
              {[...Array(instanceRef.current.track.details.slides.length).keys()].map((idx) => (
                <button
                  key={idx}
                  onClick={() => instanceRef.current?.moveToIdx(idx)}
                  className={"dot" + (currentSlide === idx ? " active" : "")}
                ></button>
              ))}
            </div>
          )}
        </div> */}
      </div>
    </section>
  );
};

export default Rooms;






