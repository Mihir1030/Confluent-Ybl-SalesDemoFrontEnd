import React from "react";

import Badge from "react-bootstrap/Badge";
import Button from "./Button";

function ButtonGroup(props) {

  const changeCreateFtEntriesVisibility = (e) => {
    props.setShowCreateEntry(!props.showCreateEntry);
  };

  const startPay = (e) => {
    //00011020001772
    //HDFC0000001
    const tempPaymentArray = [...props.paymentList];

    for (const [i, payJson] of tempPaymentArray.entries()) {
      if (payJson.ispaymentDone === false) {
        const requestOptions = {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payJson),
        };
        fetch(
          "https://yes-sales-team-demo.herokuapp.com/yesapi/pay",
          requestOptions
        )
          .then(async (response) => {
            const data = await response.json();

            // check for error response
            if (!response.ok) {
              // get error message from body or default to response status
              const error = (data && data.message) || response.status;
              return Promise.reject(error);
            }

            console.log(data);
            tempPaymentArray[i].uniqueRefrenceNumber =
              data.uniqueRefrenceNumber;
            tempPaymentArray[i].error = data.error.includes('IFSC')?'Incorrect IFSC code':'NA';
            tempPaymentArray[i].ispaymentDone = true;

            var filteredCurrentEnrty = props.paymentList.filter(function (el) {
              return el.uniqueRequestNo !== tempPaymentArray[i].uniqueRequestNo;
            });
            filteredCurrentEnrty.push(tempPaymentArray[i]);
            props.setPaymentList(filteredCurrentEnrty);
            console.log(props.paymentList);
          })
          .catch((error) => {
            console.error("There was an error!", error);
          });
      }
    }
  };

  const checkStatus = (e) => {
    //00011020001772
    //HDFC0000001
    const tempPaymentArray = [...props.paymentList];

    for (const [i, payJson] of tempPaymentArray.entries()) {
      if (payJson.ispaymentDone === true) {
        const requestOptions = {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payJson),
        };
        fetch(
          "https://yes-sales-team-demo.herokuapp.com/yesapi/status",
          requestOptions
        )
          .then(async (response) => {
            const data = await response.json();

            // check for error response
            if (!response.ok) {
              // get error message from body or default to response status
              const error = (data && data.message) || response.status;
              return Promise.reject(error);
            }

            console.log(data);
            tempPaymentArray[i].status = data.statuscode;
            tempPaymentArray[i].statusError = data.error;

            var filteredCurrentEnrty = props.paymentList.filter(function (el) {
              return el.uniqueRequestNo !== tempPaymentArray[i].uniqueRequestNo;
            });
            filteredCurrentEnrty.push(tempPaymentArray[i]);
            props.setPaymentList(filteredCurrentEnrty);
            console.log(props.paymentList);
          })
          .catch((error) => {
            console.error("There was an error! in status rest call", error);
          });
      }
    }
  };

  const checkBalance = (e) => {
    console.log("balance");
  };

  const clearData = (e) => {
    console.log("clear");
  };

  const paymentBadge = (
    <Badge variant="light">
      {
        props.paymentList.filter(e => e.ispaymentDone === false).length
      }
    </Badge>
  );

  return (
    <div className="buttonGroupTop">
      <Button
        text="Create Payment"
        buttonClick={changeCreateFtEntriesVisibility}
      />{" "}
      <Button
        text="Start Payment "
        badge={paymentBadge}
        variant="primary"
        buttonClick={startPay}
      />{" "}
      <Button text="Payment Status" variant="primary" buttonClick={checkStatus} />{" "}
      <Button text="Balance" variant="primary" buttonClick={checkBalance} />{" "}
      <Button text="Clear data" variant="primary" buttonClick={clearData} />{" "}
    </div>
  );
}

export default ButtonGroup;
