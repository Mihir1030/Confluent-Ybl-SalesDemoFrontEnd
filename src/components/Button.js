import React from "react";
import PropTypes from "prop-types";

import BootStrapButton from "react-bootstrap/Button";
import Popover from "react-bootstrap/Popover";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";

const Button = ({
  badge,
  popoverContent,
  popoverPlacement,
  variant,
  buttonClick,
  text,
  isLoading,
}) => {
  const popoverToolTip = (
    <Popover id="popover-basic">
      <Popover.Title as="h3">{text}</Popover.Title>
      <Popover.Content>{popoverContent}</Popover.Content>
    </Popover>
  );

  return (
    <OverlayTrigger
      // trigger="hover"
      placement={popoverPlacement}
      overlay={popoverToolTip}
    >
      <BootStrapButton
        variant={variant}
        onClick={buttonClick}
        disabled={isLoading}
      >
        {text}
        {badge}
      </BootStrapButton>
    </OverlayTrigger>
  );
};

Button.propTypes = {
  badge: PropTypes.element,
  popoverContent: PropTypes.element.isRequired,
  popoverPlacement: PropTypes.string,
  variant: PropTypes.string,
  buttonClick: PropTypes.func.isRequired,
  text: PropTypes.string.isRequired,
  isLoading: PropTypes.bool,
};

Button.defaultProps = {
  badge: null,
  isLoading: false,
  variant: "primary",
  popoverPlacement: "bottom",
};

export default Button;
