import React, { useState } from "react";

import Image from "react-bootstrap/Image";
import ButtonGroup from "./components/ButtonGroup";
import CreateEntry from "./components/CreateFtEntries";
import AlertDismissiable from "./components/AlertDismissible";
import PaymentTable from "./components/tables/PaymentTable";
import StatusTable from "./components/tables/StatusTable";
import Heading from "./components/HeadingComponent";
import LandingCmponent from "./components/landingComponent/LandingComponent";

import yesbanner from "./RESOURCES/logo.jpg";

import "./components/landingComponent/landingComponent.css";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  const [showLandingComponent, setshowLandingComponent] = useState(true);
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [showCreateEntry, setShowCreateEntry] = useState(false);
  const [paymentList, setPaymentList] = useState([]);

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
