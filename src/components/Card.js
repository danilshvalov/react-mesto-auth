import React from "react";
import CurrentUserContext from "../contexts/CurrentUserContext";

function Card({ card, onCardClick, onCardLike, onCardDelete }) {
  const currentUser = React.useContext(CurrentUserContext);

  // bool variables
  const isOwn = card.owner._id === currentUser._id;
  const isLiked = card.likes.some((user) => user._id === currentUser._id);

  // className variables
  const cardDeleteButtonClassName = `button button_type_delete element__delete-button ${
    isOwn ? "button_visible" : "button_hidden"
  }`;
  const cardLikeButtonClassName = `button button_type_like element__like-button ${
    isLiked ? "button_like-active" : ""
  }`;

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
    <article className="element">
      <img
        className="element__image"
        src={card.link}
        alt={card.name}
        onClick={handleClick}
      />
      <div className="element__sidebar">
        <h3 className="element__title">{card.name}</h3>
        <div className="element__like-container">
          <button
            className={cardLikeButtonClassName}
            onClick={handleLike}
            type="button"
          />
          <span className="element__like-count">{card.likes.length}</span>
        </div>
        <button
          className={cardDeleteButtonClassName}
          onClick={handleDelete}
          type="button"
        />
      </div>
    </article>
  );
}

export default Card;
