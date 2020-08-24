import React from "react";

import BootStrapForm from "react-bootstrap/Form";
import BootStrapCol from "react-bootstrap/Col";

function InputComponent(props) {
  return (
    <BootStrapForm.Group as={BootStrapCol} xs={props.xs} controlId={props.controlId}>
      <BootStrapForm.Label>{props.label}</BootStrapForm.Label>
      <BootStrapForm.Control
        type={props.type}
        value={props.value}
        onChange={props.onchangeFun}
        placeholder={props.placeholder}
      />{" "}
    </BootStrapForm.Group>
  );
}

export default InputComponent;