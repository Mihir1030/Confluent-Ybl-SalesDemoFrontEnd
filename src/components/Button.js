import React from "react";

import BootStrapButton from "react-bootstrap/Button";

function Button(props) {

  const badge = props.badge;

return <BootStrapButton variant={props.variant} onClick={props.buttonClick}>{props.text}{badge}</BootStrapButton>;
}

export default Button;
