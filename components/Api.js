export default class Api {
  constructor({ url, headers }) {
    this._url = url;
    this._headers = headers;
  }

  getInitialCards() {
    return fetch(this._url + `cards`, {
      headers: this._headers,
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Error: ${res.status}`);
    });
  }

  getUserInfo() {
    return fetch(this._url + `users/me`, {
      headers: this._headers,
    }).then((res) => {
      if (res.ok) return res.json();
      return Promise.reject(`Error: ${res.status}`);
    });
  }

  setLike(id) {
    return fetch(this._url + `cards/${id}/likes`, {
      method: "PUT",
      headers: this._headers,
    }).then((res) =>
      res.ok
        ? res.json()
        : Promise.reject(`Error con botón de like:  Error ${res.status}`),
    );
  }

  deleteLike(id) {
    return fetch(this._url + `cards/${id}/likes`, {
      method: "DELETE",
      headers: this._headers,
    }).then((res) =>
      res.ok
        ? res.json()
        : Promise.reject(`Error con botón de like:  Error ${res.status}`),
    );
  }

  handleLike(id, isLiked) {
    const method = isLiked ? "PUT" : "DELETE";
    return fetch(this._url + `cards/${id}/likes`, {
      method: method,
      headers: this._headers,
    }).then((res) =>
      res.ok
        ? res.json()
        : Promise.reject(`Error con botón de like:  Error ${res.status}`),
    );
  }

  addCard(inputs) {
    return fetch(this._url + "cards/", {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({
        name: inputs[0].value,
        link: inputs[1].value,
      }),
    }).then((res) => res.json());
  }

  deleteCard(id) {
    return fetch(this._url + `cards/${id}`, {
      method: "DELETE",
      headers: this._headers,
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(
        `No se pudo eliminar la publicación por un : Error ${res.status}`,
      );
    });
  }

  patchUserInfo(userInfo) {
    return fetch(this._url + "users/me", {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        name: userInfo[0].value,
        about: userInfo[1].value,
      }),
    }).then((res) => res.json());
  }

  editUserPhoto(link) {
    return fetch(this._url + "users/me/avatar", {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        avatar: link,
      }),
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(
        `No se pudo eliminar la publicación por un : Error ${res.status}`,
      );
    });
  }
}
