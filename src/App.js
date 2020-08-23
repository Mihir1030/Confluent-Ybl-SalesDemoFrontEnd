import React, { useState } from "react";

import ButtonGroup from "./components/ButtonGroup";
import CreateEntry from "./components/CreateFtEntries";
import PaymentTable from "./components/PaymentTable";

import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  const [showCreateEntry, setShowCreateEntry] = useState(false);
  const [paymentList, setPaymentList] = useState([]);

  return (
    <div className="App">
      <p>Dummy Payments</p>

      <ButtonGroup
        showCreateEntry={showCreateEntry}
        setShowCreateEntry={setShowCreateEntry}
      />

      <br />

      {showCreateEntry ? (
        <CreateEntry
          paymentList={paymentList}
          setPaymentList={setPaymentList}
        />
      ) : null}

      <br />

      <PaymentTable paymentList={paymentList}/>
    </div>
  );
}

export default App;
