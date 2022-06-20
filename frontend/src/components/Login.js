import React from "react";
import { withRouter, useHistory } from "react-router-dom";

function Login({ onSignIn, handleAuthorize, handleCheckToken }) {
    // Управляемые компоненты
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');

    // Обработчик обновления импута с названием
    function handleEmailChange(evt) {
        setEmail(evt.target.value);
    }

    // Обработчик обновления импута с описанием
    function handlePasswordChange(evt) {
        setPassword(evt.target.value);
    }

    // Используем историю
    const history = useHistory();

    // При монтировании компонента проверяем, есть ли в памяти токен, 
    // и переходим на главную страницу в случае его наличия
    React.useEffect(() => {
        handleCheckToken(history, onSignIn);
    }, [])

    // Обработчик сабмита формы входа на сайт
    function onSubmit(evt) {
        evt.preventDefault();
        handleAuthorize(email, password, history, onSignIn, setEmail, setPassword);
    }

    // Возвращаемая разметка
    return (
        <div className="auth-section">
            <h2 className="auth-section__header">
                Вход
            </h2>
            <form
                className="form form_type_login"
                name="form-login"
                method="post"
                onSubmit={onSubmit}
            >
                <input
                    className="form__input form__input_type_email form__input_dark"
                    id="login-email"
                    type="email"
                    name="login-email"
                    placeholder="Email"
                    minLength="2"
                    maxLength="40"
                    required
                    value={email || ''}
                    onChange={handleEmailChange}
                />
                <span className="login-email-error form__input-error"></span>
                <input
                    className="form__input form__input_type_password form__input_dark"
                    id="login-password"
                    type="password"
                    name="login-password"
                    placeholder="Пароль"
                    minLength="2"
                    maxLength="40"
                    required
                    value={password || ''}
                    onChange={handlePasswordChange}
                />
                <span className="login-password-error form__input-error"></span>
                <button className="form__submit-button form__submit-button_dark" type="submit">
                    Войти
                </button>
            </form>
        </div>
    )
}

export default withRouter(Login);