import React from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import PopupWithForm from "./PopupWithForm";

export default function EditProfilePopup({ isOpened, onClose, onUpdateUser }) {
    // Управляемые компоненты
    const [name, setName] = React.useState('');
    const [description, setDescription] = React.useState('');

    // Обработчик обновления импута с названием
    function handleNameChange(evt) {
        setName(evt.target.value);
    }

    // Обработчик обновления импута с описанием
    function handleDescriptionChange(evt) {
        setDescription(evt.target.value);
    }

    // Подписка на контекст
    const currentUser = React.useContext(CurrentUserContext);

    // Заполнение полей данными профиля
    React.useEffect(() => {
        setName(currentUser.name);
        setDescription(currentUser.about);
    }, [currentUser, isOpened]);

    // Обработчик сабмита формы
    function handleSubmit(evt) {
        // Отмена стандартной отправки
        evt.preventDefault();
        // Вызов функции, обновляющей данный пользователя
        onUpdateUser({ name: name, about: description });
    }

    // Возвращаемая разметка
    return (
        <PopupWithForm
            type="edit"
            title="Редактировать профиль"
            buttonText="Сохранить"
            isOpened={isOpened}
            onClose={onClose}
            onSubmit={handleSubmit}
        >
            <input
                className="form__input form__input_type_name"
                id="profile-name"
                type="text"
                name="profile-name"
                placeholder="Имя пользователя"
                minLength="2"
                maxLength="40"
                required
                value={name || ''}
                onChange={handleNameChange}
            />
            <span className="profile-name-error form__input-error"></span>
            <input
                className="form__input form__input_type_description"
                id="profile-job"
                type="text"
                name="profile-job"
                placeholder="Описание"
                minLength="2"
                maxLength="200"
                required
                value={description || ''}
                onChange={handleDescriptionChange}
            />
            <span className="profile-job-error form__input-error"></span>
        </PopupWithForm>
    );
}