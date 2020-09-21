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
  const paymentTableHeadingList = heading.map((headingText) => (
    <th key={uuid()}>{headingText}</th>
  ));

  const paymentTableRows = paymentList.map((entry) => (
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
      <Heading title="Payments Table" />

      <br />

      <GridComponent
        tableHeadingList={paymentTableHeadingList}
        tableRows={paymentTableRows}
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
