import BreadCrumb from "../../BreadCrumb/BreadCrumb";
import ExtraService from "../../Components6/ExtraService/ExtraService";
import HelmetChanger from "../../Shared/Helmet/Helmet";

const Experiences = () => {
    return (
        <section className="">
            <HelmetChanger title="LUXEDR Gallery | Luxury Resort & Dining Showcase" description="Explore LUXEDR’s gallery featuring luxury resorts, curated stays, gourmet dishes, and personalized guest experiences in paradise." />
            <BreadCrumb title="Experiences" home={""} />
            <ExtraService />
        </section>
    )
};

export default Experiences