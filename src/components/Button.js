import React from "react";

import BootStrapButton from "react-bootstrap/Button";

function Button(props) {
  return <BootStrapButton variant="primary" onClick={props.buttonClick}>{props.text}</BootStrapButton>;
}

export default Button;
