import React from "react";
import Field from "./Field";
import PopupWithForm from "./PopupWithForm";
import SubmitButton from "./SubmitButton";

function AddPlacePopup({ onClose, isOpen, onAddPlace }) {
  // constants
  const popupSettings = {
    name: "add-element",
    title: "Новое место",
  };
  const submitButtonSettings = {
    defaultText: "Добавить",
    loadingText: "Добавляем...",
    className: "form__submit-button",
  };
  const titleInputSettings = {
    name: "title",
    type: "text",
    defaultValue: "",
    placeholder: "Название",
    minLength: "2",
    maxLength: "30",
    required: true,
  };
  const linkInputSettings = {
    name: "link",
    type: "url",
    defaultValue: "",
    placeholder: "Ссылка на картинку",
    required: true,
  };

  // states
  const [titleInput, setTitleInput] = React.useState({
    value: "",
    isValid: false,
  });
  const [linkInput, setLinkInput] = React.useState({
    value: "",
    isValid: false,
  });
  const [isValid, setValid] = React.useState(false);
  const [submitButtonText, setSubmitButtonText] = React.useState(
    submitButtonSettings.defaultText
  );

  // effects
  React.useEffect(() => {
    const inputs = [titleInput, linkInput];
    setValid(inputs.every(({ isValid }) => isValid));
  }, [titleInput, linkInput]);

  // handlers
  const handleSubmit = (evt) => {
    evt.preventDefault();
    if (isValid) {
      setSubmitButtonText(submitButtonSettings.loadingText);
      onAddPlace({ name: titleInput.value, link: linkInput.value }).finally(
        () => {
          setSubmitButtonText(submitButtonSettings.defaultText);
        }
      );
    }
  };

  return (
    <PopupWithForm
      onClose={onClose}
      isOpen={isOpen}
      onSubmit={handleSubmit}
      {...popupSettings}
      submitButton={
        <SubmitButton
          {...submitButtonSettings}
          isEnabled={isValid}
          text={submitButtonText}
        />
      }
    >
      <fieldset className="fieldset form__add-element-fieldset">
        <Field
          {...titleInputSettings}
          onInput={setTitleInput}
          isVisible={isOpen}
        />
        <Field
          {...linkInputSettings}
          onInput={setLinkInput}
          isVisible={isOpen}
        />
      </fieldset>
    </PopupWithForm>
  );
}

export default AddPlacePopup;
