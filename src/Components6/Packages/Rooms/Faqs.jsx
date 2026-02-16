import AnimatedAccordionPage from "../../../Components6/Accordion/AnimatedAccordionPage";


function Faqs() {
    return (
        <div><div className="bg-whiteSmoke dark:bg-lightBlack py-20 2xl:py-[120px]">
            <div className="Container">
                <div
                    className="text-center sm:px-8 md:px-[80px] lg:px-[120px] xl:px-[200px] 2xl:px-[335px] mx-auto px-5 Container"
                    data-aos="fade-up"
                    data-aos-duration="1000"
                >
                    {/* Section logo */}
                    <div className="flex items-center justify-center space-x-2">
                        <hr className="w-[100px] h-[1px] bg-lightGray dark:bg-gray text-lightGray dark:text-gray" />
                        <img
                            src="/images/extra/site-logo.png"
                            alt="room_section_logo"
                            className="w-[50px] h-[50px]"
                        />
                        <hr className="w-[100px] h-[1px] bg-lightGray dark:bg-gray text-lightGray dark:text-gray" />
                    </div>
                    <h1 className="text-xl sm:text-2xl md:text-3xl 2xl:text-[38px] leading-[42px] 2xl:leading-[52px] text-lightBlack dark:text-white mt-[10px] mb-[14px] font-Garamond font-semibold uppercase">
                        Everything You Should Know Before You Arrive
                    </h1>
                    <p className="text-[13px] md:text-base leading-[26px] text-gray dark:text-white font-normal font-Lora text-center w-full p-5 md:p-0">
                        From personalized dining to curated escapes, here’s how we redefine luxury beyond the ordinary.</p>
                </div>
                {/* accordion Plan */}
                <div className="mt-14 2xl:mt-[60px]">
                    <div className="">
                        <AnimatedAccordionPage />
                    </div>
                </div>
            </div>
        </div></div>
    )
}

export default Faqs