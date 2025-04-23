import Popup from "./Popup";

export default class PopupWithImage extends Popup {
  constructor(selector) {
    super(selector);
  }

  //overwrite
  open() {
    super.open();
    //añadir imagen y src del popup
  }
}
