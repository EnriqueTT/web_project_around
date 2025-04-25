export default class Popup {
  constructor(popupSelector) {
    //".popup"
    this._popupElement = document.querySelector(popupSelector);
    this._handleEscClose = this._handleEscClose.bind(this);
    this.close = this.close.bind(this);
    this.setEventListeners();
  }

  open() {
    this._popupElement.classList.add("popup_opened");
  }

  close() {
    this._popupElement.classList.remove("popup_opened");
  }

  _handleEscClose(evt) {
    // const openedClass = this._popupElement.classList.contains("popup_opened");
    if (evt.key === "Escape") {
      this.close();
      console.log("cierra esc");
    }
  }

  setEventListeners() {
    //agrega detector de clicks para cerrar
    this._popupElement.addEventListener("click", this.close);
    document.body.addEventListener("keydown", this._handleEscClose);
  }
}
