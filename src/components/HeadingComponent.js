import React from "react";
import PropTypes from "prop-types";

function HeadingComponent(props) {
  const { headingStyle, title } = props;

  return (
    <div className={headingStyle}>
      <h3>{title}</h3>
    </div>
  );
}

HeadingComponent.propTypes = {
  headingStyle: PropTypes.string,
  title: PropTypes.string.isRequired,
};

HeadingComponent.defaultProps = {
  headingStyle: "headingComponent",
};

export default HeadingComponent;
