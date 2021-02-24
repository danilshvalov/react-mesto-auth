import React from "react";
import defaultAvatar from "../images/avatar.svg";
import Card from "./Card";
import CurrentUserContext from "../contexts/CurrentUserContext";

function Main({
  cards,
  onEditAvatar,
  onAddPlace,
  onCardClick,
  onCardLike,
  onCardDelete,
  onEditProfile,
}) {
  // contexts
  const currentUser = React.useContext(CurrentUserContext);

  return (
    <main className="content">
      <section className="profile">
        <div className="profile__image-container">
          <img
            className="profile__avatar"
            src={currentUser.avatar || defaultAvatar}
            alt="Аватар пользователя"
          />
          <button
            className="button profile__edit-avatar-button"
            onClick={onEditAvatar}
          />
        </div>
        <div className="profile__text">
          <div className="profile__name-container">
            <h1 className="profile__name">{currentUser.name}</h1>
            <button
              className="button button_type_edit profile__edit-button"
              onClick={onEditProfile}
              type="button"
            />
          </div>
          <p className="profile__about">{currentUser.about}</p>
        </div>
        <button
          className="button button_type_add profile__add-button"
          onClick={onAddPlace}
          type="button"
        />
      </section>

      <section className="elements">
        {cards.map((data) => {
          return (
            <Card
              card={data}
              key={data._id}
              onCardLike={onCardLike}
              onCardClick={onCardClick}
              onCardDelete={onCardDelete}
            />
          );
        })}
      </section>
    </main>
  );
}

export default Main;
