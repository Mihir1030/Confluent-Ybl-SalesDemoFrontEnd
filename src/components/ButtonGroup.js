import React from "react";
import PropTypes from "prop-types";

import Badge from "react-bootstrap/Badge";
import Button from "./Button";

function ButtonGroup(props) {
  const changeCreateFtEntriesVisibility = () => {
    props.setShowCreateEntry(!props.showCreateEntry);
  };

  const processFetchPaymentResponse = (
    currentPaymentEntry,
    paymentResponseData
  ) => {
    const entryForUpdate = { ...currentPaymentEntry };
    entryForUpdate.uniqueRefrenceNumber =
      paymentResponseData.uniqueRefrenceNumber;
    entryForUpdate.error = paymentResponseData.error.includes("IFSC")
      ? "Incorrect IFSC code"
      : "NA";
    entryForUpdate.ispaymentDone = true;

    const tempPaymentListWithoutCurrentPaymentEntry = props.paymentList.filter(
      (entry) => entry.uniqueRequestNo !== currentPaymentEntry.uniqueRequestNo
    );
    tempPaymentListWithoutCurrentPaymentEntry.push(currentPaymentEntry);
    props.setPaymentList(tempPaymentListWithoutCurrentPaymentEntry);
  };

  const processFetchStatusResponse = (
    currentPaymentEntry,
    paymentStatusReponseData
  ) => {
    const entryForUpdate = { ...currentPaymentEntry };
    entryForUpdate.status = paymentStatusReponseData.statuscode;
    entryForUpdate.bankRefrenceNumber =
      paymentStatusReponseData.bankRefrenceNumber;
    entryForUpdate.statusError = paymentStatusReponseData.error.includes(
      "Request Not Found"
    )
      ? "Request Not Found"
      : paymentStatusReponseData.error;
    entryForUpdate.isstatusDone = true;

    const tempPaymentListWithoutCurrentEntry = props.paymentList.filter(
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

  const getFetchRequestOptionsObject = (requestBody) => {
    const requestBodyToStringfiy = { ...requestBody };
    return {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify(requestBodyToStringfiy),
    };
  };

  const initiateFetchRequest = (
    entryToProcess,
    restApiEndpoint,
    responseProcessing,
    errorMessage
  ) => {
    const entry = entryToProcess;
    const requestOptions = getFetchRequestOptionsObject(entry);
    fetch(restApiEndpoint, requestOptions)
      .then(async (response) => {
        const responseData = await response.json();

        // check for error response
        if (!response.ok) {
          // get error message from body or default to response status
          const error =
            // (paymentResponseData && paymentResponseData.message) ||
            response.status;
          return Promise.reject(error);
        }
        if (responseData.yestimeout) {
          const error = "timeout";
          return Promise.reject(error);
        }
        return Promise.resolve(responseData);
      })
      .then(
        (result) => responseProcessing(entry, result),
        (error) => handleFetchError(error, errorMessage)
      );
  };

  const onPaymentOrStatusClick = (
    restEndpoint,
    ifCondition,
    responseProcessing,
    errorMessage
  ) => {
    const tempPaymentsArray = [...props.paymentList];

    tempPaymentsArray
      .filter((entryInArray) => ifCondition(entryInArray))
      .forEach((entryInArray) =>
        initiateFetchRequest(
          entryInArray,
          restEndpoint,
          responseProcessing,
          errorMessage
        )
      );
  };

  const clearPaymentsData = () => {
    props.setPaymentList([]);
  };

  const countPendingPayments = () => {
    return props.paymentList.filter(
      (paymentEntry) => !paymentEntry.ispaymentDone
    ).length;
  };
  const pendingPaymentsCountBadge = (
    <Badge variant="light">{countPendingPayments()}</Badge>
  );

  const setTextForCreateEntryButton = () => {
    return !props.showCreateEntry ? "Create Payment" : " X close";
  };

  const setCreateEntryButtonVariantValue = () => {
    const buttonClass = !props.showCreateEntry ? "primary" : "danger";
    return buttonClass;
  };

  const setCreateEntryButtonToolTipTitle = () => {
    return !props.showCreateEntry ? "Create Payments" : "Close";
  };

  const setCreateEntryButtonToolTipText = () => {
    const text = !props.showCreateEntry
      ? "Create demo payments for ERP. These fileds are for demo presentation. Actual payment request will have more field."
      : "Done creating payment enrty. Click to show status table";
    return text;
  };
  return (
    <div className="buttonGroupTop">
      <Button
        text={setTextForCreateEntryButton()}
        variant={setCreateEntryButtonVariantValue()}
        buttonClick={changeCreateFtEntriesVisibility}
        popoverTitle={setCreateEntryButtonToolTipTitle()}
        popoverContent={<p>{setCreateEntryButtonToolTipText()}</p>}
        popoverPlacement="left"
      />{" "}
      <Button
        text="Start Payment "
        badge={pendingPaymentsCountBadge}
        variant="primary"
        buttonClick={() =>
          onPaymentOrStatusClick(
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
          onPaymentOrStatusClick(
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

ButtonGroup.propTypes = {
  paymentList: PropTypes.arrayOf(PropTypes.object).isRequired,
  setPaymentList: PropTypes.func.isRequired,
  showCreateEntry: PropTypes.bool.isRequired,
  setShowCreateEntry: PropTypes.func.isRequired,
  setShowAlert: PropTypes.func.isRequired,
  setAlertMessage: PropTypes.func.isRequired,
  // fadein: PropTypes.bool.isRequired,
  // setfadein: PropTypes.func.isRequired,
};

export default ButtonGroup;
