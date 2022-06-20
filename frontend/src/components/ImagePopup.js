import React from "react";

function ImagePopup({card, onClose}) {

    return (
        <div className={`popup popup_type_show ${card ? 'popup_opened' : ''}`}>
            <div className="popup__container popup__container_type_show">
                <button className="popup__close-button" type="reset" onClick={onClose}></button>
                <img className="popup__image" src={card ? card.link : ''} alt={card ? card.name : ''} />
                <h3 className="popup__description">
                    {card ? card.name : ''}
                </h3>
            </div>
        </div>
    );
}

export default ImagePopup;