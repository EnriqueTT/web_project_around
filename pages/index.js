import Card from "./Card.js";
import * as utils from "./utils.js";
import FormValidator from "./FormValidator.js";

const initialCards = [
  {
    name: "Parque Ecoturístico Dos Aguas",
    link: "./images/Dos_Aguas.jpeg",
  },
  {
    name: "Lago Louise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/lake-louise.jpg",
  },
  {
    name: "Montañas Calvas",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/bald-mountains.jpg",
  },
  {
    name: "Latemar",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/latemar.jpg",
  },
  {
    name: "Parque Nacional de la Vanoise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/vanoise.jpg",
  },
  {
    name: "Lago di Braies",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/lago.jpg",
  },
];
//https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/yosemite.jpg
const editButton = document.querySelector(".info__edit-button");
const form = document.querySelector(".form");
const formName = document.querySelector(".form__name");
const formAbout = document.querySelector(".form__about");
const profileName = document.querySelector(".info__name");
const profileAbout = document.querySelector(".info__about");
const placesContainer = document.querySelector(".places");
const addButton = document.querySelector(".profile__add-button");
const addPopUp = document.querySelector(".popup_add");
const addForm = document.querySelector(".add-form");
const popups = document.querySelectorAll(".popup");

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

//Renderizado inicial de las 6 cartas
//Esto funciona gracias a la destructuración de objetos
//Se separan las propiedades de los objetos almacenados en la lista
initialCards.forEach(({ link, name }) => addNewCard(name, link));
// initialCards.forEach(card => addNewCard(card.name , card.link));

function addNewCard(title, imgURL) {
  const card = new Card(title, imgURL, "#card-template");
  placesContainer.prepend(card.createCard());
}

addForm.addEventListener("submit", function (evt) {
  evt.preventDefault();
  const formInputs = evt.target.querySelectorAll("input");
  addNewCard(formInputs[0].value, formInputs[1].value);
  utils.closePopup(addForm.closest(".popup"));
});

//Función que cierra el popup con hacer click fuera de el (incluyendo botón x)
popups.forEach((popup) => {
  popup.addEventListener("click", (evt) => {
    utils.outsideClickPopupHandler(evt, popup);
  });
});
// document.body.addEventListener("click", utils.outsideClick);

//Función para cerrar con botón Escape
document.body.addEventListener("keydown", (evt) => {
  utils.escapeKeydownPopupHandler(evt);
});

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
