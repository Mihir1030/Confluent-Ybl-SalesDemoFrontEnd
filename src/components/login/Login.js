import React, { useState } from "react";
import PropTypes from "prop-types";

import BootStrapForm from "react-bootstrap/Form";

import Button from "../Button";
import InputComponent from "../InputComponent";
import Heading from "../HeadingComponent";

const Login = ({ setLoginModal, setshowLandingComponent }) => {
  const [userName, setuserName] = useState("");
  const [password, setpassword] = useState("");

  const onClickLogin = () => {
    if (userName === "admin" && password === "12345") {
      setLoginModal(false);
      setshowLandingComponent(true);
    } else {
      console.log("wrong");
      alert("incorrect username/password");
    }
  };

  return (
    <div className="landing">
      <div className="createcenterlogin">
        <Heading title="API Banking Services" headingStyle="loginheading" />
        <BootStrapForm>
          {/* <BootStrapForm.Row> */}
          <InputComponent
            label="User Name"
            value={userName}
            onchangeFun={(event) => setuserName(event.target.value)}
          />
          {/* </BootStrapForm.Row>
          <BootStrapForm.Row> */}
          <InputComponent
            label="Password"
            value={password}
            type="password"
            onchangeFun={(event) => setpassword(event.target.value)}
          />
          {/* </BootStrapForm.Row> */}
          <BootStrapForm.Group>
            <Button
              text="Login"
              variant="success"
              buttonClick={onClickLogin}
              popoverContent={<p>Login for demo ERP</p>}
            />{" "}
          </BootStrapForm.Group>
        </BootStrapForm>
      </div>
    </div>
  );
};

Login.propTypes = {
  setLoginModal: PropTypes.func.isRequired,
  setshowLandingComponent: PropTypes.func.isRequired,
};

export default Login;
