import React from "react";
import Field from "./Field";
import PopupWithForm from "./PopupWithForm";
import SubmitButton from "./SubmitButton";

function EditAvatarPopup({ onClose, isOpen, onUpdateAvatar }) {
  // constants
  const popupSettings = {
    name: "change-avatar",
    title: "Обновить аватар",
  };
  const submitButtonSettings = {
    defaultText: "Сохранить",
    loadingText: "Сохранение...",
    className: "form__submit-button",
  };
  const avatarInputSettings = {
    name: "avatar",
    type: "url",
    defaultValue: "",
    placeholder: "Ссылка на картинку",
    required: true,
  };

  // states
  const [avatarInput, setAvatarInput] = React.useState({
    value: "",
    isValid: false,
  });
  const [isValid, setValid] = React.useState(false);
  const [submitButtonText, setSubmitButtonText] = React.useState(
    submitButtonSettings.defaultText
  );

  // effects
  React.useEffect(() => {
    setValid(avatarInput.isValid);
  }, [avatarInput]);

  // handlers
  const handleSubmit = (evt) => {
    evt.preventDefault();
    if (isValid) {
      setSubmitButtonText(submitButtonSettings.loadingText);
      onUpdateAvatar({ avatar: avatarInput.value }).finally(() => {
        setSubmitButtonText(submitButtonSettings.defaultText);
      });
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
      <fieldset className="fieldset form__change-avatar-fieldset">
          <Field
            {...avatarInputSettings}
            onInput={setAvatarInput}
            isVisible={isOpen}
          />
      </fieldset>
    </PopupWithForm>
  );
}

export default EditAvatarPopup;
