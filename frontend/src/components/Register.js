import React from "react";
import { useHistory, withRouter } from "react-router-dom";

function Register({ handlePageStateChange, handleInfoPopupTypeChange, handleInfoPopupOpen, handleRegister }) {
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

    // Обработчик, открывающий попап с информацией
    const showInfoPopup = (isSuccess) => {
        handleInfoPopupTypeChange(isSuccess);
        handleInfoPopupOpen();
    }

    // Обработчик сабмита регистрационной формы
    function onSubmit(evt) {
        evt.preventDefault();
        handleRegister(email, password, history, showInfoPopup, setEmail, setPassword)
    }

    // Обработчик переадрессации для кнопки "Войти" под кнопкой сабмита формы
    const handleRedirection = () => {
        handlePageStateChange();
        history.push('/sign-in');
    }

    // Возвращаемая разметка
    return (
        <div className="auth-section">
            <h2 className="auth-section__header">
                Регистрация
            </h2>
            <form
                className="form form_type_register"
                name="form-register"
                method="post"
                onSubmit={onSubmit}
            >
                <input
                    className="form__input form__input_type_email form__input_dark"
                    id="register-email"
                    type="email"
                    name="register-email"
                    placeholder="Email"
                    minLength="2"
                    maxLength="40"
                    required
                    value={email || ''}
                    onChange={handleEmailChange}
                />
                <span className="register-email-error form__input-error"></span>
                <input
                    className="form__input form__input_type_password form__input_dark"
                    id="register-password"
                    type="password"
                    name="register-password"
                    placeholder="Пароль"
                    minLength="2"
                    maxLength="40"
                    required
                    value={password || ''}
                    onChange={handlePasswordChange}
                />
                <span className="register-password-error form__input-error"></span>
                <button className="form__submit-button form__submit-button_dark" type="submit">
                    Зарегистрироваться
                </button>
            </form>

            <div className="auth-section__caption">
                <p className="auth-section__caption-text">
                    Уже зарегистрированы?&nbsp;
                </p>
                <button className="auth-section__caption-button" type="button" onClick={handleRedirection}>
                    Войти
                </button>
            </div>
        </div>
    )
}

export default withRouter(Register);