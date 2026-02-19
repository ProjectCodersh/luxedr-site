
import BreadCrumb from "../../BreadCrumb/BreadCrumb";
import Faqs from "../../Components6/Packages/Rooms/Faqs";
// import ExtraFacilities from "../../Components6/Packages/Rooms/ExtraFacilities";
import Rooms from "../../Components6/Packages/Rooms/Rooms";
import ServiceDetails from "../../Components6/Packages/Rooms/ServiceDetails";
import HelmetChanger from "../../Shared/Helmet/Helmet";
const Packages = () => {


    return (
        <section className="">
            <HelmetChanger title="LUXEDR Packages | Luxury Stay & Dining Plans" description="Browse LUXEDR’s exclusive packages with luxury accommodations, private chef menus, and personalized concierge services." />
            <BreadCrumb title="Packages" home={""} />
            <Rooms />
            <ServiceDetails />
            <Faqs />
            {/* <ExtraFacilities /> */}
        </section>
    );
};

export default Packages;
