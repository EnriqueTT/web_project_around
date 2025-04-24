import Popup from "./Popup";

export default class PopupWithForm extends Popup {
  constructor(selector, handler) {
    super(selector);
    this.handler = handler;
  }

  _getInputValues() {
    //recopila todos los datos de entrada
    const this._inputs = Array.from(this._popupContainer.querySelectorAll(".input"));
    const this._values = this._inputs.map(input => input.value);
  }

  setEventListeners() {
      //agregar evento submit
      //y detector de click para cerrar 
  }

//overwrite
  close() {
      super.close();
      //modificar de tal modo que reinicie los formularios
  }

}
