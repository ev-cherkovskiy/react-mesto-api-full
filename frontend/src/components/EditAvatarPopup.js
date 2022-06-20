import React from "react";
import PopupWithForm from "./PopupWithForm";

export default function EditAvatarPopup({ isOpened, onClose, onUpdateAvatar }) {
    // Создание рефа
    const avatarRef = React.useRef();

    // Состояние инпута
    const [link, setLink] = React.useState('');

    // Очищение инпута при открытии/закрытии попапа
    React.useEffect(() => {
        setLink('');
    }, [isOpened]);

    // Обработчик обновления импута со ссылкой
    function handleLinkChange(evt) {
        setLink(evt.target.value);
    }

    // Обработчик сабмита формы
    function handleSubmit(evt) {
        // Отмена стандартной отправки
        evt.preventDefault();
        // Вызов функции, обновляющей аватар
        onUpdateAvatar({ avatar: avatarRef.current.value });
    }

    // Возвращаемая разметка
    return (
        <PopupWithForm
            type="avatar"
            title="Обновить аватар"
            buttonText="Сохранить"
            isOpened={isOpened}
            onClose={onClose}
            onSubmit={handleSubmit}
        >
            <input
                className="form__input form__input_type_avatar"
                id="avatar-link"
                type="url"
                name="avatar-link"
                placeholder="Ссылка на аватар"
                required
                ref={avatarRef}
                value={link}
                onChange={handleLinkChange}
            />
            <span className="avatar-link-error form__input-error"></span>
        </PopupWithForm>
    );
}