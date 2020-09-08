import React from "react";
import PropTypes from "prop-types";

import BootStrapButton from "react-bootstrap/Button";
import Popover from "react-bootstrap/Popover";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";

function Button(props) {
  const {
    badge,
    popoverTitle,
    popoverContent,
    popoverPlacement,
    variant,
    buttonClick,
    text,
  } = props;

  const popover = (
    <Popover id="popover-basic">
      <Popover.Title as="h3">{popoverTitle}</Popover.Title>
      <Popover.Content>{popoverContent}</Popover.Content>
    </Popover>
  );

  return (
    <OverlayTrigger
      // trigger="hover"
      placement={popoverPlacement}
      overlay={popover}
    >
      <BootStrapButton variant={variant} onClick={buttonClick}>
        {text}
        {badge}
      </BootStrapButton>
    </OverlayTrigger>
  );
}

Button.propTypes = {
  badge: PropTypes.element,
  popoverTitle: PropTypes.string.isRequired,
  popoverContent: PropTypes.element.isRequired,
  popoverPlacement: PropTypes.string.isRequired,
  variant: PropTypes.string.isRequired,
  buttonClick: PropTypes.func.isRequired,
  text: PropTypes.string.isRequired,
};

Button.defaultProps = {
  badge: null,
};

export default Button;
