export default class Section {
  constructor({ items, renderer }, containerSelector) {
    this._items = items; //array de datos
    this._renderer = renderer; //crea y renderiza
    this._container = document.querySelector(containerSelector);
  }

  //renderer() según requerimientos.
  renderItems() {
    this.clear();
    this._items.forEach((item) => {
      this._renderer(item);
    });
  }

  addItem(element) {
    this._container.append(element);
  }

  clear() {
    this._container.innerHTML = "";
  }
}
