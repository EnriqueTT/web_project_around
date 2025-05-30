import { formNameSelector, formAboutSelector } from "../utils/constants.js";

export default class UserInfo {
  constructor({ name, job, avatar }) {
    this._formName = document.querySelector(formNameSelector);
    this._formJob = document.querySelector(formAboutSelector);
    this._userName = document.querySelector(name);
    this._userJob = document.querySelector(job);
    this._userAvatar = document.querySelector(avatar);
  }

  getUserInfo() {
    return { name: this._userName.textContent, job: this._userJob.textContent };
  }

  setUserInfo(name, job) {
    //igualar a los nuevos datos del usuario
    this._userName.textContent = name;
    this._userJob.textContent = job;
  }

  setAvatar(link) {
    // this._userAvatar.setAttribute("src", link);
    this._userAvatar.src = link;
  }
}
