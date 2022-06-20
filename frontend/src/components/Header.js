import logo from '../images/logo.svg';
import React from "react";
import { withRouter, useHistory, Route} from 'react-router-dom';

function Header({ loggedIn, email, pageState, handlePageStateChange, handleLoggingOut }) {
    // Используем историю
    const history = useHistory();

    // Обработчик переадрессации. Куда должна пройти переадрессация, зависит от состояния страницы
    const handleRedirection = () => {
        switch (pageState) {
            case 'sign-in':
                history.push('/sign-up');
                break;
            case 'sign-up':
                history.push('/sign-in');
                break;
            case 'main':
                history.push('/sign-up');
                handleLoggingOut();
                break;
        }
        handlePageStateChange();
    }

    // Возвращаемая разметка
    return (
        <header className="header">
            <img className="header__logo" src={logo} alt="Логотип проекта" />
            <div className="header__nav">
                {loggedIn &&
                    <p className="header__nav-email">
                        {email}
                    </p>}
                <button className="header__nav-button" type="button" onClick={handleRedirection}>
                    <Route path='/sign-up'>
                        <p>Войти</p>
                    </Route>
                    <Route path='/sign-in'>
                        <p>Зарегистрироваться</p>
                    </Route>
                    <Route exact path='/'>
                        <p>Выйти</p>
                    </Route>
                </button>
            </div>
        </header>
    );
}

export default withRouter(Header);