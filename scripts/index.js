const initialCards = [
    {
      name: "Parque Ecoturístico Dos Aguas",
      link: "./images/Dos_Aguas.jpeg"
    },
    {
      name: "Lago Louise",
      link: "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/lake-louise.jpg"
    },
    {
      name: "Montañas Calvas",
      link: "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/bald-mountains.jpg"
    },
    {
      name: "Latemar",
      link: "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/latemar.jpg"
    },
    {
      name: "Parque Nacional de la Vanoise",
      link: "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/vanoise.jpg"
    },
    {
      name: "Lago di Braies",
      link: "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/lago.jpg"
    }
  ];
const editButton = document.querySelector(".info__edit-button");
const popup = document.querySelector(".popup");
const form = document.querySelector(".form");
const formName = document.querySelector(".form__name");
const formAbout = document.querySelector(".form__about");
const profileName = document.querySelector(".info__name");
const profileAbout = document.querySelector(".info__about");
const popupCloseButton = document.querySelector(".popup__close-button");
const like = document.querySelectorAll(".card__like");
const placesContainer = document.querySelector(".places");

function enableModal() {
    formName.value=profileName.textContent;
    formAbout.value=profileAbout.textContent;
    popup.classList.add("popup_opened");
} 
function closeM() {
  popup.classList.remove("popup_opened");
}
function handleFormSubmit(evt) {
    evt.preventDefault();
    // console.log(formName.getAttribute("value"));NO SIRVE PORQUE 
    // ESTE MÉTODO NO TRBAJA CON EL DOM
    if (formName.value!=""){
        profileName.textContent = formName.value;
        // profileName.setAttribute("value",formName.value);
    }
    if(formAbout.value!=""){
        profileAbout.textContent=formAbout.value;
    }
    closeM();
}

editButton.addEventListener("click",enableModal);
form.addEventListener("submit",handleFormSubmit);
popupCloseButton.addEventListener("click",function () {
    closeM();
});

like.forEach(element => {
    element.addEventListener("click", () => {
        element.classList.toggle("card__like_black")
    });
});

function createCard(imgURL, title) {
    const template = document.querySelector("#template").content;
    const card = template.querySelector(".card").cloneNode(true);
    card.querySelector(".card__img").src=imgURL;
    card.querySelector(".card__text").textContent = title;
    card.querySelector(".card__like").addEventListener("click",function(evt){
        evt.target.classList.toggle("card__like_black");
    });
    placesContainer.append(card);
}
initialCards.forEach(card => {
    createCard(card.link,card.name);
});
//https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/yosemite.jpg