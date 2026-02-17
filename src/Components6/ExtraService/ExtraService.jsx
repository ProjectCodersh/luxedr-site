import { Link } from "react-router-dom";

// Service data to keep the JSX clean and scalable
const SERVICES = [
  {
    id: 1, title: "Welcome Experience", img: "/images/extra/experiences-1.png", description: "Our dedicated culinary team welcomes you"
  },
  {
    id: 2, title: "Culinary Artists", img: "/images/extra/experiences-2.png", description: "Expert chefs crafting personalized dishes"
  },
  {
    id: 3, title: "Seafood Platter", img: "/images/extra/experiences-3.png", description: "Fresh seafood prepared to perfection"
  },
  {
    id: 4, title: "Tropical Ceviche", img: "/images/extra/experiences-4.png", description: "Signature pineapple presentation"
  },
  {
    id: 5, title: "Gourmet Feast", img: "/images/extra/experiences-5.png", description: "Exquisite dinner experience"
  },
  {
    id: 6, title: "Artisan Preparations", img: "/images/extra/experiences-6.png", description: "Handcrafted culinary creations"
  },
  {
    id: 6, title: "Fresh Ingredients", img: "/images/extra/experiences-7.png", description: "Premium quality selections"
  },
  {
    id: 6, title: "Chef's Specialties", img: "/images/extra/experiences-8.png", description: "Signature dishes"
  },
  {
    id: 6, title: "Culinary Artistry", img: "/images/extra/experiences-9.png", description: "Every dish is a masterpiece"
  },
  {
    id: 6, title: "Premium Service", img: "/images/extra/experiences-10.png", description: "Attention to every detail"
  },
  {
    id: 6, title: "Seasonal Delights", img: "/images/extra/experiences-1.png", description: "Fresh seasonal ingredients"
  },
  {
    id: 6, title: "Gourmet Presentations", img: "/images/extra/experiences-2.png", description: "Beautiful plating"
  },
  {
    id: 6, title: "Tropical Flavors", img: "/images/extra/experiences-3.png", description: "Island-inspired cuisine"
  },
];

const ServiceCard = ({ title, img, description }) => (
  <div
    className={`extra-service bg-cover bg-center group relative overflow-hidden`}
    style={{ backgroundImage: `url('${img}')` }}
    data-aos="fade-up"
    data-aos-duration="1000"
  >
    {/* Transparent placeholder to maintain aspect ratio/height */}
    <img
      src={img}
      className="opacity-0 w-full h-[450px] 2xl:h-[500px]"
      alt={title}
    />

    {/* Animated Content Overlay */}
    <div className="px-[25px] py-10 absolute bottom-[-300px] lg:bottom-[-330px] 3xl:bottom-[-300px] group-hover:bottom-0 left-[18px] right-[18px] my-[18px] transition-all duration-500 bg-black/20 backdrop-blur-sm md:bg-transparent">
      <h3 className="text-2xl md:text-[26px] lg:text-[30] xl:text-[34px] leading-5 md:leading-[26px] xl:leading-[42px] text-white font-Garamond font-semibold text-left">
        {title}
      </h3>
      <p className="text-sm sm:text-base leading-[22px] lg:leading-[26px] font-Lora font-normal text-white text-left">
        {description}
      </p>
      {/* <div className="float-left">
        <Link to="/room_details">
          <button className="btn-primary">Learn more</button>
        </Link>
      </div> */}
    </div>
  </div>
);

const ExtraService = () => {
  return (
    <section className="bg-[#ededed] dark:bg-normalBlack py-20 2xl:py-[120px]">
      <div className="Container">

        {/* Section Header */}
        <div
          className="flex md:flex-row flex-col items-center justify-between space-y-1 md:space-y-0"
          data-aos="fade-up"
          data-aos-duration="1000"
        >
          <div>
            <p className="text-base leading-7 md:leading-10 lg:leading-[40px] 3xl:leading-[66px] text-khaki font-normal font-Lora text-center md:text-left">
              Curated Dominican Luxury
            </p>
            <h3 className="text-lightBlack dark:text-white text-2xl sm:text-3xl md:text-4xl lg:text-[40px] 2xl:text-[45px] leading-7 md:leading-9 font-semibold font-Garamond">
              LUXEDR Moments
            </h3>
          </div>
          <div>
            <p className="text-[13px] md:text-base leading-[26px] text-gray dark:text-white font-normal font-Lora text-center w-full md:w-[250px] lg:w-[350px] xl:w-[465px] 2xl:w-[560px] p-5 md:p-0">
              Private dining, stunning villas, and personalized hospitality; all served for our guests.
            </p>
          </div>
          <Link to="/packages">
            <button className="btn-items text-sm md:text-base">
              BOOK NOW
            </button>
          </Link>
        </div>

        {/* Section Content: Grid System */}
        <div className="pt-10 xl:pt-[60px]">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[20px] lg:gap-[30px]">
            {SERVICES.map((service) => (
              <ServiceCard
                key={service.id}
                title={service.title}
                img={service.img}
                description={service.description}
              />
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};

export default ExtraService;