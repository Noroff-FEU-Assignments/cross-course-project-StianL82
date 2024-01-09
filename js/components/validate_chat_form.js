document.addEventListener('DOMContentLoaded', function () {
  const chatform = document.querySelector('form');

  chatform.addEventListener('submit', function (event) {
    if (!validateForm()) {
      event.preventDefault();
    }
  });

  const inputs = document.querySelectorAll('.form-input');
  inputs.forEach(function (input) {
    input.addEventListener('input', function () {
      hideErrorMessage(input.id + 'Error');
    });

    input.addEventListener('blur', function () {
      validateField(input.id);
    });
  });

  function validateForm() {
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const phone = document.getElementById('phone').value;
    const message = document.getElementById('message').value;

    const nameRegex = /^[a-zA-Z\s]+$/;
    const emailRegex = /^\S+@\S+\.\S+$/;
    const phoneRegex = /^(\+\d{1,2})?\d{8,10}$/;

    let isValid = true;

    isValid = validateField('name') && isValid;
    isValid = validateField('email') && isValid;
    isValid = validateField('phone') && isValid;

    if (message.trim().length === 0) {
      isValid = false;
      document.getElementById('messageError').style.display = "block";
    } else {
      document.getElementById('messageError').style.display = "none";
    }

    return isValid;
  }

  function validateField(fieldId) {
    const fieldValue = document.getElementById(fieldId).value;
    const errorId = fieldId + 'Error';
    const errorElement = document.getElementById(errorId);
    
    const nameRegex = /^[a-zA-Z\s]+$/;
    const emailRegex = /^\S+@\S+\.\S+$/;
    const phoneRegex = /^(\+\d{1,2})?\d{8,10}$/;

    let isValid = true;

    if (fieldId === 'name' && !nameRegex.test(fieldValue)) {
      isValid = false;
    } else if (fieldId === 'email' && !emailRegex.test(fieldValue)) {
      isValid = false;
    } else if (fieldId === 'phone' && !phoneRegex.test(fieldValue)) {
      isValid = false;
    }

    if (!isValid) {
      errorElement.style.display = "block";
    } else {
      errorElement.style.display = "none";
    }

    return isValid;
  }

  function hideErrorMessage(errorId) {
    const errorElement = document.getElementById(errorId);
    errorElement.style.display = "none";
  }
});






