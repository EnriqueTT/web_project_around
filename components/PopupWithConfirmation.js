import Popup from "./Popup.js";

export default class PopupWithConfirmation extends Popup {
  constructor(selector) {
    super(selector);
    this._popupElement = this._popupElement.querySelector(".form");
    this._setEvents();
  }

  open(card) {
    super.open();
    this._actualCard= card;
  }

  _setEvents(){
    this._popupElement.addEventListener("submit", (evt)=>{
      evt.preventDefault();
    })      
  }
}
