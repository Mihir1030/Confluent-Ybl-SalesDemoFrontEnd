import React, { useState } from "react";

import ButtonGroup from "./components/ButtonGroup";
import CreateEntry from "./components/CreateFtEntries";
import AlertDismissiable from "./components/AlertDismissible";
import PaymentTable from "./components/PaymentTable";
import StatusTable from "./components/StatusTable";
import Heading from "./components/HeadingComponent";

import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  const [showCreateEntry, setShowCreateEntry] = useState(false);
  const [paymentList, setPaymentList] = useState([]);
  const [alertMessage, setAlertMessage] = useState("");
  const [showAlert, setShowAlert] = useState(false);

  return (
    <div className="App">
      <br />

      <Heading title="Yes Banking Services" headingStyle="maintitle" />

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
