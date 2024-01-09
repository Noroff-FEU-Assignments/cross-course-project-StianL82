import {updateCartItemCount} from "./cart.js"

updateCartItemCount()

document.addEventListener('DOMContentLoaded', function () {
  const paymentMethods = document.querySelectorAll('input[name="payment-method"]');
  const paymentOptions = document.querySelectorAll('.payment > div[class^="payment-"]');
  const paymentCard = document.querySelector('.payment-card');
  const paymentInvoice = document.querySelector('.payment-invoice');
  const paymentVipps = document.querySelector('.payment-vipps');

  paymentMethods.forEach(function (radio) {
    radio.addEventListener('change', handlePaymentMethod);
  });

  handlePaymentMethod();

  function handlePaymentMethod() {
    const selectedPaymentMethod = document.querySelector('input[name="payment-method"]:checked');

    paymentOptions.forEach(function (option) {
      option.style.display = 'none';
    });

    if (selectedPaymentMethod) {
      const paymentOptionId = `payment-${selectedPaymentMethod.id}`;
      const selectedPaymentOption = document.querySelector(`.${paymentOptionId}`);
      if (selectedPaymentOption) {
        selectedPaymentOption.style.display = 'block';
      }
    } else {
      paymentOptions.forEach(function (option) {
        option.style.display = 'none';
      });
    }

    handleCardInput();
  }

  function handleCardInput() {
    const cardInput = document.getElementById('card-input');
    if (cardInput.checked) {
      paymentCard.style.display = 'block';
      paymentInvoice.style.display = 'none';
      paymentVipps.style.display = 'none';
    } else {
      paymentCard.style.display = 'none';
    }
  }
});

//Remove Products from Cart
function handlePurchase() {
  localStorage.removeItem("cart");
}

document.addEventListener("DOMContentLoaded", function () {
  const purchaseButtons = document.querySelectorAll(".purchase-button");
  if (purchaseButtons) {
    purchaseButtons.forEach(button => {
      button.addEventListener("click", handlePurchase);
    });
  }
});