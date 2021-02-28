import React from "react";
import CurrentUserContext from "../contexts/CurrentUserContext";
import ThemeContext from "../contexts/ThemeContext";
import { cardClassNames } from "../utils/constants";
import { addThemeAttrs } from "../utils/utils";
import PushButton from "./PushButton";

function Card({ card, onCardClick, onCardLike, onCardDelete }) {
  const currentUser = React.useContext(CurrentUserContext);
  const currentTheme = React.useContext(ThemeContext);

  // bool variables
  const isOwn = card.owner._id === currentUser._id;
  const isLiked = card.likes.some((user) => user._id === currentUser._id);

  // classes
  const deleteButtonClassName = `${addThemeAttrs({
    theme: currentTheme,
    classList: cardClassNames.deleteButton,
  })} ${isOwn ? "" : cardClassNames.deleteButtonHiddenClass}`;

  const likeButtonClassName = `${addThemeAttrs({
    theme: currentTheme,
    classList: cardClassNames.likeButton,
  })} ${isLiked ? cardClassNames.likeButtonActiveClass : ""}`;

  const elementClassName = addThemeAttrs({
    theme: currentTheme,
    classList: cardClassNames.element,
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

  const likeCountClassName = addThemeAttrs({
    theme: currentTheme,
    classList: cardClassNames.likeCount,
  });

  return (
    <article className={elementClassName}>
      <img
        className={cardClassNames.image}
        src={card.link}
        alt={card.name}
        onClick={handleClick}
      />
      <div className={cardClassNames.sideBar}>
        <h3 className={cardClassNames.title}>{card.name}</h3>
        <div className={cardClassNames.likeContainer}>
          <PushButton className={likeButtonClassName} onClick={handleLike} />
          <span className={likeCountClassName}>{card.likes.length}</span>
        </div>
        <PushButton className={deleteButtonClassName} onClick={handleDelete} />
      </div>
    </article>
  );
}

export default Card;
