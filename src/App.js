import React, { useState } from "react";

import ButtonGroup from "./components/ButtonGroup";
import CreateEntry from "./components/CreateFtEntries";
import PaymentTable from "./components/PaymentTable";
import Heading from "./components/HeadingComponent";

import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";


function App() {
  const [showCreateEntry, setShowCreateEntry] = useState(false);
  const [paymentList, setPaymentList] = useState([]);

  return (
    <div className="App">

      <Heading title="Yes Banking Services" />

      <ButtonGroup
        showCreateEntry={showCreateEntry}
        setShowCreateEntry={setShowCreateEntry}
        paymentList={paymentList}
        setPaymentList={setPaymentList}
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
    </div>
  );
}

export default App;
