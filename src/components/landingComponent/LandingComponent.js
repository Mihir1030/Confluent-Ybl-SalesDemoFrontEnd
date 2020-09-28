import React from "react";
import PropTypes from "prop-types";

import CarouselComponent from "./CarouselComponent";
import Button from "../Button";

const LandingComponent = ({
  showLandingComponent,
  setshowLandingComponent,
}) => {
  const enterERP = () => {
    setshowLandingComponent(!showLandingComponent);
  };

  return (
    <div className="landing">
      <CarouselComponent />
      <div className="landingButtondiv">
        <Button
          text="Open Demo ERP"
          variant="success"
          buttonClick={enterERP}
          popoverContent={
            <p>
              This ERP is for presentation purpose. Client ERP can be different.
            </p>
          }
        />{" "}
      </div>
    </div>
  );
};

LandingComponent.propTypes = {
  showLandingComponent: PropTypes.bool.isRequired,
  setshowLandingComponent: PropTypes.func.isRequired,
};

export default LandingComponent;
