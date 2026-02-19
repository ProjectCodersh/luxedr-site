import { Helmet } from "react-helmet-async";
import PropTypes from "prop-types";

const HelmetChanger = ({ title, description }) => {
  return (
    <Helmet>
      <title>{title}</title>
      {description && (
        <meta name="description" content={description} />
      )}
    </Helmet>
  );
};

HelmetChanger.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string,
};

export default HelmetChanger;
