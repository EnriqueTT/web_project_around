export function openPopup(popup) {
  popup.classList.add("popup_opened");
}

export function closePopup(popup) {
  popup.classList.remove("popup_opened");
}

export function outsideClickPopupHandler(evt, popup) {
  const targetClassList = evt.target.classList;
  if (
    targetClassList.contains("popup") ||
    targetClassList.contains("popup__close-button")
  ) {
    closePopup(popup);
  }
}

export function escapeKeydownPopupHandler(evt) {
  const openedPopup = document.querySelector(".popup_opened");
  if (evt.key === "Escape" && openedPopup) {
    closePopup(openedPopup);
  }
}

export function outsideClick(evt) {
  const isPopupOpened =
    evt.target.classList.contains("popup__close-button") ||
    evt.target.classList.contains("popup_opened");
  if (isPopupOpened) {
    closePopup(evt.target.closest(".popup"));
  }
}
