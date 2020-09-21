import React from "react";
import PropTypes from "prop-types";

import BootStrapForm from "react-bootstrap/Form";
import BootStrapCol from "react-bootstrap/Col";

const InputComponent = ({ xs, label, value, onchangeFun }) => {
  const regexForWhiteSpace = /\s+/g;
  return (
    <BootStrapForm.Group
      as={BootStrapCol}
      xs={xs}
      controlId={`form${label.replace(regexForWhiteSpace, "")}`}
    >
      <BootStrapForm.Label>{label}</BootStrapForm.Label>
      <BootStrapForm.Control
        type="text"
        value={value}
        onChange={onchangeFun}
        placeholder={label}
      />{" "}
    </BootStrapForm.Group>
  );
};

InputComponent.propTypes = {
  xs: PropTypes.string,
  label: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onchangeFun: PropTypes.func.isRequired,
};

InputComponent.defaultProps = {
  xs: "auto",
};

export default InputComponent;
