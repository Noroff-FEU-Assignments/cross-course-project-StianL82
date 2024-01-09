document.addEventListener("DOMContentLoaded", function () {
  resetErrors();

  cardholdersName.addEventListener("input", validateCardholdersName);
  cardNumber.addEventListener("input", validateCardNumber);
  expiryDate.addEventListener("input", validateExpiryDate);
  cvcNumber.addEventListener("input", validateCvcNumber);
});

const cardholdersName = document.querySelector("#cardholders-name");
const cardholdersNameError = document.querySelector("#cardholdersNameError");
const cardNumber = document.querySelector("#card-number");
const cardNumberError = document.querySelector("#cardNumberError");
const expiryDate = document.querySelector("#expiry-date");
const expiryDateError = document.querySelector("#expiryDateError");
const cvcNumber = document.querySelector("#cvc");
const cvcNumberError = document.querySelector("#cvcNumberError");

function resetErrors() {
  cardholdersNameError.style.display = "none";
  cardNumberError.style.display = "none";
  expiryDateError.style.display = "none";
  cvcNumberError.style.display = "none";
}

function validateCardholdersName() {
  if (!checkLength(cardholdersName.value, 3)) {
    cardholdersNameError.style.display = "block";
  } else {
    cardholdersNameError.style.display = "none";
  }
}

function validateCardNumber() {
  if (!checkCardNumber(cardNumber.value)) {
    cardNumberError.style.display = "block";
  } else {
    cardNumberError.style.display = "none";
  }
}

function validateExpiryDate() {
  if (!checkExpiryDate(expiryDate.value)) {
    expiryDateError.style.display = "block";
  } else {
    expiryDateError.style.display = "none";
  }
}

function validateCvcNumber() {
  if (!checkLength(cvcNumber.value, 3)) {
    cvcNumberError.style.display = "block";
  } else {
    cvcNumberError.style.display = "none";
  }
}

function checkLength(value, len) {
  return value.trim().length >= len;
}

function checkCardNumber(value) {
  // Check if the card number has exactly 16 digits
  const cardNumberRegex = /^\d{16}$/;
  return cardNumberRegex.test(value);
}

function checkExpiryDate(value) {
  const currentDate = new Date();
  const inputDate = new Date(value);
  return inputDate > currentDate;
}



