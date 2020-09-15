import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";

import Badge from "react-bootstrap/Badge";
import Button from "./Button";

function ButtonGroup(props) {
  const [loading, setLoading] = useState(false);

  const {
    paymentList,
    setPaymentList,
    showCreateEntry,
    setShowCreateEntry,
    setShowAlert,
    setAlertMessage,
  } = props;

  useEffect(() => {
    setLoading(false);
  }, [paymentList]);

  const changeCreateFtEntriesVisibility = () => {
    setShowCreateEntry(!showCreateEntry);
  };

  const processFetchPaymentResponse = (paymentResponseDataArray) => {
    let oldPaymentlistState = JSON.parse(JSON.stringify(paymentList));

    const updatedPaymentObjects = [];

    // eslint-disable-next-line no-restricted-syntax
    for (const paymentResponseData of paymentResponseDataArray) {
      const paymentToUpdate = {
        ...paymentList.find(
          (entry) =>
            entry.uniqueRequestNo === paymentResponseData.uniqueRequestNumber
        ),
      };

      paymentToUpdate.uniqueRefrenceNumber =
        paymentResponseData.uniqueRefrenceNumber;

      paymentToUpdate.error = paymentResponseData.error.includes("IFSC")
        ? "Incorrect IFSC code"
        : "NA";

      paymentToUpdate.ispaymentDone = true;

      oldPaymentlistState = oldPaymentlistState.filter(
        (entry) => entry.uniqueRequestNo !== paymentToUpdate.uniqueRequestNo
      );
      updatedPaymentObjects.push(paymentToUpdate);
    }

    setPaymentList([...updatedPaymentObjects, ...oldPaymentlistState]);
  };

  const processFetchStatusResponse = (paymentStatusReponseDataArray) => {
    let oldPaymentlistState = JSON.parse(JSON.stringify(paymentList));

    const updatedPaymentObjects = [];

    // eslint-disable-next-line no-restricted-syntax
    for (const statusResponseData of paymentStatusReponseDataArray) {
      const paymentEntryToUpdate = {
        ...paymentList.find(
          (entry) =>
            entry.uniqueRequestNo === statusResponseData.requestRefrenceNumber
        ),
      };

      paymentEntryToUpdate.status = statusResponseData.statuscode;

      paymentEntryToUpdate.bankRefrenceNumber =
        statusResponseData.bankRefrenceNumber;

      paymentEntryToUpdate.statusError = statusResponseData.error.includes(
        "Request Not Found"
      )
        ? "Request Not Found"
        : statusResponseData.error;

      paymentEntryToUpdate.isstatusDone =
        paymentEntryToUpdate.status === "COMPLETED" ||
        paymentEntryToUpdate.status === "FAILED" ||
        paymentEntryToUpdate.status === "SENT_TO_BENEFICIARY" ||
        paymentEntryToUpdate.statusError === "Request Not Found";

      oldPaymentlistState = oldPaymentlistState.filter(
        (paymentEntry) =>
          paymentEntry.uniqueRequestNo !== paymentEntryToUpdate.uniqueRequestNo
      );

      updatedPaymentObjects.push(paymentEntryToUpdate);
    }

    setPaymentList([...updatedPaymentObjects, ...oldPaymentlistState]);
  };

  const handleFetchError = (error, message) => {
    if (error === "timeout") {
      setAlertMessage(
        "Please try again/ Check if UAT payment server is under maintanance."
      );
      setShowAlert(true);
    } else {
      console.error(message, error);
    }
  };

  const getFetchRequestOptionsObject = (requestBody, restApiEndpoint) => {
    const requestBodyToStringfiy = { ...requestBody };
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify(requestBodyToStringfiy),
    };
    return fetch(restApiEndpoint, options);
  };

  const initiateFetchRequest = async (fetchObjArray, errorMessage) => {
    const requestResponses = [];
    const responses = await Promise.all(fetchObjArray);
    let jsonData = null;

    // eslint-disable-next-line no-restricted-syntax
    for (const response of responses) {
      if (response.ok) {
        // eslint-disable-next-line no-await-in-loop
        jsonData = await response.json();

        if (jsonData.yestimeout) {
          const error = "timeout";
          handleFetchError(error, errorMessage);
        }

        requestResponses.push(jsonData);
      } else {
        handleFetchError(response.statusText, errorMessage);
      }
    }
    return requestResponses;
  };

  const onPaymentOrStatusClick = (
    restEndpoint,
    ifCondition,
    responseProcessing,
    errorMessage
  ) => {
    const tempPaymentsArray = paymentList.filter((entryInArray) =>
      ifCondition(entryInArray)
    );

    if (tempPaymentsArray.length === 0) return;

    setLoading(true);

    const arryOfFetchObj = tempPaymentsArray.map((entry) =>
      getFetchRequestOptionsObject(entry, restEndpoint)
    );

    initiateFetchRequest(arryOfFetchObj, errorMessage)
      .then((result) => responseProcessing(result))
      .catch((err) => console.log("during fetch", restEndpoint, err));
  };

  const clearPaymentsData = () => {
    setPaymentList([]);
  };

  const countPendingPayments = () => {
    return paymentList.filter((paymentEntry) => !paymentEntry.ispaymentDone)
      .length;
  };
  const pendingPaymentsCountBadge = (
    <Badge variant="light">{countPendingPayments()}</Badge>
  );

  const countPendingStatus = () => {
    return paymentList.filter(
      (paymentEntry) => paymentEntry.ispaymentDone && !paymentEntry.isstatusDone
    ).length;
  };
  const pendingStatusCountBadge = (
    <Badge variant="light">{countPendingStatus()}</Badge>
  );

  const setTextForCreateEntryButton = () => {
    return !showCreateEntry ? "Create Payment" : " X close";
  };

  const setCreateEntryButtonVariantValue = () => {
    const buttonClass = !showCreateEntry ? "primary" : "danger";
    return buttonClass;
  };

  const setCreateEntryButtonToolTipTitle = () => {
    return !showCreateEntry ? "Create Payments" : "Close";
  };

  const setCreateEntryButtonToolTipText = () => {
    const text = !showCreateEntry
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
        text={loading ? "Sending payments… " : "Start Payment "}
        badge={pendingPaymentsCountBadge}
        variant="primary"
        isLoading={loading}
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
        text={loading ? "Getting payment status… " : "Payment Status "}
        badge={pendingStatusCountBadge}
        variant="primary"
        isLoading={loading}
        buttonClick={() =>
          onPaymentOrStatusClick(
            "https://yes-sales-team-demo-backend.herokuapp.com/yesapi/status",
            (entry) => !entry.isstatusDone,
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
        popoverContent={<p>Delete all payment data from demo ERP.</p>}
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
};

export default ButtonGroup;
