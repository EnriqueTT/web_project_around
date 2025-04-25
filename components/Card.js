export default class Card {
  constructor({ name, link, handleCardClick }, templateSelector) {
    this._content = document
      .querySelector(templateSelector)
      .content.querySelector(".card")
      .cloneNode(true);
    this._text = name;
    this._imgSrc = link;
    this._handleCardClick = handleCardClick;
    this._pictureHandler = this._pictureHandler.bind(this);
  }

  createCard() {
    const card__img = this._content.querySelector(".card__img");
    card__img.src = this._imgSrc;
    card__img.alt = this._text;
    this._content.querySelector(".card__text").textContent = this._text;
    this._setEvents();
    return this._content;
  }

  _setEvents() {
    this._content
      .querySelector(".card__img-trash")
      .addEventListener("click", this._removeButtonHandler);
    this._content
      .querySelector(".card__like")
      .addEventListener("click", this._likeButtonHandler);
    this._content
      .querySelector(".card__img")
      .addEventListener("click", this._pictureHandler);
  }

  _pictureHandler() {
    this._handleCardClick({ name: this._text, link: this._imgSrc });
  }

  _removeButtonHandler(evt) {
    evt.target.closest(".card").remove();
  }

  _likeButtonHandler(evt) {
    evt.target.classList.toggle("card__like_black");
  }
}
