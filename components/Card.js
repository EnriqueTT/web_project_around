export default class Card {
  constructor({ name, link, handleCardClick }, templateSelector) {
    this._content = document
      .querySelector(templateSelector)
      .content.querySelector(".card")
      .cloneNode(true);
    this._text = name;
    this._imgSrc = link;
    this._pictureClickHandler = this._pictureClickHandler.bind(this);
    this._handleCardClick = handleCardClick;
    this._imgPopUp = document.querySelector(".popup_img");
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
    // this._content
    //   .querySelector(".card__img")
    //   .addEventListener("click", this._pictureClickHandler);
    this._content.querySelector(".card__img").addEventListener("click", () => {
      this._handleCardClick({ name: this._text, link: this._imgSrc });
    });
    // this._content.querySelector(".card__img")
    // .addEventListener("click", () =>
    // { this._pictureClickHandler()}
    //     );
  }

  _pictureClickHandler() {
    // this._imgPopUp.classList.add("popup_opened");
    // const img = this._imgPopUp.querySelector("img");
    // img.alt = this._text;
    // img.src = this._imgSrc;
    // this._imgPopUp.querySelector("p").textContent = this._text;
    // // evt.target
    // //   .closest(".card")
    // //   .querySelector(".card__text").textContent;
    // // img.alt = evt.target.src;
    // // img.src = evt.target.alt;
  }

  _removeButtonHandler(evt) {
    evt.target.closest(".card").remove();
  }

  _likeButtonHandler(evt) {
    evt.target.classList.toggle("card__like_black");
  }
}
