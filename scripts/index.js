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
const popupCloseButtons = document.querySelectorAll(".popup__close-button");
const like = document.querySelectorAll(".card__like");
const placesContainer = document.querySelector(".places");
const addButton = document.querySelector(".profile__add-button");
const addPopUp = document.querySelector(".popup_add");
const addForm = document.querySelector(".add-form");
const popups = document.querySelectorAll(".popup");

function enableModal() {
    formName.value=profileName.textContent;
    formAbout.value=profileAbout.textContent;
    popup.classList.add("popup_opened");
} 
function closeM(popup) {
  popup.classList.remove("popup_opened");
}
function handleFormSubmit(evt) {
    evt.preventDefault();
    // console.log(formName.getAttribute("value"));NO SIRVE PORQUE 
    // ESTE MÉTODO NO TRBAJA CON EL DOM
    if (formName.value!="" && formAbout.value!=""){
        profileName.textContent = formName.value;
        profileAbout.textContent=formAbout.value;
        // profileName.setAttribute("value",formName.value);
        closeM(evt.target.closest(".popup"));
    } else{
        alert("campos vacíos");
    }
}

editButton.addEventListener("click",enableModal);
form.addEventListener("submit",handleFormSubmit);
popupCloseButtons.forEach((closeButton) => {
    closeButton.addEventListener("click",function(){
    const targetPopup = closeButton.closest(".popup");
    closeM(targetPopup);
    })
} );

function removeButtonHandler(card) {
  card.remove();
}
function likeButtonHandler(evt) {
  evt.target.classList.toggle("card__like_black");
}
function pictureClickHandler(imgCard) {
  const imgPopUp = document.querySelector(".popup_img");
  imgPopUp.classList.add("popup_opened");
  imgPopUp.querySelector("img").src = imgCard.src;
  imgPopUp.querySelector("p").textContent = imgCard.closest(".card").querySelector("p").textContent; 

}

function createCard( title , imgURL) {
    if(title !== "" && imgURL !== ""){
        const template = document.querySelector("#template").content;
        const card = template.querySelector(".card").cloneNode(true);
        const imgCard = card.querySelector(".card__img");
        imgCard.src=imgURL;
        card.querySelector(".card__text").textContent = title;
        card.querySelector(".card__like").addEventListener("click",likeButtonHandler);
        placesContainer.prepend(card);
        card.querySelector(".card__img-trash")
        .addEventListener("click",()=>removeButtonHandler(card));
        imgCard.addEventListener("click",()=>pictureClickHandler(imgCard));
    } else{
        alert("campos vacíos");
    }
}

initialCards.forEach(({link,name}) => createCard(name,link));
addButton.addEventListener("click",function(){
    addPopUp.querySelector(".form__link").value="";
    addPopUp.querySelector(".form__name").value="";
    addPopUp.classList.add("popup_opened");
});
//evt.target es el elemento que activó el evento
addForm.addEventListener("submit",function(evt){
    evt.preventDefault();
    const formInputs = evt.target.querySelectorAll("input");
    createCard(formInputs[0].value,formInputs[1].value);
    closeM(addForm.closest(".popup"));
});
//console.log(2*Math.pow(10,5));
// initialCards.forEach(card => createCard(card.link,card.name));
//https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/yosemite.jpg
// document.forms.forEach ( (form) => {
//   form.addEventListener("click", (evt) => {
//   if(!evt.target.classList.contains("form") ) {
//       closeM(evt.target.closest(".popup"));
//       console.log("click");
//   }
// })});

popups.forEach((popup) => {
  popup.addEventListener("click", function(evt){
    if( evt.target.classList.contains("popup") ){
      closeM(popup);
    }
  });
});