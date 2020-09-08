import React from "react";

function HeadingComponent(props) {
  return (
    <div className={props.headingStyle}>
      <h3>{props.title}</h3>
    </div>
  );
}

export default HeadingComponent;
