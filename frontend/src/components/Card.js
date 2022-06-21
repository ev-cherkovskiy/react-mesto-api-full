import React from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function Card({ cardData, onCardClick, onDeleteCard, onCardLike }) {
    // Подписка на контекст
    const currentUser = React.useContext(CurrentUserContext);

    // Логические переменные, показывающие, создана и лайкнута ли карточка данным пользователем
    const isCreatedByCurrentUser = (cardData.owner === currentUser._id);
    const isLikedByCurrentUser = !cardData.likes ? false : cardData.likes.some(like => (like === currentUser._id));

    // Обработчик нажатия на кнопку лайка
    function handleLikeClick() {
        onCardLike(cardData);
    }

    // Обработчик нажатия на кнопку удаления
    function handleDeleteClick() {
        onDeleteCard(cardData);
    }

    // Обработчик нажатия на карточку (картинку)
    function handleClick() {
        onCardClick(cardData);
    }

    // Возвращаемая разметка
    return (
        <li className="photo-grid__item">
            <div
                className={`photo-grid__delete-button ${isCreatedByCurrentUser ? '' : 'photo-grid__delete-button_invisible'}`}
                onClick={handleDeleteClick}>
            </div>
            <img
                className="photo-grid__img"
                src={cardData.link}
                alt={cardData.name}
                onClick={handleClick}
            />
            <div className="photo-grid__caption">
                <h2 className="photo-grid__caption-text">
                    {cardData.name}
                </h2>
                <button
                    className={`photo-grid__like-button ${isLikedByCurrentUser ? 'photo-grid__like-button_active' : ''}`}
                    type="button"
                    onClick={handleLikeClick}>
                </button>
                <p className="photo-grid__likes-counter">
                    {!cardData.likes ? 0 : cardData.likes.length}
                </p>
            </div>
        </li>
    );
}

export default Card;