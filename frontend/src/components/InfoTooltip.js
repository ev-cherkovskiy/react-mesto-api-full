import React from "react";

function InfoTooltip({ isTypeSuccess, isOpened, onClose }) {

    return (
        <div className={`popup popup_type_info ${isOpened ? 'popup_opened' : ''}`}>
            <div className="popup__container">
                <button className="popup__close-button" type="reset" onClick={onClose}></button>
                <div className={`popup__info-image popup__info-image_type_${isTypeSuccess ? 'success' : 'error'}`}></div>
                <h2 className="popup__heading popup__heading_type_info">
                    {`${isTypeSuccess ? 'Вы успешно зарегистрировались!' : 'Что-то пошло не так! Попробуйте ещё раз.'}`}
                </h2>
            </div>
        </div>
    );
}

export default InfoTooltip;