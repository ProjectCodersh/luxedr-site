
import BreadCrumb from "../../BreadCrumb/BreadCrumb";
import Faqs from "../../Components6/Packages/Rooms/Faqs";
// import ExtraFacilities from "../../Components6/Packages/Rooms/ExtraFacilities";
import Rooms from "../../Components6/Packages/Rooms/Rooms";
import ServiceDetails from "../../Components6/Packages/Rooms/ServiceDetails";
const Packages = () => {


    return (
        <section className="">
            <BreadCrumb title="Packages" home={""} />
            <Rooms />
            <ServiceDetails />
            <Faqs />
            {/* <ExtraFacilities /> */}
        </section>
    );
};

export default Packages;
