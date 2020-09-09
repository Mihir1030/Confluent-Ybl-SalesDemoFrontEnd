import React from "react";
import PropTypes from "prop-types";

import BootStrapForm from "react-bootstrap/Form";
import BootStrapCol from "react-bootstrap/Col";

function InputComponent(props) {
  const { xs, controlId, label, type, value, onchangeFun, placeholder } = props;
  return (
    <BootStrapForm.Group as={BootStrapCol} xs={xs} controlId={controlId}>
      <BootStrapForm.Label>{label}</BootStrapForm.Label>
      <BootStrapForm.Control
        type={type}
        value={value}
        onChange={onchangeFun}
        placeholder={placeholder}
      />{" "}
    </BootStrapForm.Group>
  );
}

InputComponent.propTypes = {
  xs: PropTypes.string.isRequired,
  controlId: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onchangeFun: PropTypes.func.isRequired,
  placeholder: PropTypes.string.isRequired,
};

export default InputComponent;
