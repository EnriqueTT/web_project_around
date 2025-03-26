export function openPopup(popup) {
  popup.classList.add("popup_opened");
}

export function closePopup(popup) {
  popup.classList.remove("popup_opened");
}

export function pictureClickHandler(imgCard) {
  const imgPopUp = document.querySelector(".popup_img");
  imgPopUp.classList.add("popup_opened");
  imgPopUp.querySelector("img").src = imgCard.src;
  imgPopUp.querySelector("p").textContent = imgCard
    .closest(".card")
    .querySelector("p").textContent;
}

export function removeButtonHandler(card) {
  card.remove();
}

export function likeButtonHandler(evt) {
  evt.target.classList.toggle("card__like_black");
}
