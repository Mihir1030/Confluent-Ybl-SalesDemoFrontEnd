import React, { useState } from "react";

import BootStrapForm from "react-bootstrap/Form";
import BootStrapButton from "react-bootstrap/Button";

function CreateFtEntries(props) {
  const [beneficiaryName, setbeneName] = useState("");
  const [beneficiaryAddress, setbeneAddress] = useState("");
  const [beneficiaryBankIfsc, setbeneIfsc] = useState("");
  const [beneficiaryAccountNumber, setbeneAccountNumber] = useState("");
  const [transferAmount, setAmount] = useState("");
  const [transferType, setTransferType] = useState("FT");

  function onChangeAmount(e) {
    const re = /^[0-9.\b]+$/;
    if (e.target.value === "" || re.test(e.target.value)) {
      setAmount(e.target.value);
    } else {
      setAmount(transferAmount);
    }
  }

  function onChangeAccountNumber(e) {
    const re = /^[0-9\b]+$/;
    if (e.target.value === "" || re.test(e.target.value)) {
      setbeneAccountNumber(e.target.value);
    } else {
      setbeneAccountNumber(beneficiaryAccountNumber);
    }
  }

  function onChangeBeneIfsc(e) {
    const re = /^[A-Z0-9\b]+$/;
    if (e.target.value === "" || re.test(e.target.value)) {
      setbeneIfsc(e.target.value);
    } else {
      setbeneIfsc(beneficiaryBankIfsc);
    }
  }

  function onChangeBeneName(e) {
    setbeneName(e.target.value);
  }

  function onChangeBeneAddress(e) {
    setbeneAddress(e.target.value);
  }

  function onChangeTransferType(e) {
    setTransferType(e.target.value);
  }

  function updateEntryList(e) {
    let uniqueRequestNo = randomString(10);

    let messageToBene = "demo payment";

    let ispaymentDone = false;

    let paymentObject = {
      uniqueRequestNo,
      beneficiaryName,
      beneficiaryAddress,
      transferAmount,
      beneficiaryAccountNumber,
      beneficiaryBankIfsc,
      transferType,
      messageToBene,
      ispaymentDone,
    };

    const tempEntryList = [...props.paymentList];

    tempEntryList.push(paymentObject);

    props.setPaymentList(tempEntryList);
  }

  function randomString(length) {
    const chars =
      "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
    let result = "";
    for (let i = length; i > 0; --i)
      result += chars[Math.floor(Math.random() * chars.length)];
    return result;
  }

  return (
    <div className="createcenter">
      <h2>Create payment Entry</h2>

      <BootStrapForm>
        <BootStrapForm.Row>
          <BootStrapForm.Group as={BootStrapForm.Col} xs={7} controlId="formName">
            <BootStrapForm.Label>Name</BootStrapForm.Label>
            <BootStrapForm.Control
              type="text"
              value={beneficiaryName}
              onChange={onChangeBeneName}
              placeholder="Beneficiary Name"
            />{" "}
          </BootStrapForm.Group>
          <BootStrapForm.Group as={BootStrapForm.Col} xs="auto" controlId="formAddress">
            <BootStrapForm.Label>Address</BootStrapForm.Label>
            <BootStrapForm.Control
              type="text"
              value={beneficiaryAddress}
              onChange={onChangeBeneAddress}
              placeholder="Beneficiary Address"
            />
          </BootStrapForm.Group>
        </BootStrapForm.Row>
        <BootStrapForm.Group>
          <BootStrapForm.Control
            type="text"
            value={beneficiaryBankIfsc}
            onChange={onChangeBeneIfsc}
            placeholder="Beneficiary Bank IFSC"
          />
          <br />
          <BootStrapForm.Control
            value={beneficiaryAccountNumber}
            size="sm"
            onChange={onChangeAccountNumber}
            placeholder="Beneficiary Bank Account"
          />
          <br />
          <BootStrapForm.Control
            value={transferAmount}
            size="sm"
            onChange={onChangeAmount}
            placeholder="Amount"
          />
          <br />
          <BootStrapForm.Control
            as="select"
            onChange={onChangeTransferType}
            defaultValue={transferType}
          >
            <option>NEFT</option>
            <option>RTGS</option>
            <option>FT</option>
          </BootStrapForm.Control>
          <br />
          <BootStrapButton variant="success" onClick={updateEntryList}>
            Success
          </BootStrapButton>{" "}
        </BootStrapForm.Group>
      </BootStrapForm>
    </div>
  );
}

export default CreateFtEntries;
