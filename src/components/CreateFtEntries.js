import React, { useState } from "react";

import BootStrapForm from "react-bootstrap/Form";
import BootStrapCol from "react-bootstrap/Col";

import Heading from "./HeadingComponent";
import InputComponent from "./InputComponent";
import Button from "./Button";

function CreateFtEntries(props) {
  const [beneficiaryName, setbeneName] = useState("Demo name");
  const [beneficiaryAddress, setbeneAddress] = useState("Demo address");
  const [beneficiaryBankIfsc, setbeneIfsc] = useState("");
  const [beneficiaryAccountNumber, setbeneAccountNumber] = useState("");
  const [transferAmount, setAmount] = useState("");
  const [transferType, setTransferType] = useState("FT");

  const onChangeFunction = (event, inputState, setInputState, regexPattern) => {
    const validationPattern = regexPattern;
    if (
      event.target.value === "" ||
      validationPattern.test(event.target.value)
    ) {
      setInputState(event.target.value);
    } else {
      setInputState(inputState);
    }
  };

  const regex_Amount = /^[0-9.\b]+$/;
  const regex_AccountNo_numericOnly = /^[0-9\b]+$/;
  const regexIFSC_alphanumeric = /^[A-Z0-9\b]+$/;
  const regexOnlyLetters = /^[a-zA-Z' ']+$/;

  function onChangeTransferType(e) {
    setTransferType(e.target.value);
  }

  function updateEntryList(e) {
    let paymentObject = {
      uniqueRequestNo: uniqueRequestNumberGenerator(10),
      beneficiaryName,
      beneficiaryAddress,
      transferAmount,
      beneficiaryAccountNumber,
      beneficiaryBankIfsc,
      transferType,
      messageToBene: "demo payment",
      ispaymentDone: false,
      isstatusDone: false,
      uniqueRefrenceNumber: "",
      bankRefrenceNumber:"",
      error: "",
      statusError: "",
      status: "",
    };

    const tempEntryList = [...props.paymentList];

    tempEntryList.push(paymentObject);

    props.setPaymentList(tempEntryList);

    setbeneIfsc("");
    setbeneAccountNumber("");
    setAmount("");
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
              onchangeFun={(event) =>
                onChangeFunction(
                  event,
                  beneficiaryName,
                  setbeneName,
                  regexOnlyLetters
                )
              }
              placeholder="Beneficiary Name"
            />
            <InputComponent
              xs={5}
              controlId="formAddress"
              label="Address"
              type="text"
              value={beneficiaryAddress}
              onchangeFun={(event) =>
                onChangeFunction(
                  event,
                  beneficiaryAddress,
                  setbeneAddress,
                  regexOnlyLetters
                )
              }
              placeholder="Beneficiary Address"
            />
            <InputComponent
              xs={"auto"}
              controlId="formIfsc"
              label="IFSC"
              type="text"
              value={beneficiaryBankIfsc}
              onchangeFun={(event) =>
                onChangeFunction(
                  event,
                  beneficiaryBankIfsc,
                  setbeneIfsc,
                  regexIFSC_alphanumeric
                )
              }
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
              onchangeFun={(event) =>
                onChangeFunction(
                  event,
                  beneficiaryAccountNumber,
                  setbeneAccountNumber,
                  regex_AccountNo_numericOnly
                )
              }
              placeholder="Beneficiary Bank Account"
            />
            <InputComponent
              xs={5}
              controlId="formAmount"
              label="Amount"
              type="text"
              value={transferAmount}
              onchangeFun={(event) =>
                onChangeFunction(event, transferAmount, setAmount, regex_Amount)
              }
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
                <option>IMPS</option>
              </BootStrapForm.Control>
            </BootStrapForm.Group>
          </BootStrapForm.Row>
          <BootStrapForm.Group>
            <Button
              text="Add entry"
              variant="outline-success"
              buttonClick={updateEntryList}
              popoverTitle="Create Entry"
        popoverContent={
          <p>
            Add the payment data to Payment Table
          </p>
        }
        popoverPlacement="bottom"
            />{" "}
          </BootStrapForm.Group>
        </BootStrapForm>
      </div>
    </div>
  );
}

export default CreateFtEntries;
