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
      // si el servidor devuelve un error, rechaza el promise
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
}
