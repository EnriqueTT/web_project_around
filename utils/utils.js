export function openPopup(popup) {
  popup.classList.add("popup_opened");
}

export function closePopup(popup) {
  popup.classList.remove("popup_opened");
}

export function escapeKeydownPopupHandler(evt) {
  const openedPopup = document.querySelector(".popup_opened");
  if (evt.key === "Escape" && openedPopup) {
    closePopup(openedPopup);
  }
}
