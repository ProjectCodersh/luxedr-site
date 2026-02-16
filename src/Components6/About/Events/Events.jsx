import { HiOutlineArrowNarrowRight } from "react-icons/hi";
import { Link } from "react-router-dom";

const Events = () => {
  return (
    <section className="">
      {/* Event one */}
      <div className="bg-[url('/images/extra/about-card-2-light.png')] dark:bg-[url('/images/extra/about-card-2-dark.png')] bg-no-repeat py-20 2xl:py-[133px] bg-cover bg-center">
        <div
          className="p-7 md:p-[40px] lg:p-[50px] 2xl:p-[60px] bg-white dark:bg-normalBlack dark: sm:w-[450px] md:w-[550px] xl:w-[590px] ml-[0%] sm:ml-[10%] 3xl:ml-[15%]"
          data-aos="fade-up"
          data-aos-duration="1000"
        >
          <div className="flex items-center justify-center">

            <h5 className="px-5 text-sm md:text-base leading-[26px] lg:leading-[42px] text-gray dark:text-lightGray font-Garamond font-semibold uppercase">
              ROOTED IN ELEGANCE
            </h5>

          </div>
          <h3 className="text-center text-2xl md:text-3xl 2xl:text-[38px] leading-[26px] lg:leading-[38px] 2xl:leading-[42px] text-lightBlack dark:text-white mt-1 mb-[15px] font-bold font-Garamond">
            Our Story
          </h3>
          <p className="font-Lora leading-[23px] sm:leading-[26px] text-gray dark:text-lightGray font-normal text-sm sm:text-base text-center mb-6 2xl:mb-9">
            Founded with a passion for culinary excellence and Caribbean hospitality, LUXDR Resort represents the pinnacle of personalized Gourmet experiences. Nestled in a stunning tropical paradise, we've created an intimate retreat where world-class chefs craft bespoke menus exclusively for you. Every dish tells a story, every meal creates a memory, and every guest becomes part of our LUXDR family.
          </p>

          <Link to={"/experiences"} className="flex items-center  justify-center">
            <button
              to="#"
              className="flex items-center text-lightBlack dark:text-white transition-all duration-300 text-sm sm:text-base leading-5 lg:leading-[38px] font-Lora font-medium border border-[#dddddd] dark:border-[#474747] px-7 xl:px-8 py-[6px] hover-animBg hover:text-white after:rounded-none "
            >
              Our Gallery
              <HiOutlineArrowNarrowRight className="ml-2" />
            </button>
          </Link>
        </div>
      </div>
      {/* event two */}
      <div className="bg-[url('/images/extra/about-card-1-light.png')] dark:bg-[url('/images/extra/about-card-1-dark.png')] bg-no-repeat py-20 2xl:py-[133px] bg-cover bg-center">
        <div
          className="p-7 md:p-[40px] lg:p-[50px] 2xl:p-[60px] bg-white dark:bg-normalBlack dark: sm:w-[450px] md:w-[550px] xl:w-[590px] ml-0 sm:ml-[10%] md:ml-[18%] lg:ml-[35%]  xl:ml-[45%] 2xl:ml-[53%]"
          data-aos="fade-up"
          data-aos-duration="1000"
        >
          <div className="flex items-center  justify-center">

            <h5 className="px-5 text-sm md:text-base leading-[26px] lg:leading-[42px] text-gray dark:text-lightGray font-Garamond font-semibold uppercase">
              PROMISE IN MOTION
            </h5>

          </div>
          <h3 className="text-center text-2xl md:text-3xl 2xl:text-[38px] leading-[26px] lg:leading-[38px] 2xl:leading-[42px] text-lightBlack dark:text-white mt-1 mb-[15px] font-bold font-Garamond">
            Our Mission
          </h3>
          <p className="font-Lora leading-[23px] sm:leading-[26px] text-gray dark:text-lightGray font-normal text-sm sm:text-base text-center mb-6 2xl:mb-9">
            To deliver unforgettable culinary journeys that celebrate fresh, locally sourced ingredients while honouring culinary traditions. We believe that exceptional food, paired with personalized service and a breathtaking setting, transforms a vacation into a life-changing experience.
          </p>

          <Link to={"/packages"} className="flex items-center  justify-center">
            <button
              to="#"
              className="flex items-center text-lightBlack dark:text-white transition-all duration-300 text-sm sm:text-base leading-5 lg:leading-[38px] font-Lora font-medium border border-[#dddddd] dark:border-[#474747] px-7 xl:px-8 py-[6px] hover-animBg hover:text-white after:rounded-none "
            >
              Explore Now
              <HiOutlineArrowNarrowRight className="ml-2" />
            </button>
          </Link>
        </div>
      </div>
      {/* event three */}

    </section>
  );
};

export default Events;
