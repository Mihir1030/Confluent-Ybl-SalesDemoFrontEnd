import React from "react";
import PropTypes from "prop-types";

import uuid from "react-uuid";

import GridComponent from "./GridComponent";
import Heading from "./HeadingComponent";

function PaymentTable(props) {
  console.log("pay table run");

  const { paymentList } = props;

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
  const tableHeadingList = heading.map((headingText) => (
    <th key={uuid()}>{headingText}</th>
  ));

  const entryRows = paymentList.map((entry) => (
    <tr key={uuid()}>
      <td>{entry.uniqueRequestNo}</td>
      <td>{entry.beneficiaryName}</td>
      <td>{entry.beneficiaryAddress}</td>
      <td>{entry.beneficiaryBankIfsc}</td>
      <td>{entry.beneficiaryAccountNumber}</td>
      <td>{entry.transferAmount}</td>
      <td>{entry.transferType}</td>
      <td>{entry.uniqueRefrenceNumber}</td>
      <td>{entry.error}</td>
    </tr>
  ));

  return (
    <div className="center">
      <Heading title="Payment Table" headingStyle="headingComponent" />

      <br />

      <GridComponent
        tableHeadingList={tableHeadingList}
        entryRows={entryRows}
      />
    </div>
  );
}

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
