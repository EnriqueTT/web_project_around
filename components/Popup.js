export default class Popup {
  constructor(selector) {
    //".popup"
    this._popupSelector = selector;
  }

  open() {}

  close() {}

  _handleEscClose() {
    //lógica para cerrar con Esc
  }

  setEventListeners() {
    //agrega detector de clicks para cerrar
  }
}
