import { BASE_URL } from "./constants";

// В этом файле три функции, используемые для аутентификации

// Функция для регистрации
export const register = (email, password) => {
    return fetch(`${BASE_URL}/signup`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
    })
        .then((response) => {
            return response.json();
        })
        .catch((err) => console.log(err));
}

// Функция для авторизации
export const authorize = (email, password) => {
    return fetch(`${BASE_URL}/signin`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
        },
        body: JSON.stringify({ email, password })
    })
        .then((response) => {
            return response.json();
        })
        .catch((err) => console.log(err));
}

// Функция для проверки токена
export const checkToken = (token) => {
    return fetch(`${BASE_URL}/users/me`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
            'Access-Control-Allow-Origin': '*'
        }
    })
        .then((response) => {
            return response.json();
        })
        .catch((err) => console.log(err));
}