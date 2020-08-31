import React from "react";

function HeadingComponent(props) {


    return(
        <div className={props.headingStyle}>
        <h2>{props.title}</h2>
      </div>
    );
}

export default HeadingComponent;