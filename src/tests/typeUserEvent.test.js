import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import CreateEntry from "../components/CreateFtEntries";

test("check bene name input", () => {
  render(<CreateEntry />);

  userEvent.type(screen.getByTestId("formBeneficiaryName"), "Mihir Marathe");
  expect(screen.getByTestId("formBeneficiaryName")).toHaveValue(
    "Demo nameMihir Marathe"
  );
});

test("check bene address input", () => {
  render(<CreateEntry />);

  userEvent.type(screen.getByTestId("formBeneficiaryAddress"), "Panvel");
  expect(screen.getByTestId("formBeneficiaryAddress")).toHaveValue(
    "Demo addressPanvel"
  );
});

test("check if lower case letters are skipped in IFSC input", () => {
  render(<CreateEntry />);

  userEvent.type(screen.getByTestId("formBeneficiaryIFSC"), "ABCd");
  expect(screen.getByTestId("formBeneficiaryIFSC")).toHaveValue("ABC");
});

test("check if ifsc is accepted", () => {
  render(<CreateEntry />);

  userEvent.type(screen.getByTestId("formBeneficiaryIFSC"), "ABC123");
  expect(screen.getByTestId("formBeneficiaryIFSC")).toHaveValue("ABC123");
});

test("check if letters are skipped in amount input", () => {
  render(<CreateEntry />);

  userEvent.type(screen.getByTestId("formBeneficiaryAccountNo"), "1234ABCd");
  expect(screen.getByTestId("formBeneficiaryAccountNo")).toHaveValue("1234");
});

test("check amount input", () => {
  render(<CreateEntry />);

  userEvent.type(screen.getByTestId("formBeneficiaryAccountNo"), "1234");
  expect(screen.getByTestId("formBeneficiaryAccountNo")).toHaveValue("1234");
});
