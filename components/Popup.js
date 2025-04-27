export default class Popup {
  constructor(popupSelector) {
    //".popup"
    this._popupElement = document.querySelector(popupSelector);
    this._handleEscClose = this._handleEscClose.bind(this);
    this._handleClose = this._handleClose.bind(this);
    this.setEventListeners();
  }

  open() {
    this._popupElement.classList.add("popup_opened");
    document.body.addEventListener("keydown", this._handleEscClose);
  }

  close() {
    document.body.removeEventListener("keydown", this._handleEscClose);
    this._popupElement.classList.remove("popup_opened");
  }

  _handleClose(evt) {
    const isPopup =
      evt.target.classList.contains("popup") ||
      evt.target.classList.contains("popup__close-button");
    if (isPopup) {
      this.close();
    }
  }

  _handleEscClose(evt) {
    // const openedClass = this._popupElement.classList.contains("popup_opened");
    if (evt.key === "Escape") {
      this.close();
    }
  }

  setEventListeners() {
    this._popupElement.addEventListener("click", this._handleClose);
  }
}
