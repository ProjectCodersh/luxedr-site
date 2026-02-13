const Brand = () => {
  const slides = [
    "Luxury Concierge Experience",
    "Private Chef Dining",
    "Caribbean Luxury Retreat",
    "Bespoke Travel Services",
    "Dominican Republic Luxury",
    "Gourmet Travel Experience",
    "Exclusive Villa Dining",
    "Tailor-Made Getaways",
    "Elite Island Hospitality",
  ];

  return (
    <div className="bg-khaki pt-[54px] pb-[44px] overflow-hidden flex">
      <style>
        {`
            @keyframes slide {
                0% { transform: translateX(0); }
                100% { transform: translateX(-50%); }
            }
            .animate-slide {
                animation: slide 70s linear infinite;
            }
        `}
      </style>
      <div
        className="flex items-center animate-slide whitespace-nowrap w-max"
        data-aos="fade-up"
        data-aos-duration="1000"
      >
        {[0, 1].map((i) => (
          <div key={i} className="flex items-center shrink-0">
            {slides.map((text, index) => (
              <div key={index} className="flex items-center">
                <span className="text-white text-lg md:text-xl lg:text-2xl font-Garamond mx-6 md:mx-10 uppercase tracking-wider">
                  {text}
                </span>
                <img
                  src="/images/extra/site-logo.png"
                  alt="Brand Logo"
                  className="w-5 h-5 md:w-8 md:h-8 object-contain opacity-80"
                />
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Brand;
