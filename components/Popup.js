export default class Popup {
  constructor(popupSelector) {
    //".popup"
    this._popupElement = document.querySelector(popupSelector);
    // this._handleEscClose = this._handleEscClose.bind(this);
  }

  open() {
    this._popupElement.classList.add("popup_opened");
  }

  close() {
    this._popupElement.classList.remove("popup_opened");
  }

  _handleEscClose(evt) {
    // const openedPopup = document.kkuerySelector(".popup_opened");
    if (evt.key === "Escape" && this._popupElement.contains("popup_opened")) {
      this.close();
    }
  }

  setEventListeners() {
    //agrega detector de clicks para cerrar
    this._popupElement.addEventListener("click", () => {
      // const targetClassList = evt.target.classList;
      // if (
      //   targetClassList.contains("popup") ||
      //   targetClassList.contains("popup__close-button")
      // ) {
      this.close();
      // }
    });
    document.body.addEventListener("keydown", this._handleEscClose);
  }
}
