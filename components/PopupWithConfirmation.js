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

  open(card, id) {
    super.open();
    this._actualCard = card;
    this._id = id;
  }

  // _setEvents() {
  //   this._popupElement.addEventListener("submit", (evt) => {
  //     evt.preventDefault();
  //   });
  // }

  //Nueva implementación
  _submitEvent(evt) {
    evt.preventDefault();
    console.log(this._actualCard.closest(".card"));

    this.handler(this._actualCard, this._id);
    this.close();
  }

  setSubmitListeners() {
    //agregar evento submit
    this._form.addEventListener("submit", this._submitEvent);
  }
}
