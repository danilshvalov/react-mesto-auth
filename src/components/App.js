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
  const [selectedCard, setSelectedCard] = React.useState();
  const [popupMessage, setPopupMessage] = React.useState();
  const [currentUser, setCurrentUser] = React.useState({
    name: "",
    about: "",
    avatar: "",
    _id: "",
  });
  const [currentTheme, setCurrentTheme] = React.useState("dark");
  const [cards, setCards] = React.useState([]);
  const [
    cardCandidateForDeletion,
    setCardCandidateForDeletion,
  ] = React.useState();

  document.addEventListener("DOMContentLoaded", () => {
    setDOMLoading(false);
  });
  // effects
  React.useEffect(() => {
    handleApiError(
      Promise.all([api.getUserInfo(), api.getInitialCards()]),
      (result) => {
        const [userInfo, initialCards] = result;
        setCurrentUser(userInfo);
        setCards(initialCards);
        setApiDataLoading(false);
      }
    );
  }, []);
  React.useEffect(() => {
    setIsAppLoading(isApiDataLoading || isDOMLoading);
  }, [isApiDataLoading, isDOMLoading]);

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

  return (
    <div style="background-color: white">
      <ThemeContext.Provider value={currentTheme}>
        <CurrentUserContext.Provider value={currentUser}>
          <Header onThemeSwitch={handleThemeSwitch} />
          {isAppLoading ? (
            <LoadingSpinner />
          ) : (
            <>
              <Register />
              <ProtectedRoute
                path="/"
                cards={cards}
                onEditProfile={handleEditProfileClick}
                onAddPlace={handleAddPlaceClick}
                onEditAvatar={handleEditAvatarClick}
                onCardClick={handleCardClick}
                onCardLike={handleCardLike}
                onCardDelete={handleCardDeleteClick}
                component={Main}
              />
            </>
          )}
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

          <Footer />
        </CurrentUserContext.Provider>
      </ThemeContext.Provider>
    </div>
  );
}

export default App;
