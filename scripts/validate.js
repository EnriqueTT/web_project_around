function hasInvalidInput(inputsList) {
  return inputsList.some((input) => !input.validity.valid);
}

function disableSubmitButton(button) {
  button.classList.add("form__submit-button_gray");
  button.setAttribute("disabled", "");
}

function enableSubmitButton(button) {
  button.classList.remove("form__submit-button_gray");
  button.removeAttribute("disabled");
}

const showInputError = (form, inputsList) => {
  inputsList.forEach((input) => {
    const errorMessage = form.querySelector(`.${input.id}__input-error`);
    if (!input.validity.valid) {
      input.classList.add("form__input-error_color");
      errorMessage.classList.add("form__input-error_active");
      errorMessage.textContent = input.validationMessage;
    }
  });
};

const hideInputError = (form, inputsList) => {
  inputsList.forEach((input) => {
    const errorMessage = form.querySelector(`.${input.id}__input-error`);
    if (input.validity.valid) {
      input.classList.remove("form__input-error_color");
      errorMessage.classList.remove("form__input-error_active");
      errorMessage.textContent = "";
    }
  });
};

const toggleMessage = (form, inputsList) => {
  inputsList.forEach((input) => {
    const errorMessage = form.querySelector(`.${input.id}__input-error`);
    if (!input.validity.valid) {
      input.classList.add("form__input-error_color");
      errorMessage.classList.add("form__input-error_active");
      errorMessage.textContent = input.validationMessage;
    } else {
      input.classList.remove("form__input-error_color");
      errorMessage.classList.remove("form__input-error_active");
      errorMessage.textContent = "";
    }
  });
};

const validateInputs = (form, inputs) => {
  toggleMessage(form, inputs);
  if (hasInvalidInput(inputs)) {
    // showInputError(form, inputs);
    disableSubmitButton(form.querySelector(".form__submit-button"));
  } else {
    // hideInputError(form, inputs);
    enableSubmitButton(form.querySelector(".form__submit-button"));
  }
};

export default () => {
  Array.from(document.forms).forEach((form) => {
    const inputs = Array.from(form.querySelectorAll(".form__input"));
    disableSubmitButton(form.querySelector(".form__submit-button"));

    form.addEventListener("input", () => {
      hideInputError(form, inputs);
      validateInputs(form, inputs);
    });
  });
};
