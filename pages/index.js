import Card from "../components/Card.js";
import * as utils from "../utils/utils.js";
import FormValidator from "../components/FormValidator.js";
import {
  initialCards,
  placesContainerSelector,
  cardTemplate,
  addPopupSelector,
  imgPopupSelector,
} from "../utils/constants.js";
import Section from "../layers/Section.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";

//https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/yosemite.jpg
const editButton = document.querySelector(".info__edit-button");
const form = document.querySelector(".form");
const formName = document.querySelector(".form__name");
const formAbout = document.querySelector(".form__about");
const profileName = document.querySelector(".info__name");
const profileAbout = document.querySelector(".info__about");
const addButton = document.querySelector(".profile__add-button");
const addPopUp = document.querySelector(".popup_add");
const addForm = document.querySelector(".add-form");

const picturePopup = new PopupWithImage(imgPopupSelector);
//Renderizado inicial de las 6 cartas
const sectionCards = new Section(
  {
    items: initialCards,
    renderer,
  },
  placesContainerSelector
);
sectionCards.renderItems();

function renderer({ name, link }) {
  const card = new Card(
    {
      name,
      link,
      handleCardClick,
    },
    cardTemplate
  );
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
      const newCard = new Card(
        { name: inputs[0].value, link: inputs[1].value, handleCardClick },
        cardTemplate
      );
      sectionCards.addItem(newCard.createCard());
    },
  },
  addPopupSelector
);

// Editor de perfil
//.....

function handleFormSubmit(evt) {
  evt.preventDefault();
  // console.log(formName.getAttribute("value"));NO SIRVE PORQUE
  // ESTE MÉTODO NO TRBAJA CON EL DOM
  profileName.textContent = formName.value;
  profileAbout.textContent = formAbout.value;
  // profileName.setAttribute("value",formName.value);
  utils.closePopup(evt.target.closest(".popup"));
}

editButton.addEventListener("click", () => {
  formName.value = profileName.textContent;
  formAbout.value = profileAbout.textContent;
  utils.openPopup(document.querySelector(".popup"));
});

addForm.addEventListener("submit", function (evt) {
  evt.preventDefault();
  const formInputs = evt.target.querySelectorAll("input");
  // addNewCard(formInputs[0].value, formInputs[1].value);
  // utils.closePopup(addForm.closest(".popup"));
});

form.addEventListener("submit", handleFormSubmit);

//funcion handler envía el formulario

addButton.addEventListener("click", function () {
  // addPopUp.querySelector(".form__link").value = "";
  // addPopUp.querySelector(".form__name").value = "";
  addCardPopup.open();
  addCardPopup._getInputValues();
});

// const profileEditForm = new PopupWithForm({handler : () => {
// }}, ".popup");

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
