import React from "react";
import PropTypes from "prop-types";

import BootStrapForm from "react-bootstrap/Form";
import BootStrapCol from "react-bootstrap/Col";

const InputComponent = ({ xs, label, value, type, onchangeFun }) => {
  const regexForWhiteSpace = /\s+/g;
  return (
    <BootStrapForm.Group
      as={BootStrapCol}
      xs={xs}
      controlId={`form${label.replace(regexForWhiteSpace, "")}`}
    >
      <BootStrapForm.Label>{label}</BootStrapForm.Label>
      <BootStrapForm.Control
        type={type}
        value={value}
        onChange={onchangeFun}
        placeholder={label}
        data-testid={`form${label.replace(regexForWhiteSpace, "")}`}
      />{" "}
    </BootStrapForm.Group>
  );
};

InputComponent.propTypes = {
  xs: PropTypes.string,
  label: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  type: PropTypes.string,
  onchangeFun: PropTypes.func.isRequired,
};

InputComponent.defaultProps = {
  xs: "auto",
  type: "text",
};

export default InputComponent;
