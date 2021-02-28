import React from "react";
import Popup from "./Popup";
import Form from "./Form";
import { addThemeAttrs } from "../utils/utils";
import ThemeContext from "../contexts/ThemeContext";
import { popupClassNames } from "../utils/constants";

function PopupWithForm({
  name,
  title,
  children,
  onClose,
  isOpen,
  onSubmit,
  formClass,
  titleClass,
  submitButton,
}) {
  // contexts
  const currentTheme = React.useContext(ThemeContext);

  // classes
  const formClassName = addThemeAttrs({
    theme: currentTheme,
    classList: `${formClass} ${popupClassNames.popup}__${name}-form`,
  });
  const titleClassName = addThemeAttrs({
    theme: currentTheme,
    classList: titleClass,
  });

  return (
    <Popup name={name} isOpen={isOpen} onClose={onClose}>
      <Form
        className={`${popupClassNames.popup}__${name}-form ${formClassName}`}
        method="POST"
        action="/"
        name={name}
        noValidate
        onSubmit={onSubmit}
      >
        <h2 className={titleClassName}>{title}</h2>
        {children}
        {submitButton}
      </Form>
    </Popup>
  );
}

export default PopupWithForm;
