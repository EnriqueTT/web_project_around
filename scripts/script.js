let editButton = document.querySelector(".info__edit-button");
let popup = document.querySelector(".popup");
let form = document.querySelector(".form");
let formName = document.querySelector(".form__name");
let formAbout = document.querySelector(".form__about");
let profileName = document.querySelector(".info__name");
let profileAbout = document.querySelector(".info__about");
let popupCloseButton = document.querySelector(".popup__close-button");
let like = document.querySelector(".card__like");

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
like.addEventListener("click", () => {
    if(like.classList.contains("card__like_black-heart")){
        like.classList.remove("card__like_black-heart");
        console.log("quitar");
    }else{
        like.classList.add("card__like_black-heart");
        console.log("añadir");
    }
    
});