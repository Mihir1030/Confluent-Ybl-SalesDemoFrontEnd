import React from "react";

import CarouselComponent from "./CarouselComponent"

function LandingComponent(props) {
  return (
  <div className="landing">
      <CarouselComponent
      ishidden={props.showLandingComponent}
      setHide={props.setshowLandingComponent}
      />
  </div>
  )
}
export default LandingComponent;
