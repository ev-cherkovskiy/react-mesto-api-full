import React from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import Card from './Card';

function Main({ onEditAvatar, onEditProfile, onAddPlace, onCardClick, onDeleteCard, cards, onCardLike }) {
    // Подписка на контекст
    const currentUser = React.useContext(CurrentUserContext);

    // Возвращаемая разметка
    return (
        <main className="content">
            {/* Информация о профиле */}
            <section className="profile">
                <div className="profile__info">
                    <img className="profile__avatar" src={currentUser.avatar} alt="Аватар" />
                    <button className="profile__avatar-edit-button" type="button" onClick={onEditAvatar}></button>
                    <h1 className="profile__name">
                        {currentUser.name}
                    </h1>
                    <p className="profile__description">
                        {currentUser.about}
                    </p>
                    <button className="profile__edit-button" type="button" onClick={onEditProfile}></button>
                </div>
                <button className="profile__add-button" type="button" onClick={onAddPlace}></button>
            </section>
            {/* Секция с карточками */}
            <section className="photos">
                <ul className="photo-grid">
                    {!cards.length ? '' : cards.map(card => (
                        <Card
                            key={card._id}
                            cardData={card}
                            onCardClick={onCardClick}
                            onDeleteCard={onDeleteCard}
                            onCardLike={onCardLike}
                        />
                    ))}
                </ul>
            </section>
        </main>
    );
}

export default Main;