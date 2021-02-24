import React from "react";
import PopupWithForm from "./PopupWithForm";
import SubmitButton from "./SubmitButton";

function ConfirmPopup({ onClose, isOpen, onCardDelete, card }) {
  // constants
  const popupSettings = {
    name: "confirm",
    title: "Вы уверены?",
  };
  const submitButtonSettings = {
    className: "form__submit-button",
    defaultText: "Да",
    loadingText: "Удаление...",
  };

  // states
  const [submitButtonText, setSubmitButtonText] = React.useState(
    submitButtonSettings.defaultText
  );

  // handlers
  const handleSubmit = (evt) => {
    evt.preventDefault();
    setSubmitButtonText(submitButtonSettings.loadingText);
    onCardDelete(card).finally(() => {
      setSubmitButtonText(submitButtonSettings.defaultText);
    });
  };
  return (
    <PopupWithForm
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      {...popupSettings}
      submitButton={
        <SubmitButton {...submitButtonSettings} text={submitButtonText} />
      }
    />
  );
}

export default ConfirmPopup;
