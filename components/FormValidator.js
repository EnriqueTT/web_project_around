export default class FormValidator {
  constructor(config, isEditForm) {
    this._structure = config.form;
    this._isEditForm = isEditForm;
    // this._inputs = [config.firstInput, config.firstInput];
    this._inputs = Array.from(this._structure.querySelectorAll(".form__input"));
    // this._firstRelation = config.firstR;
    // this._secondRelation = config.secondR;
    this._button = config.button;
  }

  enableValidation() {
    // Array.from(document.forms).forEach((form) => {
    // const inputs = Array.from(form.querySelectorAll(".form__input"));
    this._disableSubmitButton();
    this._setEvents();
  }

  _setEvents() {
    this._inputs.forEach((input) => {
      input.addEventListener("input", () => {
        this._validateInputs();
      });
    });
    // this._structure.addEventListener("submit", (evt) => {
    //   this._handleFormSubmit(evt);
    // });
  }

  _handleFormSubmit(evt) {
    evt.preventDefault();
    if (isEditForm) {
      profileName.textContent = formName.value;
      profileAbout.textContent = formAbout.value;
      // profileName.setAttribute("value",formName.value);
      utils.closePopup(evt.target.closest(".popup"));
    } else {
      evt.preventDefault();
      const formInputs = evt.target.querySelectorAll("input");
      addNewCard(formInputs[0].value, formInputs[1].value);
      utils.closePopup(addForm.closest(".popup"));
    }
  }

  _hasInvalidInput() {
    return this._inputs.some((input) => !input.validity.valid);
    // const hasInvalidInput = !(this._firstInput.validity.valid && this._secondInput.validity.valid);
    // return hasInvalidInput;
  }

  _disableSubmitButton() {
    this._button.classList.add("form__submit-button_gray");
    this._button.setAttribute("disabled", "");
  }

  _enableSubmitButton() {
    this._button.classList.remove("form__submit-button_gray");
    this._button.removeAttribute("disabled");
  }

  _validateInputs() {
    this._toggleMessage();
    if (this._hasInvalidInput()) {
      this._disableSubmitButton();
    } else {
      this._enableSubmitButton();
    }
  }

  // _showInputError() {
  //   this._inputs.forEach((input) => {
  //     const errorMessage = this._structure.querySelector(
  //       `.${input.id}__input-error`
  //     );
  //     if (!input.validity.valid) {
  //       input.classList.add("form__input-error_color");
  //       errorMessage.classList.add("form__input-error_active");
  //       errorMessage.textContent = input.validationMessage;
  //     }
  //   });
  // }

  // _hideInputError() {
  //   this._inputs.forEach((input) => {
  //     const errorMessage = this._structure.querySelector(
  //       `.${input.id}__input-error`
  //     );
  //     if (input.validity.valid) {
  //       input.classList.remove("form__input-error_color");
  //       errorMessage.classList.remove("form__input-error_active");
  //       errorMessage.textContent = "";
  //     }
  //   });
  // }

  _toggleMessage() {
    this._inputs.forEach((input) => {
      const errorMessage = this._structure.querySelector(
        `#${input.id}__input-error`
      );
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
  }
}
