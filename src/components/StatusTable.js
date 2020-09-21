import React from "react";
import PropTypes from "prop-types";

import uuid from "react-uuid";

import GridComponent from "./GridComponent";
import Heading from "./HeadingComponent";

function StatusTable(props) {
  console.log("status table run");
  const heading = [
    "Unique request number",
    "Name",
    "Amount",
    "Type",
    "Bank Refrence Number",
    "Status",
    "Error",
  ];

  const { paymentList } = props;
  const tableHeadingList = heading.map((headingText) => (
    <th key={uuid()}>{headingText}</th>
  ));

  const sattusTableRows = paymentList.map((entry) => (
    <tr key={uuid()}>
      <td>{entry.uniqueRequestNo}</td>
      <td>{entry.beneficiaryName}</td>
      <td>{entry.transferAmount}</td>
      <td>{entry.transferType}</td>
      <td>{entry.bankRefrenceNumber}</td>
      <td>{entry.status}</td>
      <td>{entry.statusError}</td>
    </tr>
  ));

  return (
    <div className="center">
      <Heading title="Payments Status Table" />

      <br />

      <GridComponent
        tableHeadingList={tableHeadingList}
        tableRows={sattusTableRows}
      />
    </div>
  );
}

StatusTable.propTypes = {
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

export default React.memo(StatusTable, areEqual);
