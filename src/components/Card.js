import React from "react";
import CurrentUserContext from "../contexts/CurrentUserContext";
import ThemeContext from "../contexts/ThemeContext";
import { addThemeAttrs } from "../utils/utils";
import PushButton from "./PushButton";

function Card({ card, onCardClick, onCardLike, onCardDelete }) {
  const currentUser = React.useContext(CurrentUserContext);
  const currentTheme = React.useContext(ThemeContext);

  // bool variables
  const isOwn = card.owner._id === currentUser._id;
  const isLiked = card.likes.some((user) => user._id === currentUser._id);

  // className variables
  const defaultDeleteButtonClass =
    "button delete-button element__delete-button";
  const defaultLikeButtonClass = "button like-button element__like-button";
  const activeLikeButtonClass = "like-button_active";

  const cardDeleteButtonClassName = `${addThemeAttrs({
    theme: currentTheme,
    classList: defaultDeleteButtonClass,
  })} ${isOwn ? "" : "delete-button_hidden"}`;

  const cardLikeButtonClassName = `${addThemeAttrs({
    theme: currentTheme,
    classList: defaultLikeButtonClass,
  })} ${isLiked ? activeLikeButtonClass : ""}`;

  const defaultElementClass = "element";
  const elementClassName = addThemeAttrs({
    theme: currentTheme,
    classList: defaultElementClass,
  });

  // handlers
  const handleClick = () => {
    onCardClick(card);
  };

  const handleLike = () => {
    onCardLike(card);
  };

  const handleDelete = () => {
    onCardDelete(card);
  };

  return (
    <article className={elementClassName}>
      <img
        className="element__image"
        src={card.link}
        alt={card.name}
        onClick={handleClick}
      />
      <div className="element__sidebar">
        <h3 className="element__title">{card.name}</h3>
        <div className="element__like-container">
          <PushButton
            className={cardLikeButtonClassName}
            onClick={handleLike}
            type="button"
          />
          <span className="element__like-count">{card.likes.length}</span>
        </div>
        <PushButton
          className={cardDeleteButtonClassName}
          onClick={handleDelete}
          type="button"
        />
      </div>
    </article>
  );
}

export default Card;
