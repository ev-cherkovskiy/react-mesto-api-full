// Если переименовать этот файл, то автоматическая проверка ругается и не пускает на ревью 
// (требует экспорт именно Api.js). Поэтому пока что оставил так, 
// но замечание принял во внимание.

// Класс Api, экземпляр которого используется для организации работы с сервером
// В конструкторе один аргумент -- объект, содержащий общую для всех HTTP-запросов часть
class Api {
    constructor(options) {
        // Путь до сервера
        this._baseUrl = options.baseUrl;
        // Объект заголовков
        this._headers = new Object(options.headers);
    }


    // Приватный метод, который проверяет ответ от сервера, форматирует его или возващает ошибку
    _checkResponse(res) {
        if (res.ok) {
            return res.json();
        }

        return Promise.reject(`Ошибка: ${res.status}`);
    }

    // Все приватные методы ниже названы по методам HTTP-запросов. Они представляют собой шаблоны и
    // необходимы для отправки более конкретных запросов, которые являются уже публичными методами.

    _get(dir) {
        return fetch(this._baseUrl + dir, {
            headers: this._headers })
        .then(this._checkResponse);
    }

    _patch(dir, bodyObject) {
        return fetch(this._baseUrl + dir, {
            method: 'PATCH',
            headers: this._headers,
            body: JSON.stringify(bodyObject)
        })
        .then(this._checkResponse);
    }

    _post(dir, bodyObject) {
        return fetch(this._baseUrl + dir, {
            method: 'POST',
            headers: this._headers,
            body: JSON.stringify(bodyObject)
        })
        .then(this._checkResponse);
    }

    _delete(dir1, id, dir2) {
        return fetch(this._baseUrl + dir1 + id + dir2, {
            method: 'DELETE',
            headers: this._headers
        })
        .then(this._checkResponse);
    }

    _put(dir1, id, dir2) {
        return fetch(this._baseUrl + dir1 + id + dir2, {
            method: 'PUT',
            headers: this._headers
        })
        .then(this._checkResponse);
    }

    // Публичные методы используют шаблоны, приведённые выше:
    // дополняют URL и тело запросов

    getUserInfo() {
        return this._get('/users/me');
    }

    getInitialCards() {
        return this._get('/cards');
    }

    changeUserInfo(info) {
        const body = {
            name: info.name,
            about: info.about
        };
        return this._patch('/users/me', body);
    }

    changeAvatar(info) {
        const body = {
            avatar: info.avatar
        };
        return this._patch('/users/me/avatar', body);
    }

    addCard(info) {
        const body = {
            name: info.name,
            link: info.link
        };
        return this._post('/cards', body);
    }

    deleteCard(id) {
        return this._delete('/cards/', id, '');
    }

    changeLikeStatus(id, isLiked) {
        if (isLiked) {
            return this._unlikeCard(id);
        } else {
            return this._likeCard(id);
        }
    }

    // Приватные методы для функционирования кнопки лайка (ранее были публичными)

    _likeCard(id) {
        return this._put('/cards/', id, '/likes');
    }

    _unlikeCard(id) {
        return this._delete('/cards/', id, '/likes');
    }
}

// Экземпляр API-класса
const api = new Api({
    // baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-35',
    baseUrl: 'https://api.ev-mesto.nomoredomains.xyz',
    // baseUrl: '',
    headers: {
        authorization: 'db30a410-2ab7-4138-8ef8-6a0a01ce5d6f',
        'Content-Type': 'application/json',
        // Дополнительный заголовок, без которого периодически возникают ошибки
        'Access-Control-Allow-Origin': '*',
    }
});

export default api;