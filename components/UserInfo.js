export default class UserInfo {
  constructor({ name, job }) {
    this._name = name;
    this._job = job;
  }

  getUserInfo() {
    return { name: this._name, job: this._job };
  }

  setUserInfo() {
    //igualar a los nuevos datos del usuario
    this._name = "";
    this._job = "";
  }
}
