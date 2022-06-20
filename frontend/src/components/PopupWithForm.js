import React from 'react';

function PopupWithForm({ type, title, buttonText, isOpened, onClose, onSubmit, children }) {

    return (
        <div className={`popup popup_type_${type} ${isOpened ? 'popup_opened' : ''}`}>
            <div className="popup__container">
                <button className="popup__close-button" type="reset" onClick={onClose}></button>
                <h2 className="popup__heading">
                    {title}
                </h2>
                <form
                    className={`form form_type_${type}`}
                    name={`form-${type}`}
                    method="post"
                    noValidate
                    onSubmit={onSubmit}
                >
                    {children}
                    <button className="form__submit-button" type="submit">
                        {buttonText}
                    </button>
                </form>
            </div>
        </div>
    );
}

export default PopupWithForm;