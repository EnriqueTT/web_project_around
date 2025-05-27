import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor({ handler }, selector) {
    super(selector);
    this._form = this._popupElement.querySelector(".form");
    // console.log(this._form);
    this.handler = handler;
    this._submitEvent = this._submitEvent.bind(this);
    this.setSubmitListeners();
  }

  _getInputValues() {
    //recopila todos los datos de entrada del formulario
    this._inputs = Array.from(this._form.querySelectorAll(".form__input"));
    return this._inputs;
  }

  _submitEvent() {
    this.handler();
    this.close();
  }

  setSubmitListeners() {
    //agregar evento submit
    this._form.addEventListener("submit", this._submitEvent);
  }

  //overwrite
  close() {
    super.close();
    //modificar de tal modo que reinicie los formularios
    this._form.reset();
  }
}
