import Popup from "./Popup.js";

export default class PopupWithConfirmation extends Popup {
  constructor({ handler }, selector) {
    super(selector);
    this._form = this._popupElement.querySelector(".form");
    this.handler = handler;
    this._submitEvent = this._submitEvent.bind(this);
    this.setSubmitListeners();
    // this._setEvents();
  }

  open(id, element) {
    super.open();
    this._id = id;
    this._element = element;
  }

  // _setEvents() {
  //   this._popupElement.addEventListener("submit", (evt) => {
  //     evt.preventDefault();
  //   });
  // }

  //Nueva implementación
  _submitEvent(evt) {
    evt.preventDefault();
    this.handler(this._id, this._element);
    this.close();
  }

  setSubmitListeners() {
    //agregar evento submit
    this._form.addEventListener("submit", this._submitEvent);
  }
}
