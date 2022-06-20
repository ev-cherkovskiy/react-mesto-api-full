import React from 'react';
import { Route, BrowserRouter, Switch } from 'react-router-dom';
import api from '../utils/Api';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import Header from './Header';
import Footer from './Footer';
import Main from './Main';
import Login from './Login';
import Register from './Register';
import ProtectedRoute from './ProtectedRoute';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import ImagePopup from './ImagePopup';
import InfoTooltip from './InfoTooltip';

import * as auth from '../utils/auth';

function App() {
  // Переменные состояния: текущий пользователь и массив карточек
  const [currentUser, setCurrentUser] = React.useState({});
  const [cards, setCards] = React.useState([]);
  // Переменные состояния попапов
  const [isPopupTypeEditOpened, setIsPopupTypeEditOpened] = React.useState(false);
  const [isPopupTypeAvatarOpened, setIsPopupTypeAvatarOpened] = React.useState(false);
  const [isPopupTypeAddOpened, setIsPopupTypeAddOpened] = React.useState(false);
  const [isPopupTypeInfoOpened, setIsPopupTypeInfoOpened] = React.useState(false);
  // Переменная состояния для выбранной карточки
  const [selectedCard, setSelectedCard] = React.useState(null);
  // Переменные состояния, использующиеся для реализации аутентификации
  const [loggedIn, setLoggedIn] = React.useState(false);
  const [email, setEmail] = React.useState('');
  // Переменная состояния, используемая для функционирования шапки
  const [pageState, setPageState] = React.useState('sign-up');
  // Переменная состояния с типом информационного попапа
  const [isInfoPopupTypeSuccess, setIsInfoPopupTypeSuccess] = React.useState(true);

  // Запрос данных о пользователе и массива карточек + их заполнение
  React.useEffect(() => {
    if (loggedIn) {
      Promise.all([api.getUserInfo(), api.getInitialCards()])
        .then(([userData, cardsArray]) => {
          setCurrentUser(userData);
          setCards(cardsArray);
        })
        .catch(err => {
          console.log(err);
        });
    }
  }, [loggedIn]);

  // Функция, заполняющая обновлённые данные пользователя
  function handleUpdateUser(userData) {
    api.changeUserInfo(userData)
      .then(userData => {
        setCurrentUser(userData);
        // Закрытие попапа
        closeAllPopups();
      })
      .catch(err => {
        console.log(err);
      });
  }

  // Функция, заполняющая обновлённый аватар
  function handleUpdateAvatar(userData) {
    api.changeAvatar(userData)
      .then(userData => {
        setCurrentUser(userData);
        // Закрытие попапа
        closeAllPopups();
      })
      .catch(err => {
        console.log(err);
      });
  }

  // Функция, обрабатывающая нажатие на лайк
  function handleCardLike(card) {
    // Переменная, показывающая, лайкнута ли карточка пользователем
    const isLikedByCurrentUser = card.likes.some(like => (like._id === currentUser._id));
    // Запрос на изменение статуса лайка
    api.changeLikeStatus(card._id, isLikedByCurrentUser)
      .then(newCard => {
        const newCards = cards.map(item => item._id === card._id ? newCard : item);
        setCards(newCards);
      })
      .catch(err => {
        console.log(err);
      });
  }

  // Функция, вызываемая при сабмите формы с данными новой карточки
  function handleAddPlaceSubmit(cardData) {
    // Запрос на добавление карточки + обновление массива на странце
    api.addCard(cardData)
      .then(newCard => {
        setCards([...cards, newCard]);
        // Закрытие попапа
        closeAllPopups();
      })
      .catch(err => {
        console.log(err);
      });
  }

  // Функция, обрабатывающая удаление карточки
  function handleCardDelete(card) {
    // Запрос на удаление карточки + обновление массива на странце
    api.deleteCard(card._id)
      .then(() => {
        setCards(cards => cards.filter(item => item._id !== card._id))
      })
  }

  // Обработчики нажатия на все кнопки, которые видны на странице сразу
  function handleEditAvatarClick() {
    setIsPopupTypeAvatarOpened(true);
  }
  function handleEditProfileClick() {
    setIsPopupTypeEditOpened(true);
  }
  function handleAddPlaceClick() {
    setIsPopupTypeAddOpened(true);
  }

  // Обработчик показа информационного попапа
  function handleInfoPopupOpen() {
    setIsPopupTypeInfoOpened(true);
  }

  // Обработчик нажатия на карточку
  function handleCardClick(clickedCard) {
    setSelectedCard(clickedCard);
  }

  // Обработчик нажатия на кнопку закрытия любого попапа
  function closeAllPopups() {
    setIsPopupTypeAvatarOpened(false);
    setIsPopupTypeEditOpened(false);
    setIsPopupTypeAddOpened(false);
    setIsPopupTypeInfoOpened(false);
    setSelectedCard(null);
  }

  // Функция входа в систему
  function handleLoggingIn(data) {
    setLoggedIn(true);
    setEmail(data.email);
    setPageState('main');
  }

  // Функция выхода из системы
  function handleLoggingOut() {
    setLoggedIn(false);
    localStorage.removeItem('token');
  }

  // Обработчик смены состояния страницы для функционирования шапки
  function handlePageStateChange() {
    if (pageState === 'sign-in') {
      setPageState('sign-up');
    } else {
      setPageState('sign-in');
    }
  }

  // Обработчик смены типа информационного попапа
  function handleInfoPopupTypeChange(success) {
    if (success) {
      setIsInfoPopupTypeSuccess(true)
    } else {
      setIsInfoPopupTypeSuccess(false)
    }
  }

  // Обработчик авторизации
  function handleAuthorize(email, password, history, onSignIn, setEmail, setPassword) {
    auth.authorize(email, password)
      .then(res => {
        //console.log('TOKEN: ' + res.token);
        if (res.token) {
          localStorage.setItem('token', res.token);
          auth.checkToken(res.token)
            .then(res => {
              onSignIn(res.data);
              history.push('/');
              // Очищаем поля формы
              setEmail('');
              setPassword('');
            });
        } else {
          // Выводим попап с оповещением об ошибке
          handleInfoPopupTypeChange(false);
          handleInfoPopupOpen();
        }
      })
      .catch((err) => console.log(err));
  }

  // Обработчик, проверяющий токен
  function handleCheckToken(history, onSignIn) {
    auth.checkToken(localStorage.getItem('token'))
      .then(res => {
        if (res.data) {
          onSignIn(res.data);
          history.push('/');
        }
      })
      .catch((err) => console.log(err));
  }

  // Обработчик регистрации
  function handleRegister(email, password, history, showInfoPopup, setEmail, setPassword) {
    auth.register(email, password)
      .then((res) => {
        // Если ответ содержит объект data, то регистрация прошла успешно 
        // и можно переадрессовывать на страницу входа. 
        // Во всех иных случаях возникла ошибка
        if (res.data) {
          history.push('/sign-in');
          showInfoPopup(true);
          // Очищаем поля формы
          setEmail('');
          setPassword('');
        } else {
          showInfoPopup(false);
        }
      })
      .catch((err) => console.log(err));
  }

  // Возвращаемая разметка
  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">

        <BrowserRouter>
          <Header
            loggedIn={loggedIn}
            email={email}
            pageState={pageState}
            handlePageStateChange={handlePageStateChange}
            handleLoggingOut={handleLoggingOut}
          />
          <Switch>
            <ProtectedRoute
              exact path="/"
              component={Main}
              onEditProfile={handleEditProfileClick}
              onAddPlace={handleAddPlaceClick}
              onEditAvatar={handleEditAvatarClick}
              onDeleteCard={handleCardDelete}
              onCardClick={handleCardClick}
              cards={cards}
              onCardLike={handleCardLike}
              loggedIn={loggedIn}
            >
            </ProtectedRoute>
            <Route path="/sign-in">
              <Login
                onSignIn={handleLoggingIn}
                handleAuthorize={handleAuthorize}
                handleCheckToken={handleCheckToken}
              />
            </Route>
            <Route path="/sign-up">
              <Register
                handlePageStateChange={handlePageStateChange}
                handleInfoPopupTypeChange={handleInfoPopupTypeChange}
                handleInfoPopupOpen={handleInfoPopupOpen}
                handleRegister={handleRegister}
              />
            </Route>
          </Switch>
        </BrowserRouter>

        <Footer />
        <EditProfilePopup
          isOpened={isPopupTypeEditOpened}
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser}
        ></EditProfilePopup>
        <EditAvatarPopup
          isOpened={isPopupTypeAvatarOpened}
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar}
        ></EditAvatarPopup>
        <AddPlacePopup
          isOpened={isPopupTypeAddOpened}
          onClose={closeAllPopups}
          onAddPlace={handleAddPlaceSubmit}
        ></AddPlacePopup>
        <ImagePopup card={selectedCard} onClose={closeAllPopups} />
        <InfoTooltip
          isOpened={isPopupTypeInfoOpened}
          onClose={closeAllPopups}
          isTypeSuccess={isInfoPopupTypeSuccess}
        />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
