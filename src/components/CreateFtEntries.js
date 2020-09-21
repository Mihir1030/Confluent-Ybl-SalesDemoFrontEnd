import React, { useState } from "react";
import PropTypes from "prop-types";

import BootStrapForm from "react-bootstrap/Form";
import BootStrapCol from "react-bootstrap/Col";

import Heading from "./HeadingComponent";
import InputComponent from "./InputComponent";
import Button from "./Button";

import Utils from "../utils";

const CreateFtEntries = ({
  paymentList,
  setPaymentList,
  setShowAlert,
  setAlertMessage,
}) => {
  const [beneficiaryName, setbeneName] = useState("Demo name");
  const [beneficiaryAddress, setbeneAddress] = useState("Demo address");
  const [beneficiaryBankIfsc, setbeneIfsc] = useState("");
  const [beneficiaryAccountNumber, setbeneAccountNumber] = useState("");
  const [transferAmount, setAmount] = useState("");
  const [transferType, setTransferType] = useState("FT");

  const onChangeFunction = (
    regexPattern,
    event,
    setInputElementState,
    currentInputElementState
  ) => {
    const validationPattern = regexPattern;
    const { value: inputValue } = event.target;

    if (inputValue === "" || validationPattern.test(inputValue)) {
      setInputElementState(inputValue);
    } else {
      setInputElementState(currentInputElementState);
    }
  };

  const onChangeFundTransferMode = (event) => {
    const { value: transferModeSelected } = event.target;
    setTransferType(transferModeSelected);
  };

  const updateEntryList = () => {
    if (
      beneficiaryName === "" ||
      beneficiaryAddress === "" ||
      beneficiaryBankIfsc === "" ||
      beneficiaryAccountNumber === "" ||
      transferAmount === ""
    ) {
      setAlertMessage("Please fill in all the fields");
      setShowAlert(true);
      return;
    }
    const paymentObject = {
      srNo: paymentList.length === 0 ? 1 : paymentList.length + 1,
      uniqueRequestNo: Utils.uniqueRequestNumberGenerator(10),
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

    const tempEntryList = JSON.parse(JSON.stringify(paymentList));

    tempEntryList.push(paymentObject);

    setPaymentList(tempEntryList);

    setbeneIfsc("");
    setbeneAccountNumber("");
    setAmount("");
  };

  return (
    <div className="createcenter">
      <Heading title="Create Payment Entries" />

      <div>
        <BootStrapForm>
          <BootStrapForm.Row>
            <InputComponent
              label="Beneficiary Name"
              value={beneficiaryName}
              onchangeFun={(event) =>
                onChangeFunction(
                  Utils.regexOnlyLetters,
                  event,
                  setbeneName,
                  beneficiaryName
                )
              }
            />
            <InputComponent
              xs="5"
              label="Beneficiary Address"
              value={beneficiaryAddress}
              onchangeFun={(event) =>
                onChangeFunction(
                  Utils.regexOnlyLetters,
                  event,
                  setbeneAddress,
                  beneficiaryAddress
                )
              }
            />
            <InputComponent
              label="Beneficiary IFSC"
              value={beneficiaryBankIfsc}
              onchangeFun={(event) =>
                onChangeFunction(
                  Utils.regexIfscAlphanumeric,
                  event,
                  setbeneIfsc,
                  beneficiaryBankIfsc
                )
              }
            />
          </BootStrapForm.Row>
          <BootStrapForm.Row>
            <InputComponent
              xs="4"
              label="Beneficiary Account No"
              value={beneficiaryAccountNumber}
              onchangeFun={(event) =>
                onChangeFunction(
                  Utils.regexAccountNumberNumericOnly,
                  event,
                  setbeneAccountNumber,
                  beneficiaryAccountNumber
                )
              }
            />
            <InputComponent
              xs="5"
              label="Amount"
              value={transferAmount}
              onchangeFun={(event) =>
                onChangeFunction(
                  Utils.regexAmount,
                  event,
                  setAmount,
                  transferAmount
                )
              }
            />
            <BootStrapForm.Group
              as={BootStrapCol}
              xs="auto"
              controlId="formTransferMode"
            >
              <BootStrapForm.Label>Transfer mode</BootStrapForm.Label>
              <BootStrapForm.Control
                as="select"
                onChange={onChangeFundTransferMode}
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
              popoverContent={<p>Add the payment data to Payment Table</p>}
            />{" "}
          </BootStrapForm.Group>
        </BootStrapForm>
      </div>
    </div>
  );
};

CreateFtEntries.propTypes = {
  paymentList: PropTypes.arrayOf(PropTypes.object).isRequired,
  setPaymentList: PropTypes.func.isRequired,
  setAlertMessage: PropTypes.func.isRequired,
  setShowAlert: PropTypes.func.isRequired,
};

export default CreateFtEntries;
