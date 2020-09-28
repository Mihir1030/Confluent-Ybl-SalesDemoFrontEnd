import React, { useState } from "react";

import Image from "react-bootstrap/Image";
import ButtonGroup from "./components/ButtonGroup";
import CreateEntry from "./components/CreateFtEntries";
import AlertDismissiable from "./components/AlertDismissible";
import PaymentTable from "./components/tables/PaymentTable";
import StatusTable from "./components/tables/StatusTable";
import Heading from "./components/HeadingComponent";
import LandingCmponent from "./components/landingComponent/LandingComponent";
import Login from "./components/login/Login";

import yesbanner from "./RESOURCES/logo.jpg";

import "./components/landingComponent/landingComponent.css";
import "./components/login/login.css";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  const [showLoginModal, setLoginModal] = useState(true);
  const [showLandingComponent, setshowLandingComponent] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [showCreateEntry, setShowCreateEntry] = useState(false);
  const [paymentList, setPaymentList] = useState([]);

  return (
    <div className="App">
      {showLoginModal ? (
        <Login
          setLoginModal={setLoginModal}
          setshowLandingComponent={setshowLandingComponent}
        />
      ) : null}
      {showLandingComponent ? (
        <LandingCmponent
          showLandingComponent={showLandingComponent}
          setshowLandingComponent={setshowLandingComponent}
        />
      ) : null}
      <Image src={yesbanner} rounded />

      <br />

      <Heading title="API Banking Services" headingStyle="maintitle" />

      {showAlert ? (
        <AlertDismissiable
          setShowAlert={setShowAlert}
          alertMessage={alertMessage}
        />
      ) : null}

      <br />

      <ButtonGroup
        showCreateEntry={showCreateEntry}
        setShowCreateEntry={setShowCreateEntry}
        paymentList={paymentList}
        setPaymentList={setPaymentList}
        setShowAlert={setShowAlert}
        setAlertMessage={setAlertMessage}
      />

      <br />

      {showCreateEntry ? (
        <CreateEntry
          paymentList={paymentList}
          setPaymentList={setPaymentList}
          setShowAlert={setShowAlert}
          setAlertMessage={setAlertMessage}
        />
      ) : null}

      <br />

      <PaymentTable paymentList={paymentList} />

      <br />

      {!showCreateEntry ? <StatusTable paymentList={paymentList} /> : null}

      <br />
    </div>
  );
}

export default App;
