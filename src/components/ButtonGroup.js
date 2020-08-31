import React from "react";

import Badge from "react-bootstrap/Badge";
import Button from "./Button";

function ButtonGroup(props) {
  const changeCreateFtEntriesVisibility = (event) => {
    props.setShowCreateEntry(!props.showCreateEntry);
  };

  const startPayments = (event) => {
    const tempPaymentsArray = [...props.paymentList];

    for (const currentPaymentEntry of tempPaymentsArray) {
      if (!currentPaymentEntry.ispaymentDone) {
        const requestOptions = {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
          },
          body: JSON.stringify(currentPaymentEntry),
        };
        fetch(
          "https://yes-sales-team-demo.herokuapp.com/yesapi/pay",
          requestOptions
        )
          .then(async (response) => {
            const paymentResponseData = await response.json();

            // check for error response
            if (!response.ok) {
              // get error message from body or default to response status
              const error =
                // (paymentResponseData && paymentResponseData.message) ||
                response.status.toString();
              return Promise.reject(error);
            } else if (paymentResponseData.yestimeout) {
              const error = "timeout";
              return Promise.reject(error);
            }

            currentPaymentEntry.uniqueRefrenceNumber =
              paymentResponseData.uniqueRefrenceNumber;
            currentPaymentEntry.error = paymentResponseData.error.includes(
              "IFSC"
            )
              ? "Incorrect IFSC code"
              : "NA";
            currentPaymentEntry.ispaymentDone = true;

            var tempPaymentListWithoutCurrentPaymentEntry = props.paymentList.filter(
              (entry) =>
                entry.uniqueRequestNo !== currentPaymentEntry.uniqueRequestNo
            );
            tempPaymentListWithoutCurrentPaymentEntry.push(currentPaymentEntry);
            props.setPaymentList(tempPaymentListWithoutCurrentPaymentEntry);
          })
          .catch((error) => {
            if (error === "timeout") {
              props.setAlertMessage(
                "Please try again/ Check if UAT payment server is under maintanance."
              );
              props.setShowAlert(true);
            } else if (error.includes("NetworkError")) {
              props.setAlertMessage("Please check internet connection");
              props.setShowAlert(true);
              console.error("There was an error!", error);
            }else{
              console.error("There was an error!", error);
            }
          });
      }
    }
  };

  const checkStatus = (event) => {
    const tempPaymentsArray = [...props.paymentList];

    for (const currentPaymentEntry of tempPaymentsArray) {
      if (currentPaymentEntry.ispaymentDone) {
        const requestOptions = {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(currentPaymentEntry),
        };
        fetch(
          "https://yes-sales-team-demo.herokuapp.com/yesapi/status",
          requestOptions
        )
          .then(async (response) => {
            const paymentStatusReponseData = await response.json();

            // check for error response
            if (!response.ok) {
              // get error message from body or default to response status
              const error =
                response.status;
              return Promise.reject(error);
            }

            currentPaymentEntry.status = paymentStatusReponseData.statuscode;
            currentPaymentEntry.statusError = paymentStatusReponseData.error;
            currentPaymentEntry.isstatusDone = true;

            var tempPaymentListWithoutCurrentEntry = props.paymentList.filter(
              (paymentEntry) =>
                paymentEntry.uniqueRequestNo !==
                currentPaymentEntry.uniqueRequestNo
            );
            tempPaymentListWithoutCurrentEntry.push(currentPaymentEntry);
            props.setPaymentList(tempPaymentListWithoutCurrentEntry);
          })
          .catch((error) => {
            console.error("There was an error! in status rest call", error);
          });
      }
    }
  };

  // const checkBalance = (event) => {
  //   console.log("balance");
  // };

  const clearPaymentsData = (event) => {
    props.setPaymentList([]);
    console.log("clear");
  };

  const pendingPaymentsCountBadge = (
    <Badge variant="light">
      {
        props.paymentList.filter((paymentEntry) => !paymentEntry.ispaymentDone)
          .length
      }
    </Badge>
  );

  return (
    <div className="buttonGroupTop">
      <Button
        text="Create Payment"
        variant="primary"
        buttonClick={changeCreateFtEntriesVisibility}
      />{" "}
      <Button
        text="Start Payment "
        badge={pendingPaymentsCountBadge}
        variant="primary"
        buttonClick={startPayments}
      />{" "}
      <Button
        text="Payment Status"
        variant="primary"
        buttonClick={checkStatus}
      />{" "}
      {/* <Button text="Balance" variant="outline-primary" buttonClick={checkBalance} />{" "} */}
      <Button
        text="Clear data"
        variant="primary"
        buttonClick={clearPaymentsData}
      />{" "}
    </div>
  );
}

export default ButtonGroup;
