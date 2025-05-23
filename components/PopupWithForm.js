import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor({ handler }, selector) {
    super(selector);
    this._form = this._popupElement.querySelector(".form");
    console.log(this._form.elements);
    this.handler = handler;
    this.setSubmitListeners();
  }

  _getInputValues() {
    //recopila todos los datos de entrada}
    this._inputs = Array.from(this._form.querySelectorAll(".form__input"));
    // this._inputs = Array.from(this._form.elements);
    // this._values = this._inputs.map((input) => input.value);
    // this._values = [this._form.elements.]
    return this._inputs;
  }

  _submitEvent() {
    this.handler();
    this.close();
  }

  setSubmitListeners() {
    //agregar evento submit
    this._form.addEventListener("submit", this._submitEvent);
    //y detector de click para cerrar
  }

  //overwrite
  close() {
    super.close();
    //modificar de tal modo que reinicie los formularios
    this._form.reset();
  }
}
