import React from "react";

import GridComponent from "./GridComponent";
import Heading from "./HeadingComponent";

function PaymentTable(props) {
  console.log("table run");
  const heading = [
    "Unique request number",
    "Name",
    "Address",
    "Bank Ifsc",
    "Account Number",
    "Amount",
    "transfer Type",
    "Unique Refrence Number",
    "Error"
  ];
  const tableHeadingList = heading.map((h, index) => <th key={index}>{h}</th>);

  const entryRows = props.paymentList.map((e, index) => (
    <tr key={index}>
      <td>{e.uniqueRequestNo}</td>
      <td>{e.beneficiaryName}</td>
      <td>{e.beneficiaryAddress}</td>
      <td>{e.beneficiaryBankIfsc}</td>
      <td>{e.beneficiaryAccountNumber}</td>
      <td>{e.transferAmount}</td>
      <td>{e.transferType}</td>
      <td>{e.uniqueRefrenceNumber}</td>
      <td>{e.error}</td>
    </tr>
  ));

  return (
    <div className="center">
      <Heading title="Payment Table" />

      <br />

      <GridComponent
        tableHeadingList={tableHeadingList}
        entryRows={entryRows}
      />
    </div>
  );
}

export default PaymentTable;
