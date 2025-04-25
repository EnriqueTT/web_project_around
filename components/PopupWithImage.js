import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
  constructor(selector) {
    super(selector);
  }

  //overwrite
  open({ name, link }) {
    super.open();
    const img = this._popupElement.querySelector("img");
    img.alt = name;
    img.src = link;
    this._popupElement.querySelector("p").textContent = name;
  }
}
