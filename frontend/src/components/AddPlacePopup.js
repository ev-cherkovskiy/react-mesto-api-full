import React from "react";
import PopupWithForm from "./PopupWithForm";

export default function AddPlacePopup({ isOpened, onClose, onAddPlace }) {
    // Управляемые компоненты
    const [name, setName] = React.useState('');
    const [link, setLink] = React.useState('');

    // Очищение полей при открытии/закрытии попапа
    React.useEffect(() => {
        setName('');
        setLink('');
    }, [isOpened]);

    // Обработчик обновления импута с названием
    function handleNameChange(evt) {
        setName(evt.target.value);
    }

    // Обработчик обновления импута со ссылкой
    function handleLinkChange(evt) {
        setLink(evt.target.value);
    }

    // Обработчик сабмита формы
    function handleSubmit(evt) {
        // Отмена стандартной отправки
        evt.preventDefault();
        // Вызов функции, добавляющей карточку с данными параметрами
        onAddPlace({ name: name, link: link });
    }

    // Возвращаемая разметка
    return (
        <PopupWithForm
            type="add"
            title="Новое место"
            buttonText="Создать"
            isOpened={isOpened}
            onClose={onClose}
            onSubmit={handleSubmit}
        >
            <input
                className="form__input form__input_type_place-name"
                id="place-name"
                type="text"
                name="place-name"
                placeholder="Название"
                minLength="2"
                maxLength="30"
                required
                value={name}
                onChange={handleNameChange}
            />
            <span className="place-name-error form__input-error"></span>
            <input
                className="form__input form__input_type_place-link"
                id="place-link"
                type="url"
                name="place-link"
                placeholder="Ссылка на картинку"
                required
                value={link}
                onChange={handleLinkChange}
            />
            <span className="place-link-error form__input-error"></span>
        </PopupWithForm>
    );
}