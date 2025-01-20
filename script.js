let editButton = document.querySelector(".profile-info__edit-button");
let dialogWindow = document.querySelector(".dialog");
let submitButton = document.querySelector(".dialog__submit-button");
let formName = document.querySelector(".dialog__name");
let formAbout = document.querySelector(".dialog__about");
let name = document.querySelector(".profile-info__name");
let about = document.querySelector(".profile-info__about");

function enableModal() {
    // formName.value="";   cual es mejor??
    formName.value="";
    formAbout.value="";
    dialogWindow.showModal();
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
// editButton.addEventListener("click",()=>{dialogWindow.showModal();});
submitButton.addEventListener("click",closeModal);
