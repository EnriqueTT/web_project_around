import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor({ handler }, selector) {
    super(selector);
    this._form = this._popupElement.querySelector(".form");
    this.handler = handler;
    this._submitEvent = this._submitEvent.bind(this);
    this._inputs = Array.from(this._form.querySelectorAll(".form__input"));
    this.setSubmitListeners();
  }

  _getInputValues() {
    //recopila todos los datos de entrada del formulario

    return this._inputs;
  }

  _submitEvent(evt) {
    evt.preventDefault();
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

  setInputValues({ name, job }) {
    this._inputs[0].value = name;
    this._inputs[1].value = job;
  }
}
