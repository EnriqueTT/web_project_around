export default class Section {
  constructor({ items, renderer }, containerSelector) {
    this._items = items; //array de datos
    this._renderer = renderer; //crea y renderiza
    this._containerSelector = containerSelector;
  }

  //renderer() según requerimientos.
  renderItems() {
    this.clear();
    this._items.forEach((item) => {
      this.addItem(item);
    });
  }

  addItem(element) {
    this._containerSelector.append(element);
  }

  clear() {
    this._container.innerHTML = "";
  }
}
