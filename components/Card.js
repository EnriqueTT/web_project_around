import { token } from "../utils/constants.js";
export default class Card {
  constructor({ name, link, isLiked, _id }, handleCardClick, templateSelector) {
    this._content = document
      .querySelector(templateSelector)
      .content.querySelector(".card")
      .cloneNode(true);
    this._text = name;
    this._imgSrc = link;
    this._isLiked = isLiked;
    this._id = _id;
    this._handleCardClick = handleCardClick;
    this._pictureHandler = this._pictureHandler.bind(this);
    this._likeButtonHandler = this._likeButtonHandler.bind(this);
    this._removeButtonHandler = this._removeButtonHandler.bind(this);
  }

  createCard() {
    const card__img = this._content.querySelector(".card__img");
    card__img.src = this._imgSrc;
    card__img.alt = this._text;
    this._content.querySelector(".card__text").textContent = this._text;
    this._setEvents();
    this._setLike();
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

  _setLike() {
    if (this._isLiked) {
      this._content
        .querySelector(".card__like")
        .classList.toggle("card__like_black");
    }
  }

  _pictureHandler() {
    this._handleCardClick({ name: this._text, link: this._imgSrc });
  }

  _removeButtonHandler(evt) {
    evt.target.closest(".card").remove();
    fetch(
      `https://around-api.es.tripleten-services.com/v1/cards/${this._id}/`,
      {
        method: "DELETE",
        headers: {
          authorization: token,
          "Content-Type": "application/json",
        },
      }
    )
      .then((res) => res.json())
      .then((result) => {
        console.log(result);
      });
  }

  _likeButtonHandler(evt) {
    evt.target.classList.toggle("card__like_black");
    this._isLiked ? (this._isLiked = false) : (this._isLiked = true);
    if (this._isLiked) {
      fetch(
        `https://around-api.es.tripleten-services.com/v1/cards/${this._id}/likes`,
        {
          method: "PUT",
          headers: {
            authorization: token,
            "Content-Type": "application/json",
          },
        }
      );
      // .then((res) => res.json())
      // .then((result) => {
      //   console.log(result);
      // });
    } else {
      fetch(
        `https://around-api.es.tripleten-services.com/v1/cards/${this._id}/likes`,
        {
          method: "DELETE",
          headers: {
            authorization: token,
            "Content-Type": "application/json",
          },
        }
      );
    }
  }
}
