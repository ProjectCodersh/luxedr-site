import { Link } from "react-router-dom";
import { FaFacebookF, FaPinterestP, FaTwitter } from "react-icons/fa";
import { BiLogoLinkedin } from "react-icons/bi";


const Footer2 = () => {
  return (
    <footer className="lg:pt-[100px]  dark:bg-lightBlack ">
      <div className=" py-20 2xl:py-[120px]">
        <div className="Container grid items-start grid-cols-1 md:grid-cols-2 lg:grid-cols-9 2xl:grid-cols-12  justify-between gap-5 px-2">
          {/* logo and text */}
          <div
            className="px-5 lg:px-2 lg:col-span-3 2xl:col-span-4  "
            data-aos="fade-up"
            data-aos-duration="1000"
          >
            <img
              src="/images/extra/site-logo-2.png"
              className="dark:hidden"
              alt=""
            />
            <img
              src="/images/extra/site-logo-1.png"
              className="hidden dark:block"
              alt=""
            />
            <p className="text-sm xl:text-base leading-[26px] font-Lora font-normal text-gray dark:text-lightGray mt-6 lg:mt-[35px] 2xl:w-[345px]">
              Luxury travel and private hospitality experiences in the Dominican
              Republic. From private chefs and curated stays to full-service
              travel planning, we craft unforgettable, personalized escapes
              designed around you.
            </p>
          </div>
          {/* contact info */}
          <div
            className="px-5 lg:px-2 lg:col-span-2 2xl:col-span-3"
            data-aos="fade-up"
            data-aos-duration="1000"
          >
            <h4 className="text-lg leading-[46px] font-Garamond font-bold text pb-4 md:pb-5  text-lightBlack dark:text-white">
              CONTACT US
            </h4>
            <ul className="">
              <li className="text-gray dark:text-lightGray font-normal font-Lora text-sm xl:text-base mb-[15px] hover:text-khaki transition-all duration-300">
                <Link to="mailto:info.luxedr@gmail.com" className="">info.luxedr@gmail.com</Link>
              </li>
              <li className="text-gray dark:text-lightGray font-normal font-Lora text-sm xl:text-base mb-[15px] hover:text-khaki transition-all duration-300">
                <Link to="tel:+18294247560" className="">+1 (829) 424-7560</Link>
              </li>
              <li className="text-gray dark:text-lightGray font-normal font-Lora text-sm xl:text-base mb-[15px] hover:text-khaki transition-all duration-300">
                <Link to="https://maps.app.goo.gl/XZPpWNM8W3X1vCeF6" className="">Dominican Republic</Link>
              </li>
            </ul>

          </div>
          {/* information*/}
          <div
            className="px-5 lg:px-2 lg:col-span-2 2xl:col-span-2"
            data-aos="fade-up"
            data-aos-duration="1000"
          >
            <h4 className="text-lg leading-[46px] font-Garamond font-bold text pb-4 md:pb-5  text-lightBlack dark:text-white">
              INFORMATION
            </h4>

            <ul className="">
              <li className="text-gray dark:text-lightGray font-normal font-Lora text-sm xl:text-base mb-[15px] hover:text-khaki transition-all duration-300">
                <Link to="/">Home</Link>
              </li>
              <li className="text-gray dark:text-lightGray font-normal font-Lora text-sm xl:text-base mb-[15px] hover:text-khaki transition-all duration-300">
                <Link to="/experiences">Experiences</Link>
              </li>
              <li className="text-gray dark:text-lightGray font-normal font-Lora text-sm xl:text-base mb-[15px] hover:text-khaki transition-all duration-300">
                <Link to="/about">About</Link>
              </li>
              <li className="text-gray dark:text-lightGray font-normal font-Lora text-sm xl:text-base mb-[15px] hover:text-khaki transition-all duration-300">
                <Link to="/packages">Packages</Link>
              </li>
              <li className="text-gray dark:text-lightGray font-normal font-Lora text-sm xl:text-base mb-[15px] hover:text-khaki transition-all duration-300">
                <Link to="/contact">Contact</Link>
              </li>
            </ul>
          </div>
          {/* gallery*/}
          <div
            className="px-5 lg:px-2 lg:col-span-2  2xl:col-span-3"
            data-aos="fade-up"
            data-aos-duration="1000"
          >
            <h4 className="text-lg leading-[46px] font-Garamond font-bold text pb-4 md:pb-5  text-lightBlack dark:text-white">
              FOLLOW US
            </h4>
            {/* <div className="grid grid-cols-3 gap-[10px] py-[5px] 2xl:w-[300px] content-center ">
              <img src="/images/home-2/gallery-1.jpg" alt="" />
              <img src="/images/home-2/gallery-2.jpg" alt="" />
              <img src="/images/home-2/gallery-3.jpg" alt="" />
              <img src="/images/home-2/gallery-4.jpg" alt="" />
              <img src="/images/home-2/gallery-5.jpg" alt="" />
              <img src="/images/home-2/gallery-6.jpg" alt="" />
            </div> */}
            <div>
              <ul className="flex space-x-3">
                <li className="hover-animBg group transition-all duration-300  rounded-full border border-lightGray border-opacity-75 hover:border-khaki cursor-pointer w-[37px] h-[37px] grid items-center justify-center">
                  <Link to="#" className="">
                    <FaFacebookF className="text-lightGray text-opacity-75 group-hover:text-white group-hover:text-slateBlue-0 w-4 h-4 " />
                  </Link>
                </li>

                <li className="hover-animBg group transition-all duration-300  rounded-full border border-lightGray border-opacity-75 hover:border-khaki cursor-pointer w-[37px] h-[37px] grid items-center justify-center">
                  <Link to="#">
                    <FaTwitter className="text-lightGray text-opacity-75 group-hover:text-white group-hover:text-slateBlue-0 w-4 h-4 " />
                  </Link>
                </li>
                <li className="hover-animBg group transition-all duration-300  rounded-full border border-lightGray border-opacity-75 hover:border-khaki cursor-pointer w-[37px] h-[37px] grid items-center justify-center">
                  <Link to="#">
                    <BiLogoLinkedin className="text-lightGray text-opacity-75 group-hover:text-white group-hover:text-slateBlue-0 w-4 h-4 " />
                  </Link>
                </li>
                <li className="hover-animBg group transition-all duration-300  rounded-full border border-lightGray border-opacity-75 hover:border-khaki cursor-pointer w-[37px] h-[37px] grid items-center justify-center">
                  <Link to="#">
                    <FaPinterestP className="text-lightGray text-opacity-75 group-hover:text-white group-hover:text-slateBlue-0 w-4 h-4 " />
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      {/* bottom footer */}

      <div className="bg-whiteSmoke dark:bg-normalBlack py-7">
        <div className="Container flex flex-col sm:flex-row items-center justify-between">
          <p
            className="text-sm xl:text-base text-gray dark:text-lightGray
           font-Lora font-normal"
          >
            {` © ${new Date().getFullYear()} LUXEDR Resort. All Rights Reserved.`}
          </p>
          {/* <p
            className="text-sm xl:text-base text-gray dark:text-lightGray
           font-Lora font-normal"
          >
            Developed by: Dream-IT Team
          </p> */}
        </div>
      </div>
    </footer>
  );
};

export default Footer2;
