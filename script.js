let editButton = document.querySelector(".profile__edit-button");
let dialogWindow = document.querySelector(".profile__dialog");
let submitButton = document.querySelector(".dialog__submit-button");
let formName = document.querySelector(".dialog__name");
let formAbout = document.querySelector(".dialog__about");
let name = document.querySelector(".profile__name");
let about = document.querySelector(".profile__about");

function enableModal() {
    // formName.value="";   cual es mejor??
    formName.value="";
    formAbout.value="";
    dialogWindow.setAttribute("open",open);
} 
function closeModal() {
    console.log(formName.value);
    // console.log(formName.getAttribute("value"));NO SIRVE PORQUE 
    // ESTE MÉTODO TRBAJA CON EL DOM
    if (formName.value!=""){
        name.textContent = formName.value;
        // name.value = formName.value; porque estos tres no funcionan?
        // console.log(name.value);
        // console.log(name.textContent)
        // name.setAttribute("value",formName.textContent);
    }
    if(formAbout.value!=""){
        about.textContent=formAbout.value;
    }
    dialogWindow.close();
}

editButton.addEventListener("click",enableModal);
// editButton.addEventListener("click",()=>{dialogWindow.show();});
submitButton.addEventListener("click",closeModal);
