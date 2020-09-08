import React, { useState } from "react";

import ButtonGroup from "./components/ButtonGroup";
import CreateEntry from "./components/CreateFtEntries";
import AlertDismissiable from "./components/AlertDismissible";
import PaymentTable from "./components/PaymentTable";
import StatusTable from "./components/StatusTable";
import Heading from "./components/HeadingComponent";
import LandingCmponent from "./components/LandingComponent";

import Image from "react-bootstrap/Image";

import yesbanner from "./RESOURCES/logo.jpg";

import "./components/landingComponent.css";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  const [showCreateEntry, setShowCreateEntry] = useState(false);
  const [paymentList, setPaymentList] = useState([]);
  const [alertMessage, setAlertMessage] = useState("");
  const [showAlert, setShowAlert] = useState(false);
  const [showLandingComponent, setshowLandingComponent] = useState(true);

  return (
    <div className="App">
      {showLandingComponent ? (
        <LandingCmponent
          showLandingComponent={showLandingComponent}
          setshowLandingComponent={setshowLandingComponent}
        />
      ) : null}
      <br />
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
