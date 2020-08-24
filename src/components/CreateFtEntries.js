import React, { useState } from "react";

import BootStrapForm from "react-bootstrap/Form";
import BootStrapCol from "react-bootstrap/Col";

import Heading from "./HeadingComponent";
import InputComponent from "./InputComponent";
import Button from "./Button";

function CreateFtEntries(props) {
  const [beneficiaryName, setbeneName] = useState("");
  const [beneficiaryAddress, setbeneAddress] = useState("");
  const [beneficiaryBankIfsc, setbeneIfsc] = useState("HDFC0000001");
  const [beneficiaryAccountNumber, setbeneAccountNumber] = useState(
    "00011020001772"
  );
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
    let uniqueRequestNo = uniqueRequestNumberGenerator(10);

    let messageToBene = "demo payment";

    let ispaymentDone = false;

    let uniqueRefrenceNumber = "NA";

    let error = "big error";

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
      uniqueRefrenceNumber,
      error,
    };

    const tempEntryList = [...props.paymentList];

    tempEntryList.push(paymentObject);

    props.setPaymentList(tempEntryList);
  }

  function uniqueRequestNumberGenerator(length) {
    const chars =
      "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
    let result = "";
    for (let i = length; i > 0; --i)
      result += chars[Math.floor(Math.random() * chars.length)];
    return result;
  }

  return (
    <div className="createcenter">
      <Heading title="Create Payment Entries" />

      <div>
        <BootStrapForm>
          <BootStrapForm.Row>
            <InputComponent
              xs={"auto"}
              controlId="formName"
              label="Name"
              type="text"
              value={beneficiaryName}
              onchangeFun={onChangeBeneName}
              placeholder="Beneficiary Name"
            />
            <InputComponent
              xs={5}
              controlId="formAddress"
              label="Address"
              type="text"
              value={beneficiaryAddress}
              onchangeFun={onChangeBeneAddress}
              placeholder="Beneficiary Address"
            />
            <InputComponent
              xs={"auto"}
              controlId="formIfsc"
              label="IFSC"
              type="text"
              value={beneficiaryBankIfsc}
              onchangeFun={onChangeBeneIfsc}
              placeholder="Beneficiary Bank IFSC"
            />
          </BootStrapForm.Row>
          <BootStrapForm.Row>
            <InputComponent
              xs={4}
              controlId="formAccount"
              label="Account No"
              type="text"
              value={beneficiaryAccountNumber}
              onchangeFun={onChangeAccountNumber}
              placeholder="Beneficiary Bank Account"
            />
            <InputComponent
              xs={5}
              controlId="formAmount"
              label="Amount"
              type="text"
              value={transferAmount}
              onchangeFun={onChangeAmount}
              placeholder="Amount"
            />
            <BootStrapForm.Group
              as={BootStrapCol}
              xs="auto"
              controlId="formTpe"
            >
              <BootStrapForm.Label>Type</BootStrapForm.Label>
              <BootStrapForm.Control
                as="select"
                onChange={onChangeTransferType}
                defaultValue={transferType}
              >
                <option>NEFT</option>
                <option>RTGS</option>
                <option>FT</option>
              </BootStrapForm.Control>
            </BootStrapForm.Group>
          </BootStrapForm.Row>
          <BootStrapForm.Group>
            <Button
              text="Add entry"
              variant="success"
              buttonClick={updateEntryList}
            />{" "}
          </BootStrapForm.Group>
        </BootStrapForm>
      </div>
      
    </div>
  );
}

export default CreateFtEntries;
