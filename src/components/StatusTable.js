import React from "react";

import GridComponent from "./GridComponent";
import Heading from "./HeadingComponent";

function StatusTable(props) {

  const heading = [
    "Unique request number",
    "Name",
    "Amount",
    "Type",
    "Unique Refrence Number",
    "Status",
    "Error"
  ];

  const tableHeadingList = heading.map((h, index) => <th key={index}>{h}</th>);

  const entryRows = props.paymentList.map((e, index) => (
    <tr key={index}>
      <td>{e.uniqueRequestNo}</td>
      <td>{e.beneficiaryName}</td>
      <td>{e.transferAmount}</td>
      <td>{e.transferType}</td>
      <td>{e.uniqueRefrenceNumber}</td>
      <td>{e.status}</td>
      <td>{e.statusError}</td>
    </tr>
  ));

  return (
    <div className="center">
      <Heading title="Status Table" headingStyle="headingComponent" />

      <br />

      <GridComponent
        tableHeadingList={tableHeadingList}
        entryRows={entryRows}
      />
    </div>
  );

}

export default StatusTable;