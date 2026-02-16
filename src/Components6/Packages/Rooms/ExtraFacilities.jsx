import { useState, useRef, useEffect } from "react";
// import { HiArrowLongRight } from "react-icons/hi2";
// import { Link } from "react-router-dom";
import { useKeenSlider } from "keen-slider/react";
import { BsChevronLeft, BsChevronRight } from "react-icons/bs";
import PropTypes from "prop-types";

const clientFacilitiesSections = [
    {
        id: 1,
        title: "Breakfast Menus",
        icon: "/images/extra/food-icon-1.png",
        slides: [
            {
                id: 1,
                image: "/images/inner/facilities-1.jpg",
                label: "Traditional Dominican Start",
                description: "Mangú con Los Tres Golpes (mashed plantains with fried eggs, salami, and queso frito),fresh tropical fruit, and Dominican coffee.",
            },
            {
                id: 2,
                image: "/images/inner/facilities-2.jpg",
                label: "Caribbean Sunrise",
                description: "Arepitas de maíz (corn fritters), yucca fries, fresh avocado, passionfruit juice, and a light cheese plate.",
            },
            {
                id: 3,
                image: "/images/inner/facilities-3.jpg",
                label: "International Fusion",
                description: "American pancakes with guava syrup, French-style omelets, or a continental breakfast spread with European breads and cheeses.",
            },
        ],

    },
    {
        id: 2,
        title: "Lunch Menus",
        icon: "/images/extra/food-icon-2.png",
        description:
            "Holisticly foster premium experiences with our rooftop infinity pool and curated cocktail lounge for discerning guests.",
        link: "/room_details",
        slides: [
            {
                id: 1,
                image: "/images/inner/facilities-1.jpg",
                label: "Authentic Dominican Lunch",
                description: "Pollo guisado (stewed chicken) with rice, beans, and a crisp avocado salad.",
            },
            {
                id: 2,
                image: "/images/inner/facilities-2.jpg",
                label: "Coastal Catch",
                description: "Fresh pescado frito (fried fish) with tostones, coconut rice, and a tangy Caribbean slaw.",
            },
            {
                id: 3,
                image: "/images/inner/facilities-3.jpg",
                label: "Fusion Midday",
                description: "Mexican-style tacos with local seafood, Italian pasta with a tropical twist, orMediterranean grilled chicken salad.",
            },
        ],
    },
    {
        id: 3,
        title: "Dinner Menus",
        icon: "/images/extra/food-icon-3.png",

        description:
            "Seamlessly experience beachfront serenity with curated cabana service, sunset vistas, and personalized concierge support.",
        link: "/room_details",
        slides: [
            {
                id: 1,
                image: "/images/inner/facilities-1.jpg",
                label: "Dominican Feast",
                description: "Sancocho (rich Dominican stew) served with white rice, avocado, and artisanal bread.",
            },
            {
                id: 2,
                image: "/images/inner/facilities-2.jpg",
                label: "Luxury Seafood Night",
                description: "Lobster tail with garlic butter, shrimp mofongo, and a glass of fine Dominican rum or wine.",
            },
            {
                id: 3,
                image: "/images/inner/facilities-3.jpg",
                label: "International Gourmet",
                description: "Japanese sushi platter, Spanish paella, or classic French filet mignon with Caribbean sides.",
            },
        ],
    },
];

