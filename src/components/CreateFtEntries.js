import React, { useState } from "react";

import BootStrapForm from "react-bootstrap/Form";
import BootStrapCol from "react-bootstrap/Col";
import BootStrapButton from "react-bootstrap/Button";

function CreateFtEntries(props) {
  const [beneficiaryName, setbeneName] = useState("");
  const [beneficiaryAddress, setbeneAddress] = useState("");
  const [beneficiaryBankIfsc, setbeneIfsc] = useState("HDFC0000001");
  const [beneficiaryAccountNumber, setbeneAccountNumber] = useState("00011020001772");
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
      error
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
      <div>
        <h2>Create payment Entry</h2>
      </div>

      <div>
        <BootStrapForm>
          <BootStrapForm.Row>
            <BootStrapForm.Group
              as={BootStrapCol}
              xs="auto"
              controlId="formName"
            >
              <BootStrapForm.Label>Name</BootStrapForm.Label>
              <BootStrapForm.Control
                type="text"
                value={beneficiaryName}
                onChange={onChangeBeneName}
                placeholder="Beneficiary Name"
              />{" "}
            </BootStrapForm.Group>
            <BootStrapForm.Group
              as={BootStrapCol}
              xs={5}
              controlId="formAddress"
            >
              <BootStrapForm.Label>Address</BootStrapForm.Label>
              <BootStrapForm.Control
                type="text"
                value={beneficiaryAddress}
                onChange={onChangeBeneAddress}
                placeholder="Beneficiary Address"
              />
            </BootStrapForm.Group>
            <BootStrapForm.Group
              as={BootStrapCol}
              xs="auto"
              controlId="formIfsc"
            >
              <BootStrapForm.Label>IFSC</BootStrapForm.Label>
              <BootStrapForm.Control
                type="text"
                value={beneficiaryBankIfsc}
                onChange={onChangeBeneIfsc}
                placeholder="Beneficiary Bank IFSC"
              />
            </BootStrapForm.Group>
          </BootStrapForm.Row>
          <BootStrapForm.Row>
            <BootStrapForm.Group
              as={BootStrapCol}
              xs={4}
              controlId="formAccount"
            >
              <BootStrapForm.Label>Account</BootStrapForm.Label>
              <BootStrapForm.Control
                value={beneficiaryAccountNumber}
                onChange={onChangeAccountNumber}
                placeholder="Beneficiary Bank Account"
              />
            </BootStrapForm.Group>
            <BootStrapForm.Group
              as={BootStrapCol}
              xs={5}
              controlId="formAmount"
            >
              <BootStrapForm.Label>Amount</BootStrapForm.Label>
              <BootStrapForm.Control
                value={transferAmount}
                onChange={onChangeAmount}
                placeholder="Amount"
              />
            </BootStrapForm.Group>

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
            <BootStrapButton variant="success" onClick={updateEntryList}>
              Success
            </BootStrapButton>{" "}
          </BootStrapForm.Group>
        </BootStrapForm>
      </div>
    </div>
  );
}

export default CreateFtEntries;
