import React from "react";
import PropTypes from "prop-types";

import CarouselComponent from "./CarouselComponent";

function LandingComponent(props) {
  const { showLandingComponent, setshowLandingComponent } = props;
  return (
    <div className="landing">
      <CarouselComponent
        isLandinghidden={showLandingComponent}
        setLandingHideBool={setshowLandingComponent}
      />
    </div>
  );
}

LandingComponent.propTypes = {
  showLandingComponent: PropTypes.bool.isRequired,
  setshowLandingComponent: PropTypes.func.isRequired,
};

export default LandingComponent;
