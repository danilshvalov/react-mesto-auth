import React from "react";
import ThemeContext from "../contexts/ThemeContext";
import { getOnlyDOMProps, addThemeAttrs } from "../utils/utils";

function PushButton(props) {
  const currentTheme = React.useContext(ThemeContext);

  const buttonClassName = addThemeAttrs({
    theme: currentTheme,
    classList: props.className,
  });

  return <button {...getOnlyDOMProps(props)} className={buttonClassName}>{props.childer}</button>;
}

export default PushButton;