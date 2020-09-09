import React, { useState } from "react";
import PropTypes from "prop-types";

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

  const regexAmount = /^[0-9.\b]+$/;
  const regexAccountNumberNumericOnly = /^[0-9\b]+$/;
  const regexIfscAlphanumeric = /^[A-Z0-9\b]+$/;
  const regexOnlyLetters = /^[a-zA-Z' ']+$/;

  function onChangeTransferType(e) {
    setTransferType(e.target.value);
  }

  function uniqueRequestNumberGenerator(length) {
    const chars =
      "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
    let result = "";
    for (let i = length; i > 0; i -= 1)
      result += chars[Math.floor(Math.random() * chars.length)];
    return result;
  }

  function updateEntryList() {
    const paymentObject = {
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
      bankRefrenceNumber: "",
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

  // const faddingAnimation = () => {

  //   return props.fadein?'fade' : 'fadeOut';
  // }

  return (
    <div className="createcenter">
      <Heading title="Create Payment Entries" headingStyle="headingComponent" />

      <div>
        <BootStrapForm>
          <BootStrapForm.Row>
            <InputComponent
              xs="auto"
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
              xs="5"
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
              xs="auto"
              controlId="formIfsc"
              label="IFSC"
              type="text"
              value={beneficiaryBankIfsc}
              onchangeFun={(event) =>
                onChangeFunction(
                  event,
                  beneficiaryBankIfsc,
                  setbeneIfsc,
                  regexIfscAlphanumeric
                )
              }
              placeholder="Beneficiary Bank IFSC"
            />
          </BootStrapForm.Row>
          <BootStrapForm.Row>
            <InputComponent
              xs="4"
              controlId="formAccount"
              label="Account No"
              type="text"
              value={beneficiaryAccountNumber}
              onchangeFun={(event) =>
                onChangeFunction(
                  event,
                  beneficiaryAccountNumber,
                  setbeneAccountNumber,
                  regexAccountNumberNumericOnly
                )
              }
              placeholder="Beneficiary Bank Account"
            />
            <InputComponent
              xs="5"
              controlId="formAmount"
              label="Amount"
              type="text"
              value={transferAmount}
              onchangeFun={(event) =>
                onChangeFunction(event, transferAmount, setAmount, regexAmount)
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
              popoverContent={<p>Add the payment data to Payment Table</p>}
              popoverPlacement="bottom"
            />{" "}
          </BootStrapForm.Group>
        </BootStrapForm>
      </div>
    </div>
  );
}

CreateFtEntries.propTypes = {
  paymentList: PropTypes.arrayOf(PropTypes.object).isRequired,
  setPaymentList: PropTypes.func.isRequired,
};

export default CreateFtEntries;
