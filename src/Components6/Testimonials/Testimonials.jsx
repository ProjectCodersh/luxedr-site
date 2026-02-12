import { Pagination } from "swiper/modules";
import { Link } from "react-router-dom";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import { FaStar } from "react-icons/fa6";
const Testimonials = () => {
  const breakpoints = {
    320: {
      slidesPerView: 1,
      spaceBetween: 30,
    },

    992: {
      slidesPerView: 2,
      spaceBetween: 30,
    },
  };
  return (
    <section className="py-20 2xl:py-[120px] dark:bg-lightBlack">
      <div className="Container">
        {/* section heading */}
        <div
          className="text-center mx-auto px-5 sm:px-8 md:px-[80px] lg:px-[120px] xl:px-[200px] 2xl:px-[280px] font-Garamond"
          data-aos="fade-up"
          data-aos-duration="1000"
        >
          <h4 className="text-base lg:text-lg font-medium text-khaki leading-[28px]">
            THE LUXEDR EXPERIENCE
          </h4>
          <h1 className="text-2xl md:text-3xl 2xl:text-[38px] leading-[38px] lg:leading-[44px] text-lightBlack dark:text-white mt-2 md:mt-[10px]  mb-[12px] font-bold">
            Unforgettable Moments, Shared by Our Guests
          </h1>
          {/* <p className="font-Lora leading-[26px] text-gray dark:text-lightGray font-normal text-sm sm:text-base ">
            A wonderful serenity has taken possession of my entire soul, like
            these royella dolor consectetur adipiscing elit dos eiusmod tempor
            incididunt resort sweet spring
          </p> */}
          <Link to={"/pricing"}>
            <button className="btn-primary 3xl:w-[211px]">
              Explore Packages{" "}
            </button>
          </Link>
        </div>
        {/* section Content */}
        <div className="mt-14 2xl:mt-[60px]">
          <Swiper
            breakpoints={breakpoints}
            spaceBetween={60}
            pagination={{
              clickable: true,
            }}
            modules={[Pagination]}
            className="mySwiper mySwiper3"
          >
            {/* slide-1 */}
            <SwiperSlide>
              <div
                className="p-5 lg:relative"
                data-aos="fade-up"
                data-aos-duration="1000"
              >
                <img
                  src="/images/home-2/testi-shape.png"
                  className=" h-full hidden lg:block lg:h-[332px] xl:h-[316px] 2xl:h-full"
                  alt=""
                />
                <div className="lg:absolute lg:-top-[4px] lg:left-[40px] bg-whiteSmoke dark:bg-normalBlack ">
                  <div className="flex items-center flex-col sm:flex-row justify-between">
                    <div className="relative flex items-center">
                      <img
                        src="/images/home-2/testi-author1.jpg"
                        className="w-[100px] h-[100px] md:w-[131px] md:h-[131px] lg:w-[100px] lg:h-[100px] xl:w-[131px] xl:h-[131px]"
                        alt=""
                      />
                      <img
                        src="/images/home-2/qute.png"
                        className="absolute bottom-[-4px] left-[10%]"
                        alt=""
                      />

                      <div className="ml-4 lg:ml-6">
                        <h5 className="text-lg md:text-xl lg:text-2xl leading-[46px] text-lightBlack dark:text-white font-bold font-Garamond">
                          Sarah & Michael Thompson
                        </h5>
                        <p className="text-sm sm:text-base leading-[46px] text-gray dark:text-lightGray font-medium font-Lora">
                          New York, USA
                        </p>
                      </div>
                    </div>
                    <div className="bg-white dark:bg-lightBlack rounded-full sm:rounded-none sm:rounded-l-full px-9 xl:px-5 2xl:px-9 py-[14px] mt-4 sm:mt-0">
                      <span className="flex items-center space-x-[5px] md:space-x-2 xl:space-x-3">
                        <FaStar className="text-khaki" size={14} />
                        <FaStar className="text-khaki" size={14} />
                        <FaStar className="text-khaki" size={14} />
                        <FaStar className="text-khaki" size={14} />
                        <FaStar className="text-khaki" size={14} />
                      </span>
                    </div>
                  </div>
                  <p className="py-6 px-5 sm:py-[34px] sm:px-10 text-justify text-sm sm:text-base lg:text-[17px] text-gray dark:text-lightGray font-Lora font-normal leading-[26px]">
                    Our stay at LUXEDR was nothing short of magical. The private
                    chef exceeded all expectations, creating dishes tailored
                    perfectly to our preferences. Every meal was an
                    unforgettable culinary journey
                  </p>
                </div>
              </div>
            </SwiperSlide>
            {/* slide-2 */}
            <SwiperSlide>
              <div
                className="p-5 lg:relative"
                data-aos="fade-up"
                data-aos-duration="1000"
              >
                <img
                  src="/images/home-2/testi-shape.png"
                  className=" h-full hidden lg:block lg:h-[332px] xl:h-[316px] 2xl:h-full"
                  alt=""
                />
                <div className="lg:absolute lg:-top-[4px] lg:left-[40px] bg-whiteSmoke dark:bg-normalBlack ">
                  <div className="flex items-center flex-col sm:flex-row justify-between">
                    <div className="relative flex items-center">
                      <img
                        src="/images/home-2/testi-author2.jpg"
                        className="w-[100px] h-[100px] md:w-[131px] md:h-[131px] lg:w-[100px] lg:h-[100px] xl:w-[131px] xl:h-[131px]"
                        alt=""
                      />
                      <img
                        src="/images/home-2/qute.png"
                        className="absolute bottom-[-4px] left-[10%]"
                        alt=""
                      />

                      <div className="ml-4 lg:ml-6">
                        <h5 className="text-lg md:text-xl lg:text-2xl leading-[46px] text-lightBlack dark:text-white font-bold font-Garamond">
                          Carlos Mendez
                        </h5>
                        <p className="text-sm sm:text-base leading-[46px] text-gray dark:text-lightGray font-medium font-Lora">
                          Madrid, Spain
                        </p>
                      </div>
                    </div>
                    <div className="bg-white dark:bg-lightBlack rounded-full sm:rounded-none sm:rounded-l-full px-9 xl:px-5 2xl:px-9 py-[14px] mt-4 sm:mt-0">
                      <span className="flex items-center space-x-[5px] md:space-x-2 xl:space-x-3">
                        <FaStar className="text-khaki" size={14} />
                        <FaStar className="text-khaki" size={14} />
                        <FaStar className="text-khaki" size={14} />
                        <FaStar className="text-khaki" size={14} />
                        <FaStar className="text-khaki" size={14} />
                      </span>
                    </div>
                  </div>
                  <p className="py-6 px-5 sm:py-[34px] sm:px-10 text-justify text-sm sm:text-base lg:text-[17px] text-gray dark:text-lightGray font-Lora font-normal leading-[26px]">
                    The attention to detail at LUXEDR Resort is incredible. From
                    the moment we arrived until our departure, every need was
                    anticipated and met. The Gourmet experience alone is worth
                    the trip.
                  </p>
                </div>
              </div>
            </SwiperSlide>
            {/* slide-3 */}
            <SwiperSlide>
              <div
                className="p-5 lg:relative"
                data-aos="fade-up"
                data-aos-duration="1000"
              >
                <img
                  src="/images/home-2/testi-shape.png"
                  className=" h-full hidden lg:block lg:h-[332px] xl:h-[316px] 2xl:h-full"
                  alt=""
                />
                <div className="lg:absolute lg:-top-[4px] lg:left-[40px] bg-whiteSmoke dark:bg-normalBlack ">
                  <div className="flex items-center flex-col sm:flex-row justify-between">
                    <div className="relative flex items-center">
                      <img
                        src="/images/home-2/testi-author1.jpg"
                        className="w-[100px] h-[100px] md:w-[131px] md:h-[131px] lg:w-[100px] lg:h-[100px] xl:w-[131px] xl:h-[131px]"
                        alt=""
                      />
                      <img
                        src="/images/home-2/qute.png"
                        className="absolute bottom-[-4px] left-[10%]"
                        alt=""
                      />

                      <div className="ml-4 lg:ml-6">
                        <h5 className="text-lg md:text-xl lg:text-2xl leading-[46px] text-lightBlack dark:text-white font-bold font-Garamond">
                          Jennifer & David Lee
                        </h5>
                        <p className="text-sm sm:text-base leading-[46px] text-gray dark:text-lightGray font-medium font-Lora">
                          Toronto, Canada
                        </p>
                      </div>
                    </div>
                    <div className="bg-white dark:bg-lightBlack rounded-full sm:rounded-none sm:rounded-l-full px-9 xl:px-5 2xl:px-9 py-[14px] mt-4 sm:mt-0">
                      <span className="flex items-center space-x-[5px] md:space-x-2 xl:space-x-3">
                        <FaStar className="text-khaki" size={14} />
                        <FaStar className="text-khaki" size={14} />
                        <FaStar className="text-khaki" size={14} />
                        <FaStar className="text-khaki" size={14} />
                        <FaStar className="text-khaki" size={14} />
                      </span>
                    </div>
                  </div>
                  <p className="py-6 px-5 sm:py-[34px] sm:px-10 text-justify text-sm sm:text-base lg:text-[17px] text-gray dark:text-lightGray font-Lora font-normal leading-[26px]">
                    We've traveled to many luxury resorts, but LUXEDR stands
                    out. The personalized service, exquisite cuisine, and
                    stunning location made our anniversary celebration truly
                    special.
                  </p>
                </div>
              </div>
            </SwiperSlide>
            {/* slide-4 */}
            <SwiperSlide>
              <div
                className="p-5 lg:relative"
                data-aos="fade-up"
                data-aos-duration="1000"
              >
                <img
                  src="/images/home-2/testi-shape.png"
                  className=" h-full hidden lg:block lg:h-[332px] xl:h-[316px] 2xl:h-full"
                  alt=""
                />
                <div className="lg:absolute lg:-top-[4px] lg:left-[40px] bg-whiteSmoke dark:bg-normalBlack ">
                  <div className="flex items-center flex-col sm:flex-row justify-between">
                    <div className="relative flex items-center">
                      <img
                        src="/images/home-2/testi-author2.jpg"
                        className="w-[100px] h-[100px] md:w-[131px] md:h-[131px] lg:w-[100px] lg:h-[100px] xl:w-[131px] xl:h-[131px]"
                        alt=""
                      />
                      <img
                        src="/images/home-2/qute.png"
                        className="absolute bottom-[-4px] left-[10%]"
                        alt=""
                      />

                      <div className="ml-4 lg:ml-6">
                        <h5 className="text-lg md:text-xl lg:text-2xl leading-[46px] text-lightBlack dark:text-white font-bold font-Garamond">
                          Alessandro Rossi
                        </h5>
                        <p className="text-sm sm:text-base leading-[46px] text-gray dark:text-lightGray font-medium font-Lora">
                          Milan, Italy
                        </p>
                      </div>
                    </div>
                    <div className="bg-white dark:bg-lightBlack rounded-full sm:rounded-none sm:rounded-l-full px-9 xl:px-5 2xl:px-9 py-[14px] mt-4 sm:mt-0">
                      <span className="flex items-center space-x-[5px] md:space-x-2 xl:space-x-3">
                        <FaStar className="text-khaki" size={14} />
                        <FaStar className="text-khaki" size={14} />
                        <FaStar className="text-khaki" size={14} />
                        <FaStar className="text-khaki" size={14} />
                        <FaStar className="text-khaki" size={14} />
                      </span>
                    </div>
                  </div>
                  <p className="py-6 px-5 sm:py-[34px] sm:px-10 text-justify text-sm sm:text-base lg:text-[17px] text-gray dark:text-lightGray font-Lora font-normal leading-[26px]">
                    As a food enthusiast, I was blown away by the culinary
                    expertise at LUXEDR. Each dish was a masterpiece, showcasing
                    fresh local ingredients prepared with world-class technique.
                  </p>
                </div>
              </div>
            </SwiperSlide>
          </Swiper>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
