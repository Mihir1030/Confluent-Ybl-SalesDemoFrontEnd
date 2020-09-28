import React from "react";
import PropTypes from "prop-types";

import uuid from "react-uuid";

import GridComponent from "./GridComponent";
import Heading from "../HeadingComponent";

const PaymentTable = ({ paymentList }) => {
  console.log("pay table run");

  const heading = [
    "Unique request number",
    "Name",
    "Address",
    "Bank Ifsc",
    "Account Number",
    "Amount",
    "transfer Type",
    "Unique Refrence Number",
    "Error",
  ];
  const paymentTableHeadingList = heading.map((headingText) => (
    <th key={uuid()}>{headingText}</th>
  ));

  const paymentTableRows = paymentList.map(
    ({
      uniqueRequestNo,
      beneficiaryName,
      beneficiaryAddress,
      beneficiaryBankIfsc,
      beneficiaryAccountNumber,
      transferAmount,
      transferType,
      uniqueRefrenceNumber,
      error,
    }) => (
      <tr key={uuid()}>
        <td>{uniqueRequestNo}</td>
        <td>{beneficiaryName}</td>
        <td>{beneficiaryAddress}</td>
        <td>{beneficiaryBankIfsc}</td>
        <td>{beneficiaryAccountNumber}</td>
        <td>{transferAmount}</td>
        <td>{transferType}</td>
        <td>{uniqueRefrenceNumber}</td>
        <td>{error}</td>
      </tr>
    )
  );

  return (
    <div className="center">
      <Heading title="Payments Table" />

      <br />

      <GridComponent
        tableHeadingList={paymentTableHeadingList}
        tableRows={paymentTableRows}
      />
    </div>
  );
};

PaymentTable.propTypes = {
  paymentList: PropTypes.arrayOf(PropTypes.object).isRequired,
};

function areEqual(prevProps, nextProps) {
  /*
  return true if passing nextProps to render would return
  the same result as passing prevProps to render,
  otherwise return false
  */
  return prevProps.paymentList === nextProps.paymentList;
}

export default React.memo(PaymentTable, areEqual);
