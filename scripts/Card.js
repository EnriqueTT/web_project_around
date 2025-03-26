export default class Card {
  constructor(text, img, templateSelector) {
    this._content = document
      .querySelector(templateSelector)
      .content.querySelector(".card")
      .cloneNode(true);
    this._text = text;
    this._imgSrc = img;
  }

  createCard() {
    const card__img = this._content.querySelector(".card__img");
    card__img.src = this._imgSrc;
    card__img.alt = this._text;
    this._content.querySelector(".card__text").textContent = this._text;
    return this._content;
  }
}
