import React from "react";
import api from "../utils/api";
import Footer from "./Footer";
import Header from "./Header";
import ImagePopup from "./ImagePopup";
import Main from "./Main";
import MessagePopup from "./MessagePopup";
import EditProfilePopup from "./EditProfilePopup";
import AddPlacePopup from "./AddPlacePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import CurrentUserContext from "../contexts/CurrentUserContext";
import LoadingSpinner from "./LoadingSpinner";
import ConfirmPopup from "./ConfirmPopup";
import Register from "./Register";
import ProtectedRoute from "./ProtectedRoute";
import ThemeContext from "../contexts/ThemeContext";
import { addThemeAttrs } from "../utils/utils";
import * as theme from "../utils/theme";
import auth from "../utils/auth";
import Login from "./Login";
import { Route, Switch, useHistory } from "react-router-dom";
import InfoTooltip from "./InfoTooltip";

function App() {
  // states
  const [isAppLoading, setIsAppLoading] = React.useState(true);
  const [isDOMLoading, setDOMLoading] = React.useState(true);
  const [isApiDataLoading, setApiDataLoading] = React.useState(true);
  const [isEditProfilePopupOpen, setEditProfilePopupOpen] = React.useState(
    false
  );
  const [isAddPlacePopupOpen, setAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setEditAvatarPopupOpen] = React.useState(false);
  const [isConfirmPopupOpen, setConfirmPopupOpen] = React.useState(false);
  const [isMessagePopupOpen, setMessagePopupOpen] = React.useState(false);
  const [isImagePopupOpen, setImagePopupOpen] = React.useState(false);
  const [isInfoTooltipPopupOpen, setInfoTooltipPopupOpen] = React.useState(
    false
  );
  const [selectedCard, setSelectedCard] = React.useState();
  const [popupMessage, setPopupMessage] = React.useState("");
  const [infoTooltipData, setInfoTooltipData] = React.useState({
    message: "",
    redirectPath: "",
  });
  const [isActionSuccess, setActionSuccess] = React.useState(false);
  const [currentUser, setCurrentUser] = React.useState({
    email: "",
    name: "",
    about: "",
    avatar: "",
    _id: "",
  });
  const [currentTheme, setCurrentTheme] = React.useState(theme.getUserTheme());
  const [cards, setCards] = React.useState([]);
  const [
    cardCandidateForDeletion,
    setCardCandidateForDeletion,
  ] = React.useState();
  const [isLoggedIn, setLoggedIn] = React.useState(false);
  const history = useHistory();

  document.addEventListener("DOMContentLoaded", () => {
    setDOMLoading(false);
  });
  // effects
  React.useEffect(() => {
    handleTokenCheck();
  }, []);

  React.useEffect(() => {
    if (isLoggedIn) {
      handleApiError(
        Promise.all([api.getUserInfo(), api.getInitialCards()]),
        (result) => {
          const [userInfo, initialCards] = result;
          setCurrentUser(userInfo);
          setCards(initialCards);
          setApiDataLoading(false);
        }
      );
    } else {
      setApiDataLoading(false);
    }
  }, [isLoggedIn]);

  React.useEffect(() => {
    setIsAppLoading(isApiDataLoading || isDOMLoading);
  }, [isApiDataLoading, isDOMLoading]);

  React.useEffect(() => {
    theme.updateUserTheme(currentTheme);
  }, [currentTheme]);

  // functions
  const closeMessagePopup = () => {
    setMessagePopupOpen(false);
  };

  const closeAllPopups = () => {
    setEditAvatarPopupOpen(false);
    setEditProfilePopupOpen(false);
    setAddPlacePopupOpen(false);
    setConfirmPopupOpen(false);
    setImagePopupOpen(false);
  };

  const updateToken = (data) => {
    localStorage.setItem("jwt", data.token);
  };

  const openInfoTooltip = ({ message, redirectPath, isSuccess }) => {
    setActionSuccess(isSuccess);
    setInfoTooltipData({ message, redirectPath });
    setInfoTooltipPopupOpen(true);
  };

  // handlers
  const handleApiError = (promise, callback) => {
    return promise
      .then((data) => callback(data))
      .catch((error) => {
        if (error instanceof TypeError) {
          setPopupMessage(
            "Потеряно соединение с сервером, повторите попытку позднее"
          );
        } else if (typeof error === "string") {
          setPopupMessage(error);
        } else {
          setPopupMessage("Непредвиденная ошибка, повторите попытку позднее");
        }
        setMessagePopupOpen(true);
      });
  };
  const handleUpdateUser = (data) => {
    return handleApiError(api.setUserInfo(data), (userInfo) => {
      setCurrentUser(userInfo);
      setEditProfilePopupOpen(false);
    });
  };
  const handleAddPlace = (data) => {
    return handleApiError(api.addPlace(data), (newCard) => {
      setCards([newCard, ...cards]);
      setAddPlacePopupOpen(false);
    });
  };
  const handleUpdateAvatar = (data) => {
    return handleApiError(api.changeAvatar(data.avatar), ({ avatar }) => {
      currentUser.avatar = avatar;
      setEditAvatarPopupOpen(false);
    });
  };
  const handleInfoTooltipPopupClose = (redirectPath) => {
    setInfoTooltipPopupOpen(false);
    if (redirectPath) {
      history.push(redirectPath);
    }
  };

  // button-handlers
  const handleEditAvatarClick = () => {
    setEditAvatarPopupOpen(true);
  };
  const handleEditProfileClick = () => {
    setEditProfilePopupOpen(true);
  };
  const handleAddPlaceClick = () => {
    setAddPlacePopupOpen(true);
  };
  const handleThemeSwitch = () => {
    if (currentTheme === "dark") {
      setCurrentTheme("light");
    } else {
      setCurrentTheme("dark");
    }
  };
  // ---------------------------------------------------------------

  // auth-handlers
  const handleLogin = (data) => {
    auth
      .authorize(data)
      .then((res) => {
        updateToken(res);
        setLoggedIn(true);
        setCurrentUser({ ...currentUser, email: data.email });
        openInfoTooltip({
          message: "успех",
          redirectPath: "/",
          isSuccess: true,
        });
      })
      .catch((errorMessage) => {
        openInfoTooltip({ message: errorMessage, isSuccess: false });
      });
  };

  const handleRegister = (data) => {
    auth
      .register(data)
      .then((res) => {
        updateToken(res);
        openInfoTooltip({
          message: "успех",
          redirectPath: "/sign-in",
          isSuccess: true,
        });
      })
      .catch((errorMessage) => {
        setActionSuccess(false);
        openInfoTooltip({
          message: "успех",
          isSuccess: false,
        });
      });
  };

  const handleTokenCheck = () => {
    const jwt = localStorage.getItem("jwt");
    if (jwt) {
      auth.checkToken(jwt).then((res) => {
        setLoggedIn(true);
        api.setAuthToken(jwt);
        setCurrentUser({ email: res.email, _id: res._id });
        history.push("/");
      });
    } else {
      setLoggedIn(false);
    }
  };

  const handleSignOut = () => {
    localStorage.removeItem("jwt");
    setLoggedIn(false);
    history.push("/sign-in");
  };

  // ---------------------------------------------------------------

  // card-handlers
  const handleCardClick = (card) => {
    setSelectedCard(card);
    setImagePopupOpen(true);
  };
  const handleCardLike = (card) => {
    const isLiked = card.likes.some((user) => user._id === currentUser._id);
    handleApiError(api.changeLikeCardStatus(card._id, !isLiked), (newCard) => {
      setCards(
        cards.map((oldCard) => (oldCard._id === card._id ? newCard : oldCard))
      );
    });
  };
  const handleCardDeleteClick = (card) => {
    setCardCandidateForDeletion(card);
    setConfirmPopupOpen(true);
  };
  const handleCardDelete = (card) => {
    return handleApiError(api.deleteCard(card._id), () => {
      setCards(cards.filter((oldCard) => oldCard._id !== card._id));
      setConfirmPopupOpen(false);
    });
  };
  // ---------------------------------------------------------------

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <ThemeContext.Provider value={currentTheme}>
        <div
          className={addThemeAttrs({ theme: currentTheme, classList: "page" })}
        >
          <Header onThemeSwitch={handleThemeSwitch} onSignOut={handleSignOut} />
          {isAppLoading ? (
            <LoadingSpinner />
          ) : (
            <>
              <Switch>
                <ProtectedRoute
                  exact
                  path="/"
                  loggedIn={isLoggedIn}
                  cards={cards}
                  onEditProfile={handleEditProfileClick}
                  onAddPlace={handleAddPlaceClick}
                  onEditAvatar={handleEditAvatarClick}
                  onCardClick={handleCardClick}
                  onCardLike={handleCardLike}
                  onCardDelete={handleCardDeleteClick}
                  component={Main}
                />
                <Route path="/sign-in">
                  <Login onLogin={handleLogin} />
                </Route>
                <Route path="/sign-up">
                  <Register onRegister={handleRegister} />
                </Route>
              </Switch>
              <Footer />

              <EditProfilePopup
                isOpen={isEditProfilePopupOpen}
                onClose={closeAllPopups}
                onUpdateUser={handleUpdateUser}
              />
              <AddPlacePopup
                isOpen={isAddPlacePopupOpen}
                onClose={closeAllPopups}
                onAddPlace={handleAddPlace}
              />
              <EditAvatarPopup
                isOpen={isEditAvatarPopupOpen}
                onClose={closeAllPopups}
                onUpdateAvatar={handleUpdateAvatar}
              />
              <ImagePopup
                {...selectedCard}
                isOpen={isImagePopupOpen}
                onClose={closeAllPopups}
              />
              <MessagePopup
                isOpen={isMessagePopupOpen}
                onClose={closeMessagePopup}
                message={popupMessage}
              />
              <ConfirmPopup
                card={cardCandidateForDeletion}
                onCardDelete={handleCardDelete}
                isOpen={isConfirmPopupOpen}
                onClose={closeAllPopups}
              />
              <InfoTooltip
                isOpen={isInfoTooltipPopupOpen}
                onClose={handleInfoTooltipPopupClose}
                message={infoTooltipData.message}
                redirectPath={infoTooltipData.redirectPath}
                isSuccess={isActionSuccess}
              />
            </>
          )}
        </div>
      </ThemeContext.Provider>
    </CurrentUserContext.Provider>
  );
}

export default App;
