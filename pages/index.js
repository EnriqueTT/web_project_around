import Card from "../components/Card.js";
import * as utils from "../utils/utils.js";
import FormValidator from "../components/FormValidator.js";
import {
  initialCards,
  placesContainerSelector,
  cardTemplate,
} from "../utils/constants.js";
import Section from "../components/Section.js";
import PopupWithImage from "../components/PopupWithImage.js";

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

addButton.addEventListener("click", function () {
  addPopUp.querySelector(".form__link").value = "";
  addPopUp.querySelector(".form__name").value = "";
  utils.openPopup(document.querySelector(".popup_add"));
});

form.addEventListener("submit", handleFormSubmit);
const picturePopup = new PopupWithImage(".popup_img");
//Renderizado inicial de las 6 cartas
const sectionCards = new Section(
  {
    items: initialCards,
    renderer: ({ name, link }) => {
      const card = new Card(
        {
          name,
          link,
          handleCardClick: (item) => {
            picturePopup.open(item);
          },
        },
        cardTemplate
      );
      const cardElement = card.createCard();
      sectionCards.addItem(cardElement);
    },
  },
  placesContainerSelector
);
sectionCards.renderItems();

addForm.addEventListener("submit", function (evt) {
  evt.preventDefault();
  const formInputs = evt.target.querySelectorAll("input");
  addNewCard(formInputs[0].value, formInputs[1].value);
  utils.closePopup(addForm.closest(".popup"));
});

////  Popups

//Función para cerrar con botón Escape
// // document.body.addEventListener("keydown", (evt) => {
// //   utils.escapeKeydownPopupHandler(evt);
// // });

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
