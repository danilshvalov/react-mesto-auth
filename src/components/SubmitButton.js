import React from "react";
import ThemeContext from "../contexts/ThemeContext";
import getOnlyDOMProps from "../utils/utils";

function SubmitButton(props) {
  // проверка на undefined необходима для включения кнопки, если клиент не определил ее поведение
  const currentTheme = React.useContext(ThemeContext);

  const defaultClass = "button button_type_submit";
  const disabledClass = "button_type_submit-disabled";
  const className = `${defaultClass} ${props.className} ${
    props.isEnabled || props.isEnabled === undefined ? "" : disabledClass
  } ${defaultClass}_${currentTheme}`;

  return (
    <button {...getOnlyDOMProps(props)} className={className} type="submit">
      {props.text}
    </button>
  );
}

export default SubmitButton;
