import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";

import Badge from "react-bootstrap/Badge";
import Button from "./Button";

const ButtonGroup = ({
  paymentList,
  setPaymentList,
  showCreateEntry,
  setShowCreateEntry,
  setShowAlert,
  setAlertMessage,
}) => {
  const [loadingPayments, setLoadingPayments] = useState(false);
  const [loadingStatus, setLoadingStatus] = useState(false);

  useEffect(() => {
    setLoadingPayments(false);
    setLoadingStatus(false);
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

  const handleFetchError = (error, errorTitle) => {
    if (error === "timeout") {
      setAlertMessage(
        "Please try again/ Check if UAT payment server is under maintanance."
      );
      setShowAlert(true);
    } else {
      setAlertMessage(
        "Please refresh and try again/ Check your internet connection"
      );
      setShowAlert(true);
      console.error(errorTitle, error);
    }
  };

  const getFetchRequestObject = (requestBody, restApiEndpoint) => {
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

  const initiateFetchRequestsAndGetResponse = async (
    fetchObjArray,
    errorTitle
  ) => {
    const restApiCallJsonResponses = [];
    const fetchResponseObjects = await Promise.all(fetchObjArray);
    let jsonObject = null;

    // eslint-disable-next-line no-restricted-syntax
    for (const response of fetchResponseObjects) {
      if (response.ok) {
        // eslint-disable-next-line no-await-in-loop
        jsonObject = await response.json();
        console.log("hello, request recieved");

        if (jsonObject.yestimeout) {
          const error = "timeout";
          handleFetchError(error, errorTitle);
        }

        restApiCallJsonResponses.push(jsonObject);
      } else {
        handleFetchError(response.statusText, errorTitle);
      }
    }
    return restApiCallJsonResponses;
  };

  const onPaymentOrStatusClick = (
    ifCondition,
    setLoadingFunction,
    restEndpoint,
    errorMessage,
    responseProcessingFunction
  ) => {
    const tempPaymentsArray = paymentList.filter((entryInArray) =>
      ifCondition(entryInArray)
    );

    if (tempPaymentsArray.length === 0) return;

    setLoadingFunction(true);

    const arryOfFetchObj = tempPaymentsArray.map((entry) =>
      getFetchRequestObject(entry, restEndpoint)
    );

    initiateFetchRequestsAndGetResponse(arryOfFetchObj, errorMessage)
      .then((result) => responseProcessingFunction(result))
      .catch((err) => handleFetchError(err, `during fetch ${restEndpoint}`));
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
        popoverContent={<p>{setCreateEntryButtonToolTipText()}</p>}
        popoverPlacement="left"
      />{" "}
      <Button
        text={loadingPayments ? "Sending payments… " : "Start Payment "}
        badge={pendingPaymentsCountBadge}
        isLoading={loadingPayments}
        buttonClick={() =>
          onPaymentOrStatusClick(
            (entry) => !entry.ispaymentDone,
            setLoadingPayments,
            "https://yes-sales-team-demo-backend.herokuapp.com/yesapi/pay",
            "this error during payment!:",
            processFetchPaymentResponse
          )
        }
        popoverContent={
          <p>
            On click Payments will be sent to Yes Bank server for processing
            over HTTPS connection.After processing the payments bank will send
            response, which will be updated in Payments table.
          </p>
        }
      />{" "}
      <Button
        text={loadingStatus ? "Getting payment status… " : "Payment Status "}
        badge={pendingStatusCountBadge}
        isLoading={loadingStatus}
        buttonClick={() =>
          onPaymentOrStatusClick(
            (entry) => !entry.isstatusDone,
            setLoadingStatus,
            "https://yes-sales-team-demo-backend.herokuapp.com/yesapi/status",
            "this error during payment status!:",
            processFetchStatusResponse
          )
        }
        popoverContent={
          <p>
            Demo ERP sends the Unique Request Numbers to the bank and gets
            payment status in response. Which will be updated in satus table.
          </p>
        }
      />{" "}
      {/* <Button text="Balance" variant="outline-primary" buttonClick={checkBalance} />{" "} */}
      <Button
        text="Clear data"
        variant="danger"
        buttonClick={clearPaymentsData}
        popoverContent={<p>Delete all payment data from demo ERP.</p>}
        popoverPlacement="right"
      />{" "}
    </div>
  );
};

ButtonGroup.propTypes = {
  paymentList: PropTypes.arrayOf(PropTypes.object).isRequired,
  setPaymentList: PropTypes.func.isRequired,
  showCreateEntry: PropTypes.bool.isRequired,
  setShowCreateEntry: PropTypes.func.isRequired,
  setShowAlert: PropTypes.func.isRequired,
  setAlertMessage: PropTypes.func.isRequired,
};

export default ButtonGroup;
