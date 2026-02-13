import BreadCrumb from "../../BreadCrumb/BreadCrumb";
import Facilities from "../../Components6/Facilities/Facilities";
import Player from "../../Components6/About/Player/Player";
import Events from "../../Components6/About/Events/Events";
const About = () => {


  return (
    <section className="">
      <BreadCrumb title="About Us" home={""} />
      <Facilities />
      <Player />
      <Events />
    </section>
  );
};

export default About;
