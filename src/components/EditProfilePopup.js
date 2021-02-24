import React from "react";
import PopupWithForm from "./PopupWithForm";
import CurrentUserContext from "../contexts/CurrentUserContext";
import Field from "./Field";
import SubmitButton from "./SubmitButton";

function EditProfilePopup({ onClose, isOpen, onUpdateUser }) {
  // constants
  const popupSettings = {
    name: "edit-profile",
    title: "Редактировать профиль",
  };
  const submitButtonSettings = {
    defaultText: "Сохранить",
    loadingText: "Сохранение...",
    className: "form__submit-button",
  };
  const nameInputSettings = {
    name: "name",
    type: "text",
    placeholder: "Имя",
    minLength: "2",
    maxLength: "40",
    required: true,
  };
  const descriptionInputSettings = {
    name: "job",
    type: "text",
    placeholder: "Деятельность",
    required: true,
    minLength: "2",
    maxLength: "200",
  };

  // contexts
  const currentUser = React.useContext(CurrentUserContext);

  // states
  const [nameInput, setNameInput] = React.useState({
    value: currentUser.name,
    isValid: false,
  });
  const [descriptionInput, setDescriptionInput] = React.useState({
    value: currentUser.value,
    isValid: false,
  });
  const [isValid, setValid] = React.useState(false);
  const [submitButtonText, setSubmitButtonText] = React.useState(
    submitButtonSettings.defaultText
  );

  React.useEffect(() => {
    const inputs = [nameInput, descriptionInput];
    setValid(inputs.every(({ isValid }) => isValid));
  }, [nameInput, descriptionInput]);

  // handlers
  const handleSubmit = (evt) => {
    evt.preventDefault();
    if (isValid) {
      setSubmitButtonText(submitButtonSettings.loadingText);
      onUpdateUser({
        name: nameInput.value,
        about: descriptionInput.value,
      }).finally(() => {
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
      <fieldset className="fieldset form__edit-profile-fieldset">
          <Field
            {...nameInputSettings}
            onInput={setNameInput}
            isVisible={isOpen}
            defaultValue={currentUser.name}
          />
          <Field
            {...descriptionInputSettings}
            onInput={setDescriptionInput}
            isVisible={isOpen}
            defaultValue={currentUser.about}
          />
      </fieldset>
    </PopupWithForm>
  );
}

export default EditProfilePopup;
