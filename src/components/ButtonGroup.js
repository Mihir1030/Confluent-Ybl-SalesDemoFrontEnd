import React from "react";

import Button from "./Button";

function ButtonGroup(props) {

  const changeCreateFtEntriesVisibility = (e) => {
    props.setShowCreateEntry(!props.showCreateEntry);
  };

  const startPay = (e) => {
    console.log('pay');
  };

  const checkBalance = (e) => {
    console.log('balance');
  };

  const clearData = (e) => {
    console.log('clear');
  };

  return (
    <div className="buttonGroupTop">
      <Button text="Create Payment" buttonClick={changeCreateFtEntriesVisibility} />{" "}
      <Button text="Start Payment" buttonClick={startPay} />{" "}
      <Button text="Balance" buttonClick={checkBalance} />{" "}
      <Button text="Clear data" buttonClick={clearData} />{" "}
    </div>
  );
}

export default ButtonGroup;
