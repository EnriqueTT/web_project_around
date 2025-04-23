export default class Popup {
  constructor(selector) {
    //".popup"
    this._popupContainer = document.querySelector(selector);
  }

  open() {
    this._popupContainer.classList.add("popup_opened");
  }

  close() {
    this._popupContainer.classList.remove("popup_opened");
  }

  _handleEscClose(evt) {
    // const openedPopup = document.kkuerySelector(".popup_opened");
    if (evt.key === "Escape" && this._popupContainer.contains("popup_opened")) {
      this.close();
    }
  }

  setEventListeners() {
    //agrega detector de clicks para cerrar
    this._popupContainer.addEventListener("click", (evt) => {
      const targetClassList = evt.target.classList;
      if (
        targetClassList.contains("popup") ||
        targetClassList.contains("popup__close-button")
      ) {
        this.close();
      }
    });
    document.body.addEventListener("keydown", this._handleEscClose(evt));
  }
}
