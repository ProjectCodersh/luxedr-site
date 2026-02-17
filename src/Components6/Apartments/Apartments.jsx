import { LiaDotCircleSolid } from "react-icons/lia";

import { Link } from "react-router-dom";
import "../../Components4/Testimonial/testimonials.css";
import "keen-slider/keen-slider.min.css";
import { useState } from "react";
import { BiChevronDown } from "react-icons/bi";

// Facilities section and Apartments section on this jsx file
const Apartments = () => {
  const [open, setOpen] = useState(false);
  const [guestOpen, setGuestOpen] = useState(false);
  const [room, setRoom] = useState(1);
  const [adult, setAdult] = useState(1);
  const [children, setChildren] = useState(0);

  return (
    <section className="dark:bg-lightBlack">
      {/* facilities part */}
      <div className="relative z-[1] ">
        <div
          className="Container-Hero bg-lightBlack dark:bg-normalBlack  grid grid-cols-2 md:grid-cols-3 xl:grid-cols-5 2xl:grid-cols-5 items-center justify-center font-Lora py-3 lg:py-4 xl:py-5 2xl:py-6 border-t-[3px] border-t-khaki mt-[-75px]  left-0 right-0 z-[1]"
          data-aos="fade-down"
          data-aos-duration="1000"
        >
          <div className="p-3">
            <p className="text-sm text-lightGray ml-3">Check In</p>
            <div className="flex items-center pt-[2px] ">
              <input
                type="date"
                className="border-none bg-transparent focus:outline-transparent focus:border-transparent text-white focus:border-none outline-0  text-sm lg:text-base focus:ring-transparent"
                required
              />
            </div>
          </div>
          <div className="p-3">
            <p className="text-sm text-lightGray ml-3">Check Out</p>
            <div className="flex items-center pt-[2px] ">
              <input
                type="date"
                className="border-none bg-transparent focus:outline-transparent focus:border-transparent text-white focus:border-none outline-0  text-sm lg:text-base focus:ring-transparent"
                defaultValue="26 August, 2023"
                required
              />
            </div>
          </div>
          <div className="p-3">
            <div
              className={`${({ isActive, isPending }) =>
                isPending
                  ? "pending"
                  : isActive
                    ? "active"
                    : ""} text-white  px-3 py-2 w-full block transition-all duration-300 group relative `}
              to="#"
            >
              <span
                className="flex items-center justify-between text-sm text-lightGray cursor-pointer"
                onClick={() => setOpen(!open)}
                title="click hear to open and close rooms extender"
              >
                Rooms
                <BiChevronDown className="" />
              </span>
              <div className="pt-[10px] text-sm sm:text-base">{room} Room</div>
              <div className="absolute pt-5  z-20">
                <div
                  className={`shadow-2xl ${open ? "" : "hidden"
                    } rounded-sm bg-white text-black w-60 text-left dark:bg-normalBlack dark:text-white transition-all duration-500 text-sm py-4 `}
                >
                  <div className="py-2 px-5 group cursor-pointer">
                    <li className="flex items-center justify-between">
                      <div className="">{room} Room</div>
                      <div className="flex items-center space-x-2">
                        <button
                          className="w-5 h-5 md:w-6 md:h-6 bg-khaki text-white"
                          onClick={() => setRoom(room + 1)}
                        >
                          +
                        </button>
                        <button
                          className="w-5 h-5 md:w-6 md:h-6 bg-khaki text-white"
                          onClick={() => setRoom(room - 1)}
                          disabled={room <= 1}
                        >
                          -
                        </button>
                      </div>
                    </li>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="p-3">
            <div
              className={`text-white   px-3 py-2 w-full block transition-all duration-300 group relative `}
              to="#"
            >
              <span
                className="flex items-center justify-between text-sm text-lightGray cursor-pointer"
                onClick={() => setGuestOpen(!guestOpen)}
                title="click hear to open and close Adult And Children extender"
              >
                Guests
                <BiChevronDown className="" />
              </span>
              <div className="pt-[10px] text-sm sm:text-base">
                {adult} Adult, {children} Child
              </div>
              <div className="absolute pt-5  z-20 ml-[-120px] sm:ml-0">
                <div
                  className={`shadow-2xl ${guestOpen ? "" : "hidden"
                    } rounded-sm bg-white text-black w-60 text-left dark:bg-normalBlack dark:text-white transition-all duration-500 text-sm py-4 left`}
                >
                  <div className="py-2 px-5 group cursor-pointer">
                    <li className="flex items-center justify-between">
                      <div className="">{adult} Adult</div>
                      <div className="flex items-center space-x-2">
                        <button
                          className="w-5 h-5 md:w-6 md:h-6 bg-khaki text-white"
                          onClick={() => setAdult(adult + 1)}
                        >
                          +
                        </button>
                        <button
                          className="w-5 h-5 md:w-6 md:h-6 bg-khaki text-white"
                          onClick={() => setAdult(adult - 1)}
                          disabled={adult <= 1}
                        >
                          -
                        </button>
                      </div>
                    </li>
                    <li className="flex items-center justify-between mt-1">
                      <div className="">{children} Child</div>
                      <div className="flex items-center space-x-2">
                        <button
                          className="w-5 h-5 md:w-6 md:h-6 bg-khaki text-white"
                          onClick={() => setChildren(children + 1)}
                        >
                          +
                        </button>
                        <button
                          className="w-5 h-5 md:w-6 md:h-6 bg-khaki text-white"
                          onClick={() => setChildren(children - 1)}
                          disabled={children < 1}
                        >
                          -
                        </button>
                      </div>
                    </li>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <Link to="/packages">
            <button className="w-[142px] h-10 lg:h-[50px] text-[15px] bg-khaki font-Garamond border border-khaki text-white mx-auto col-span-2  md:col-span-1 lg:col-span-1 relative z-10 before:absolute before:top-0 before:right-0 before:-z-10 before:w-0 before:h-full before:bg-lightBlack before:transition-all before:duration-500 hover:before:w-full hover:before:left-0">
              Checkout Now
            </button>
          </Link>
        </div>
      </div>
      {/* THE BEST APARTMENTS */}
      <div className="py-20 2xl:py-[120px] Container">
        <div className="Container lg:flex items-center ">
          {/* best-apartments image */}
          <div
            className="w-full  px-[20px] lg:pr-[20px] 2xl:px-[30px] relative"
            data-aos="fade-up"
            data-aos-duration="1000"
          >
            <img src="/images/extra/hero-card-1.png" className="" alt="" />
            <div className="w-[120px] h-[85px] sm:w-[195px] sm:h-[145px] bg-khaki grid items-center justify-center text-white font-Garamond absolute left-[28px] bottom-[40%]">
              <div className="text-center">
                <h1 className="text-5xl sm:text-[80px] leading-[26px] font-semibold">
                  500+
                </h1>
                <p className="text-base sm:text-lg leading-[26px] mt-1 sm:mt-4 md:mt-8">
                  Happy Guests Hosted
                </p>
              </div>
            </div>
          </div>
          {/* best-apartments content */}
          <div
            className="w-full  lg:pl-[20px] xl:px-[50px] mt-6 sm:mt-10 lg:mt-0"
            data-aos="fade-down"
            data-aos-duration="1000"
          >
            <div className="flex items-center">
              <div className="relative mr-[10px]">
                <hr className="w-10 h-[2px] bg-khaki text-khaki" />
                <span className="w-[8px] h-[8px] bg-khaki rounded-full absolute -top-[3px] animation-move"></span>
              </div>
              <p className="text-sm font-medium font-Lora leading-[26px] text-khaki  ">
                Private Culinary Experience
              </p>
            </div>

            <h2
              className="text-lightBlack dark:text-white text-[22px] sm:text-3xl md:text-4xl xl:text-[38px] leading-7 md:leading-9 lg:leading-10 2xl:leading-[43px]
              font-bold font-Garamond mt-3 mb-5"
            >
              Personalized Gourmet Excellence, Crafted Around You
            </h2>
            <p className="text-sm lg:text-base leading-[22px] sm:leading-[26px] text-gray dark:text-lightGray font-normal font-Lora mb-5 xl:mb-[30px]">
              At LUXEDR, dining is not just a meal; it’s a tailored culinary
              experience designed around your tastes, schedule, and lifestyle.
              Our private chefs prepare fresh, high-quality dishes exclusively
              for you, whether you prefer elegant fine dining, vibrant island
              flavors, or comfort meals made just the way you like them.
            </p>

            <div className="sm:flex items-center justify-between  ">
              <ul className="space-y-2 2xl:space-y-3">
                <li className="flex items-center space-x-[8px]">
                  <LiaDotCircleSolid size={16} className="text-khaki" />
                  <p className="text-sm sm:text-base leading-[26px] text-lightBlack dark:text-white font-medium font-Lora">
                    World-class chef
                  </p>
                </li>
                <li className="flex items-center space-x-[8px]">
                  <LiaDotCircleSolid size={16} className="text-khaki" />
                  <p className="text-sm sm:text-base leading-[26px] text-lightBlack dark:text-white font-medium font-Lora">
                    Meals based on your taste
                  </p>
                </li>
              </ul>
              <ul className="space-y-2 2xl:space-y-3 mt-5 sm:mt-0">
                <li className="flex items-center space-x-[8px]">
                  <LiaDotCircleSolid size={16} className="text-khaki" />
                  <p className="text-sm sm:text-base leading-[26px] text-lightBlack dark:text-white font-medium font-Lora">
                    Special dietary requests
                  </p>
                </li>
                <li className="flex items-center space-x-[8px]">
                  <LiaDotCircleSolid size={16} className="text-khaki" />
                  <p className="text-sm sm:text-base leading-[26px] text-lightBlack dark:text-white font-medium font-Lora">
                    Fresh, locally sourced ingredients
                  </p>
                </li>
              </ul>
            </div>
            <Link to={"/packages"}>
              <button className="btn-primary mt-[30px]">Explore More </button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Apartments;
