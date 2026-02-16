import Accordion from "./Accordion";

export default function AnimatedAccordionPage() {
  //  All Faqs and  answers.
  const faqs = [
    {
      title: "Can I request meals tailored to my personal taste?",
      text: "Absolutely. Our world-class chefs craft dishes entirely around your preferences. Whether it’s a specific cuisine, dietary requirement, or a custom menu concept, simply select your preferences while booking your stay, and we’ll take care of the rest.",
      active: false,
    },

    {
      title: "Can you arrange a personalized getaway or themed stay?",
      text: "Yes, we specialize in bespoke experiences. From romantic escapes to celebration themes and private culinary events, we’ve created many customized stays for our guests, and we’d love to design one just for you. Take a glimpse at our gallery for inspiration.",
      active: false,
    },

    {
      title: "How is LUXEDR different from a regular hotel?",
      text: "Unlike traditional hotels, we focus on fully personalized hospitality. Every detail, from your menu and ambience to your activities and service, is curated exclusively for you. It’s not just a stay; it’s a tailored luxury experience designed around your desires.",
      active: false,
    },

    {
      title: "Do you only provide stay and meals? What about other services?",
      text: "We offer far more than accommodation and dining. Our full concierge service includes airport pick-up and drop-off, private transportation, curated adventures, sea excursions, local experiences, and personalized activity planning, all seamlessly arranged for you.",
      active: false,
    },

  ];

  return (
    <main className="relative flex flex-col justify-center  overflow-hidden">
      <div className="w-full mx-auto px-4 md:px-6 ">
        <div
          className=" grid items-end grid-cols-1 lg:grid-cols-2  gap-x-[30px]"
          data-aos="zoom-in-up"
          data-aos-duration="1000"
        >
          {faqs.map((faq, index) => (
            <Accordion
              key={index}
              title={faq.title}
              id={`faqs-${index}`}
              active={faq.active}
            >
              {faq.text}
            </Accordion>
          ))}
        </div>
      </div>
    </main>
  );
}
