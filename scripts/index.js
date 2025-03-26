import Card from "./Card.js";
import enableValidation from "./validate.js";
import * as utils from "./utils.js";

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
const section = document.querySelector(".places");

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

function addNewCard(title, imgURL) {
  const card = new Card(title, imgURL, "#card-template");
  placesContainer.prepend(card.createCard());
}

section.addEventListener("click", (evt) => {
  if (evt.target.classList.contains("card__like")) {
    utils.likeButtonHandler(evt);
  }
  if (evt.target.classList.contains("card__img-trash")) {
    utils.removeButtonHandler(evt.target.closest(".card"));
  }
  if (evt.target.classList.contains("card__img")) {
    utils.pictureClickHandler(evt.target.closest(".card__img"));
  }
});

//Renderizado inicial de las 6 cartas
initialCards.forEach(({ link, name }) => addNewCard(name, link));

//evt.target es el elemento que activó el evento
addForm.addEventListener("submit", function (evt) {
  evt.preventDefault();
  const formInputs = evt.target.querySelectorAll("input");
  addNewCard(formInputs[0].value, formInputs[1].value);
  utils.closePopup(addForm.closest(".popup"));
});
//console.log(2*Math.pow(10,5));
// initialCards.forEach(card => createCard(card.link,card.name));
//https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/yosemite.jpg

//Función que cierra el popup con hacer click fuera de el (incluyendo botón x)
popups.forEach((popup) => {
  popup.addEventListener("click", function (evt) {
    const targetClassList = evt.target.classList;
    if (
      targetClassList.contains("popup") ||
      targetClassList.contains("popup__close-button")
    ) {
      utils.closePopup(popup);
    }
  });
});
//Función para cerrar con botón Escape
document.addEventListener("keydown", (evt) => {
  if (evt.key === "Escape") {
    popups.forEach((popup) => {
      if (popup.classList.contains("popup_opened")) {
        popup.classList.remove("popup_opened");
      }
    });
  }
});

enableValidation();
