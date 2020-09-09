import React from "react";
import PropTypes from "prop-types";

import Carousel from "react-bootstrap/Carousel";

import Button from "./Button";

import yes from "../RESOURCES/yes.jpeg";

function CarouselComponent(props) {
  const style = {
    color: "black",
    fontWeight: 900,
  };

  const { isLandinghidden, setLandingHideBool } = props;

  const enterERP = () => {
    setLandingHideBool(!isLandinghidden);
  };

  return (
    <div className="carouselHolder">
      <Carousel>
        <Carousel.Item>
          <img className="d-block w-100" src={yes} alt="First slide" />
          <Carousel.Caption>
            <div className="caption">
              <h3 style={style}>Fund Transfer API</h3>
              <p style={style}>Transfer funds from your coorporate to anyone</p>
              <p style={style}> Automate your payments</p>
            </div>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img className="d-block w-100" src={yes} alt="Third slide" />

          <Carousel.Caption>
            <div className="caption">
              <h3 style={style}>Get Status API</h3>
              <p style={style}>Get payment status in one click</p>
            </div>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>
      <br />
      <Button
        text="Open Demo ERP"
        variant="success"
        buttonClick={enterERP}
        popoverTitle="Demo ERP"
        popoverContent={
          <p>
            This ERP is for presentation purpose. Client ERP can be different.
          </p>
        }
        popoverPlacement="bottom"
      />{" "}
    </div>
  );
}

CarouselComponent.propTypes = {
  isLandinghidden: PropTypes.bool.isRequired,
  setLandingHideBool: PropTypes.func.isRequired,
};
export default CarouselComponent;
