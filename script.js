let editButton = document.querySelector(".profile__edit-button");
let dialogWindow = document.querySelector(".profile__dialog");
let submitButton = document.querySelector(".profile__submit-button");

function enableModal() {
    dialogWindow.setAttribute("open",open);
} 
// editButton.addEventListener("click",enableModal);
editButton.addEventListener("click",()=>{dialogWindow.show();});
submitButton.addEventListener("click",()=>{
    dialogWindow.close();
})