function FacilitiesSlider({ slides }) {
    // facilities slider breakpoints (inner slider remains draggable)
    const [sliderRef] = useKeenSlider({
        breakpoints: {
            "(min-width: 400px)": {
                slides: { origin: "center", perView: 1 },
                spacing: 10,
            },
            "(min-width: 500px)": {
                slides: { origin: "center", perView: 1.5 },
                spacing: 10,
            },
            "(min-width: 600px)": {
                slides: { origin: "center", perView: 1 },
                spacing: 15,
            },
            "(min-width: 768px)": {
                slides: { origin: "center", perView: 1 },
                spacing: 18,
            },
            "(min-width: 992px)": {
                slides: { origin: "center", perView: 2 },
                spacing: 20,
            },
        },
        loop: true,
        initial: 0,
    });

    const safeSlides = Array.isArray(slides) ? slides : [];

    const contentRefs = useRef([]);
    const [maxContentHeight, setMaxContentHeight] = useState(0);

    useEffect(() => {
        // measure the tallest content box so all slides share the same height
        const heights =
            contentRefs.current
                ?.filter(Boolean)
                .map((el) => el.scrollHeight) || [];

        if (heights.length) {
            const max = Math.max(...heights);
            if (max !== maxContentHeight) {
                setMaxContentHeight(max);
            }
        }
    }, [safeSlides, maxContentHeight]);

    return (
        <div
            ref={sliderRef}
            className="keen-slider col-span-6 sm:col-span-4"
            data-aos="zoom-in-up"
            data-aos-duration="1000"
        >
            {safeSlides.map((slide, index) => (
                <div key={slide.id} className="keen-slider__slide number-slide1">
                    <div className="col-span-2 relative">
                        <img src={slide.image} className="" alt={slide.label || ""} />
                        <div
                            ref={(el) => {
                                if (el) {
                                    contentRefs.current[index] = el;
                                }
                            }}
                            className="inline-flex items-start flex-col bg-lightBlack transition-all duration-300 w-[90%] float-right absolute bottom-0 group"
                            style={{ "minHeight": "180px" }}
                        >
                            <h4 className="text-white text-lg sm:text-xl lg:text-[18px] xl:text-[22px] leading-6 font-semibold font-Garamond px-5 my-[15px]">
                                {slide.label}
                            </h4>
                            <p className="font-Lora text-sm sm:text-base text-gray dark:text-lightGray leading-[26px] font-normal relative px-5 mb-[15px]">
                                {slide.description}
                            </p>

                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}

FacilitiesSlider.propTypes = {
    slides: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.oneOfType([PropTypes.number, PropTypes.string])
                .isRequired,
            image: PropTypes.string.isRequired,
            label: PropTypes.string,
            description: PropTypes.string,
        })
    ),
};

function ExtraFacilities() {

    // outer section slider state (button-controlled only)
    const [activeSection, setActiveSection] = useState(0);
    const totalSections = clientFacilitiesSections.length;

    const handlePrevSection = () => {
        setActiveSection((prev) => (prev === 0 ? totalSections - 1 : prev - 1));
    };

    const handleNextSection = () => {
        setActiveSection((prev) => (prev === totalSections - 1 ? 0 : prev + 1));
    };

    return (
        <section>
            {/* Extra Facilities */}
            <div className="bg-normalBlack py-20 lg:py-[120px] relative">
                <div className="Container pb-[100px] ">
                    {/* Section heading */}
                    <div
                        className="flex items-start md:items-end justify-between relative flex-col md:flex-row"
                        data-aos="fade-up"
                        data-aos-duration="1000"
                    >
                        <div className=" sapce-y-3 md:space-y-4 lg:space-y-5 md:w-[450px] xl:w-[550px] font-Garamond mb-5 md:mb-0">
                            <h5 className="text-base text-khaki leading-[26px] font-medium">
                                GOURMET DOMINICAN MENU
                            </h5>
                            <h1 className="text-xl sm:text-3xl 2xl:text-[38px] leading-[38px] lg:leading-[44px] text-white font-semibold uppercase">
                                A CULINARY JOURNEY WITHOUT BORDERS
                            </h1>
                            <p className="text-sm lg:text-base leading-[22px] sm:leading-[26px] text-lightGray font-normal font-Lora">
                                Gemini said
                                Dining with LUXEDR is more than a meal-it’s a performance. From soulful Dominican traditions to seamless global classics, our private chefs turn your table into a stage for limitless flavor.
                            </p>
                        </div>
                        <div className="flex items-center lg:space-x-5  space-x-3">
                            <button
                                className="lg:w-[50px] w-[30px] h-[30px] lg:h-[50px]  flex items-center justify-center border-[1px] border-gray  text-lightGray hover:bg-khaki hover:border-none group"
                                title="Previous facilities section"
                                onClick={handlePrevSection}
                            >
                                <BsChevronLeft className="w-5 h-5 text-gray  group-hover:text-white " />
                            </button>
                            <button
                                className="lg:w-[50px] w-[30px] h-[30px] lg:h-[50px]  flex items-center justify-center border-[1px] border-gray  text-lightGray hover:bg-khaki
             hover:border-none group"
                                title="Next facilities section"
                                onClick={handleNextSection}
                            >
                                <BsChevronRight className="w-5 h-5 text-gray   group-hover:text-white" />
                            </button>
                        </div>
                    </div>
                    <hr className="w-full h-[2px] text-gray bg-gray mt-10 " />

                    {/* Clients Facilities  (outer section slider) */}
                    <div className="mt-14 2xl:mt-[60px] overflow-hidden">
                        <div
                            className="flex transition-transform duration-500 ease-out"
                            style={{
                                transform: `translateX(-${activeSection * 100}%)`,
                            }}
                        >
                            {clientFacilitiesSections.map((section) => (
                                <div
                                    key={section.id}
                                    className="w-full flex-shrink-0 grid grid-cols-6 gap-5 md:gap-[30px] "
                                >
                                    <div
                                        className="col-span-6 sm:col-span-2 "
                                        data-aos="zoom-in-up"
                                        data-aos-duration="1000"
                                    >
                                        <img
                                            src={section.icon}
                                            alt="facilities-icon"
                                            className="w-10 h-10 md:w-20 md:h-20 xl:h-[100px] xl:w-[100px]"
                                        />
                                        <div className="my-5 2xl:my-[30px]">
                                            <h2 className="text-white text-xl sm:text-2xl 2xl:text-3xl leading-7 md:leading-8 lg:leading-9 xl:leading-10 2xl:leading-[44px] font-semibold font-Garamond">
                                                {section.title}
                                            </h2>
                                        </div>
                                    </div>
                                    {/* facilities slider (inner slider, unchanged design) */}
                                    <FacilitiesSlider slides={section.slides} />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default ExtraFacilities