function enableValidation(
  {
  formSelector,
  inputSelector,
  submitButtonSelector,
  inactiveButtonClass,
  inputErrorClass,
  errorClass,
  errorClassVisible
}
) {
  const formList = Array.from(document.querySelectorAll(formSelector));

  formList.forEach(form => {
    const submitButton = form.querySelector(submitButtonSelector);
    disableButton(submitButton, inactiveButtonClass);

    const inputList = Array.from(form.querySelectorAll(inputSelector));
    inputList.forEach(input => {
      const fieldElement = input.closest('.popup__field');
      const errorElement = fieldElement.querySelector(`.${errorClass}`);

      input.addEventListener('input', () => {
        validateInput(input, errorElement, inputErrorClass, errorClassVisible);
        toggleButtonState({form, submitButton, inactiveButtonClass, inputSelector})
      });
    })
  })
}

function validateInput(input, errorElement, inputErrorClass, errorClassVisible) {
  if (!input.validity.valid) {
    addInputErrorStyles(input, inputErrorClass);

    if (input.validity.patternMismatch) {
      showError(errorElement, errorClassVisible, input, input.dataset.errorMessage);
    } else {
      showError(errorElement, errorClassVisible, input);
    }
  } else {
    removeInputErrorStyles(input, inputErrorClass);
    hideError(errorElement, errorClassVisible);
  }
}

function addInputErrorStyles(input, inputErrorClass) {
  input.classList.add(inputErrorClass); 
}

function removeInputErrorStyles(input, inputErrorClass) {
  input.classList.remove(inputErrorClass);
}

function showError(error, errorClassVisible, input, errorMessage = input.validationMessage) {
  error.classList.add(errorClassVisible);
  error.textContent = errorMessage;
}

function hideError(error, errorClassVisible) {
  error.classList.remove(errorClassVisible);
  error.textContent = '';
}

function disableButton( button, inactiveButtonClass) {
  button.classList.add(inactiveButtonClass);
  button.disabled = true;
}

function activateButton(button, inactiveButtonClass) {
  button.classList.remove(inactiveButtonClass);
  button.disabled = false;
}

function checkFormValidity(form, inputSelector) {
  const inputList = Array.from(form.querySelectorAll(inputSelector));
  return inputList.reduce((state, input) => {
    if (state && input.validity.valid) {
      return true;
    } else return false;
  }, true);
}

function toggleButtonState({form, submitButton, inactiveButtonClass, inputSelector}) {
  if (checkFormValidity(form, inputSelector)) {
    activateButton(submitButton, inactiveButtonClass);
  } else disableButton(submitButton, inactiveButtonClass);
}

function clearValidation(form, {
  inputSelector,
  submitButtonSelector,
  inactiveButtonClass,
  inputErrorClass,
  errorClassVisible
}) {
  const inputList = Array.from(form.querySelectorAll(inputSelector));
  inputList.forEach(input => removeInputErrorStyles(input, inputErrorClass));
  const errorList = Array.from(form.querySelectorAll(`.${errorClassVisible}`));
  errorList.forEach(error => hideError(error, errorClassVisible));
  const submitButton = form.querySelector(submitButtonSelector);
  disableButton(submitButton, inactiveButtonClass);
}

module.exports = {showError, hideError, validateInput, disableButton, activateButton, checkFormValidity, toggleButtonState, enableValidation, clearValidation}