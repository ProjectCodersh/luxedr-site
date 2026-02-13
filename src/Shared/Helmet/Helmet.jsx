import { Helmet } from "react-helmet-async";

const HelmetChanger = ({ title }) => {
  return (
    <Helmet>
      <title>LuxeDR - {title}</title>
    </Helmet>
  );
};

export default HelmetChanger;
