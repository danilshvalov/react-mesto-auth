import React from "react";
import Field from "./Field";
import PopupWithForm from "./PopupWithForm";
import SubmitButton from "./SubmitButton";
import { colorFormClassNames, editAvatarPopupSettings } from "../utils/constants";
import Fieldset from "./Fieldset";

function EditAvatarPopup({ onClose, isOpen, onUpdateAvatar }) {
  // constants
  const {
    defaultText: defaultSubmitButtonText,
    loadingText: loadingSubmitButtonText,
  } = editAvatarPopupSettings.submitButton;

  // states
  const [avatarInput, setAvatarInput] = React.useState({
    value: "",
    isValid: false,
  });
  const [isValid, setValid] = React.useState(false);
  const [submitButtonText, setSubmitButtonText] = React.useState(
    defaultSubmitButtonText
  );

  // effects
  React.useEffect(() => {
    setValid(avatarInput.isValid);
  }, [avatarInput]);

  // handlers
  const handleSubmit = (evt) => {
    evt.preventDefault();
    if (isValid) {
      setSubmitButtonText(loadingSubmitButtonText);
      onUpdateAvatar({ avatar: avatarInput.value }).finally(() => {
        setSubmitButtonText(defaultSubmitButtonText);
      });
    }
  };

  return (
    <PopupWithForm
      onClose={onClose}
      isOpen={isOpen}
      onSubmit={handleSubmit}
      {...editAvatarPopupSettings.popup}
      submitButton={
        <SubmitButton
          {...editAvatarPopupSettings.submitButton}
          className={colorFormClassNames.submitButton}
          isEnabled={isValid}
          text={submitButtonText}
        />
      }
    >
      <Fieldset className={colorFormClassNames.fieldset}>
        <Field
          {...editAvatarPopupSettings.avatarInput}
          fieldClass={colorFormClassNames.field}
          inputClass={colorFormClassNames.input}
          onInput={setAvatarInput}
          isVisible={isOpen}
        />
      </Fieldset>
    </PopupWithForm>
  );
}

export default EditAvatarPopup;
