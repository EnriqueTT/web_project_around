import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import {
  placesContainerSelector,
  cardTemplate,
  addPopupSelector,
  imgPopupSelector,
  confirmPopupSelector,
  profileFormSelector,
  userNameSelector,
  userAboutSelector,
  userAvatarSelector,
  token,
} from "../utils/constants.js";

import Api from "../components/Api.js";
import Section from "../layers/Section.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import UserInfo from "../components/UserInfo.js";
import PopupWithConfirmation from "../components/PopupWithConfirmation.js";

const editButton = document.querySelector(".info__edit-button");
const profileName = document.querySelector(".info__name");
const profileAbout = document.querySelector(".info__about");
const addButton = document.querySelector(".profile__add-button");
const addPopUp = document.querySelector(".popup_add");
const addForm = document.querySelector(".add-form");

const api = new Api({
  url: "https://around-api.es.tripleten-services.com/v1/",
  headers: {
    authorization: token,
    "Content-Type": "application/json",
  },
});

api.getUserInfo().then((result) => {
  userInfo.setUserInfo(result.name, result.about);
  userInfo.setAvatar(result.avatar);
});

api.getInitialCards().then((result) => {
  console.log(result);
  sectionCards.setItems(result);
  sectionCards.renderItems();
});

const picturePopup = new PopupWithImage(imgPopupSelector);

const sectionCards = new Section(
  {
    items: [],
    renderer,
  },
  placesContainerSelector,
);

function renderer(item) {
  const card = new Card(
    item,
    handleCardClick,
    handleDeleteButton,
    handleLikeButton,
    cardTemplate,
  );
  const cardElement = card.createCard();
  sectionCards.addItem(cardElement);
}

function handleLikeButton({ isLiked, id }) {
  api
    .handleLike(id, isLiked)
    .then((res) => {
      isLiked = res.isLiked;
    })
    .catch((err) => {
      console.log(err);
    });
  return isLiked;
}

function handleCardClick(item) {
  picturePopup.open(item);
}

function handleDeleteButton(id, element) {
  deletePopup.open(id, element);
}

// Formulario de cartas
const addCardPopup = new PopupWithForm(
  {
    handler: () => {
      const inputs = addCardPopup._getInputValues();
      api.addCard(inputs).then((result) => {
        const newCard = new Card(
          result,
          handleCardClick,
          handleDeleteButton,
          handleLikeButton,
          cardTemplate,
        );
        sectionCards.addItem(newCard.createCard());
        // renderer(result[0]);
      });
    },
  },
  addPopupSelector,
);

// Editor de perfil
const userInfo = new UserInfo({
  name: userNameSelector,
  job: userAboutSelector,
  avatar: userAvatarSelector,
});

const profilePopup = new PopupWithForm(
  {
    handler: () => {
      const inputs = profilePopup._getInputValues();
      api.patchUserInfo(inputs).then((result) => {
        userInfo.setUserInfo(result.name, result.about);
      });
    },
  },
  profileFormSelector,
);

//popup eliminar
const deletePopup = new PopupWithConfirmation(
  {
    handler: (id, element) => {
      api
        .deleteCard(id)
        .then((json) => {
          // target.closest(".card").remove();
          sectionCards.removeItem(element);
          console.log(json);
        })
        .catch((error) => console.log(error));
    },
  },
  confirmPopupSelector,
);

editButton.addEventListener("click", () => {
  profilePopup.open();
  profilePopup.setInputValues(userInfo.getUserInfo());
});

addButton.addEventListener("click", function () {
  addCardPopup.open();
});

////  Formularios
// enableValidation();
const forms = document.querySelectorAll(".form");
// Array.from(document.forms).forEach
forms.forEach((form) => {
  const relation = !form.classList.contains("add-form")
    ? { first: profileName, second: profileAbout }
    : {
        first: addPopUp.querySelector(".form__link"),
        second: addPopUp.querySelector(".form__name"),
      };
  const obj = {
    form: form,
    button: form.querySelector(".form__submit-button"),
    firstR: relation.first,
    secondR: relation.second,
  };
  const formObject = new FormValidator(
    obj,
    !form.classList.contains("add-form"),
  );
  formObject.enableValidation();
});
