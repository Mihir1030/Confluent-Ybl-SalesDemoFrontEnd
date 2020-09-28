import React from "react";

import Carousel from "react-bootstrap/Carousel";

import yes from "../../RESOURCES/yes.jpeg";

const CarouselComponent = () => {
  const style = {
    color: "black",
    fontWeight: 900,
  };

  return (
    <div className="carouselHolder">
      <Carousel>
        <Carousel.Item>
          <img className="d-block w-100" src={yes} alt="First slide" />
          <Carousel.Caption>
            <div className="caption">
              <h3 style={style}>Fund Transfer API</h3>
              <p style={style}>Transfer funds from your coorporate account</p>
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
    </div>
  );
};

export default CarouselComponent;
