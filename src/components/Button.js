import React from "react";

import BootStrapButton from "react-bootstrap/Button";
import Popover from "react-bootstrap/Popover";
import OverlayTrigger from "react-bootstrap/OverlayTrigger"

function Button(props) {
  const badge = props.badge;

  const popover = (
    <Popover id="popover-basic">
      <Popover.Title as="h3">{props.popoverTitle}</Popover.Title>
      <Popover.Content>
        {props.popoverContent}
      </Popover.Content>
    </Popover>
  );

  return (
    <OverlayTrigger trigger="hover" placement={props.popoverPlacement} overlay={popover}>
      <BootStrapButton variant={props.variant} onClick={props.buttonClick}>
        {props.text}
        {badge}
      </BootStrapButton>
    </OverlayTrigger>
  );
}

export default Button;
