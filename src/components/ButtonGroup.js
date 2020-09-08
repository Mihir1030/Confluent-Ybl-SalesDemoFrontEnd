import React from "react";

import Badge from "react-bootstrap/Badge";
import Button from "./Button";

function ButtonGroup(props) {
  const changeCreateFtEntriesVisibility = (event) => {
    props.setShowCreateEntry(!props.showCreateEntry);
  };

  const makeRestPostRequest = (
    restEndpoint,
    ifCondition,
    responseProcessing,
    errorMessage
  ) => {
    const tempPaymentsArray = [...props.paymentList];

    for (const currentPaymentEntry of tempPaymentsArray) {
      if (ifCondition(currentPaymentEntry)) {
        const requestOptions = {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
          },
          body: JSON.stringify(currentPaymentEntry),
        };
        fetch(restEndpoint, requestOptions)
          .then(async (response) => {
            const responseData = await response.json();

            // check for error response
            if (!response.ok) {
              // get error message from body or default to response status
              const error =
                // (paymentResponseData && paymentResponseData.message) ||
                response.status;
              return Promise.reject(error);
            } else if (responseData.yestimeout) {
              const error = "timeout";
              return Promise.reject(error);
            }

            responseProcessing(currentPaymentEntry, responseData);
          })
          .catch((error) => {
            handleFetchError(error, errorMessage);
          });
      }
    }
  };

  const processFetchPaymentResponse = (
    currentPaymentEntry,
    paymentResponseData
  ) => {
    currentPaymentEntry.uniqueRefrenceNumber =
      paymentResponseData.uniqueRefrenceNumber;
    currentPaymentEntry.error = paymentResponseData.error.includes("IFSC")
      ? "Incorrect IFSC code"
      : "NA";
    currentPaymentEntry.ispaymentDone = true;

    var tempPaymentListWithoutCurrentPaymentEntry = props.paymentList.filter(
      (entry) => entry.uniqueRequestNo !== currentPaymentEntry.uniqueRequestNo
    );
    tempPaymentListWithoutCurrentPaymentEntry.push(currentPaymentEntry);
    props.setPaymentList(tempPaymentListWithoutCurrentPaymentEntry);
  };

  const processFetchStatusResponse = (
    currentPaymentEntry,
    paymentStatusReponseData
  ) => {
    currentPaymentEntry.status = paymentStatusReponseData.statuscode;
    currentPaymentEntry.bankRefrenceNumber =
      paymentStatusReponseData.bankRefrenceNumber;
    currentPaymentEntry.statusError = paymentStatusReponseData.error.includes(
      "Request Not Found"
    )
      ? "Request Not Found"
      : paymentStatusReponseData.error;
    currentPaymentEntry.isstatusDone = true;

    var tempPaymentListWithoutCurrentEntry = props.paymentList.filter(
      (paymentEntry) =>
        paymentEntry.uniqueRequestNo !== currentPaymentEntry.uniqueRequestNo
    );
    tempPaymentListWithoutCurrentEntry.push(currentPaymentEntry);
    props.setPaymentList(tempPaymentListWithoutCurrentEntry);
  };

  const handleFetchError = (error, message) => {
    if (error === "timeout") {
      props.setAlertMessage(
        "Please try again/ Check if UAT payment server is under maintanance."
      );
      props.setShowAlert(true);
    } else {
      console.error(message, error);
    }
  };

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
        text={!props.showCreateEntry ? "Create Payment" : " X close"}
        variant={!props.showCreateEntry ? "primary" : "danger"}
        buttonClick={changeCreateFtEntriesVisibility}
        popoverTitle="Create Payments"
        popoverContent={
          <p>
            Create demo payments for ERP. These fileds are for demo
            presentation. Actual payment request will have more field.
          </p>
        }
        popoverPlacement="left"
      />{" "}
      <Button
        text="Start Payment "
        badge={pendingPaymentsCountBadge}
        variant="primary"
        buttonClick={() =>
          makeRestPostRequest(
            "https://yes-sales-team-demo-backend.herokuapp.com/yesapi/pay",
            (entry) => !entry.ispaymentDone,
            processFetchPaymentResponse,
            "this error during payment!:"
          )
        }
        popoverTitle="Send Payments"
        popoverContent={
          <p>
            On click Payments will be sent to Yes Bank server for processing
            over HTTPS connection.After processing the payments bank will send
            response, which will be updated in Payments table.
          </p>
        }
        popoverPlacement="bottom"
      />{" "}
      <Button
        text="Payment Status"
        variant="primary"
        buttonClick={() =>
          makeRestPostRequest(
            "https://yes-sales-team-demo-backend.herokuapp.com/yesapi/status",
            (entry) => entry.ispaymentDone,
            processFetchStatusResponse,
            "this error during payment status!:"
          )
        }
        popoverTitle="Get Payments Status"
        popoverContent={
          <p>
            Demo ERP sends the Unique Request Numbers to the bank and gets
            payment status in response. Which will be updated in satus table.
          </p>
        }
        popoverPlacement="bottom"
      />{" "}
      {/* <Button text="Balance" variant="outline-primary" buttonClick={checkBalance} />{" "} */}
      <Button
        text="Clear data"
        variant="danger"
        buttonClick={clearPaymentsData}
        popoverTitle="Clear data"
        popoverContent={<p>Delete all payment dta from demo ERP.</p>}
        popoverPlacement="right"
      />{" "}
    </div>
  );
}

export default ButtonGroup;
