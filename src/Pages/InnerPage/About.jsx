import BreadCrumb from "../../BreadCrumb/BreadCrumb";
import Facilities from "../../Components6/Facilities/Facilities";
import Player from "../../Components6/About/Player/Player";
import Events from "../../Components6/About/Events/Events";
import HelmetChanger from "../../Shared/Helmet/Helmet";
const About = () => {


  return (
    <section className="">
      <HelmetChanger title="About LUXEDR | Luxury Concierge & Culinary Retreat" description="Discover LUXEDR’s story, mission, and world-class concierge services combining luxury stays, gourmet dining, and curated Caribbean experiences." />
      <BreadCrumb title="About Us" home={""} />
      <Facilities />
      <Player />
      <Events />
    </section>
  );
};

export default About;
