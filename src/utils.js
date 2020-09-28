const uniqueRequestNumberGenerator = (length) => {
  const chars =
    "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";

  let result = "";
  for (let i = length; i > 0; i -= 1)
    result += chars[Math.floor(Math.random() * chars.length)];
  return result;
};

const sortAndUpdatePaymentListState = (
  paymentListArrayToBeSorted,
  updatePaymentListStateFunction
) => {
  const paymentListSortedDescending = [
    ...paymentListArrayToBeSorted.sort((a, b) => b.srNo - a.srNo),
  ];
  updatePaymentListStateFunction(paymentListSortedDescending);
};

const regexAmount = /^[0-9.\b]+$/;
const regexAccountNumberNumericOnly = /^[0-9\b]+$/;
const regexIfscAlphanumeric = /^[A-Z0-9\b]+$/;
const regexOnlyLetters = /^[a-zA-Z' ']+$/;

export default {
  uniqueRequestNumberGenerator,
  sortAndUpdatePaymentListState,
  regexAmount,
  regexAccountNumberNumericOnly,
  regexIfscAlphanumeric,
  regexOnlyLetters,
};
