import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import {
  placesContainerSelector,
  cardTemplate,
  addPopupSelector,
  imgPopupSelector,
  profileFormSelector,
  userNameSelector,
  userAboutSelector,
  userAvatarSelector,
  token,
} from "../utils/constants.js";
import Section from "../layers/Section.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import UserInfo from "../components/UserInfo.js";
import PopupWithConfirmation from "../components/PopupWithConfirmation.js";

//https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/yosemite.jpg
const editButton = document.querySelector(".info__edit-button");
const profileName = document.querySelector(".info__name");
const profileAbout = document.querySelector(".info__about");
const addButton = document.querySelector(".profile__add-button");
const addPopUp = document.querySelector(".popup_add");
const addForm = document.querySelector(".add-form");

fetch("https://around-api.es.tripleten-services.com/v1/users/me", {
  headers: {
    authorization: token,
  },
})
  .then((res) => res.json())
  .then((result) => {
    userInfo.setUserInfo(result.name, result.about);
    userInfo.setAvatar(result.avatar);
  });

fetch("https://around-api.es.tripleten-services.com/v1/cards/", {
  headers: {
    authorization: token,
  },
})
  .then((res) => res.json())
  .then((result) => {
    console.log(result);
    const otherSectionCards = new Section(
      {
        items: result,
        renderer,
      },
      placesContainerSelector
    );
    otherSectionCards.renderItems();
  });

const picturePopup = new PopupWithImage(imgPopupSelector);
//Renderizado inicial de las 6 cartas
const sectionCards = new Section(
  {
    items: [],
    renderer,
  },
  placesContainerSelector
);
// sectionCards.renderItems();

function renderer(result) {
  const card = new Card(result, handleCardClick, cardTemplate);
  const cardElement = card.createCard();
  sectionCards.addItem(cardElement);
}

function handleCardClick(item) {
  picturePopup.open(item);
}

// Formulario de cartas
const addCardPopup = new PopupWithForm(
  {
    handler: () => {
      const inputs = addCardPopup._getInputValues();
      fetch("https://around-api.es.tripleten-services.com/v1/cards/", {
        method: "POST",
        headers: {
          authorization: token,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: inputs[0].value,
          link: inputs[1].value,
        }),
      })
        .then((res) => res.json())
        .then((result) => {
          const newCard = new Card(result, handleCardClick, cardTemplate);
          sectionCards.addItem(newCard.createCard());
          // renderer(result[0]);
        });
    },
  },
  addPopupSelector
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
      fetch("https://around-api.es.tripleten-services.com/v1/users/me", {
        method: "PATCH",
        headers: {
          authorization: token,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: inputs[0].value,
          about: inputs[1].value,
        }),
      })
        .then((res) => res.json())
        .then((result) => {
          userInfo.setUserInfo(result.name, result.about);
        });
    },
  },
  profileFormSelector
);

editButton.addEventListener("click", () => {
  profilePopup.open();
  profilePopup.setInputValues(userInfo.getUserInfo());
});

addButton.addEventListener("click", function () {
  // addCardPopup.open();
  deletePopup.open();
});

//eliminar popup
const deletePopup = new PopupWithConfirmation(".popup_confirmation");

// function handleDeletePopup() {
//   deletePopup.open();
// }
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
    !form.classList.contains("add-form")
  );
  formObject.enableValidation();
});
