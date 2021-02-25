import React from "react";
import ThemeContext from "../contexts/ThemeContext";
import { getOnlyDOMProps, addThemeAttrs } from "../utils/utils";

function SubmitButton(props) {
  // проверка на undefined необходима для включения кнопки, если клиент не определил ее поведение
  const currentTheme = React.useContext(ThemeContext);

  const defaultClass = "button";
  const disabledClass = "button_type_submit-disabled";
  const className = `${addThemeAttrs({
    theme: currentTheme,
    classList: `${defaultClass} ${props.className}`,
  })} ${
    props.isEnabled || props.isEnabled === undefined ? "" : disabledClass
  }`;

  return (
    <button {...getOnlyDOMProps(props)} className={className} type="submit">
      {props.text}
    </button>
  );
}

export default SubmitButton;
