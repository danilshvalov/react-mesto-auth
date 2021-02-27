import React from "react";
import ThemeContext from "../contexts/ThemeContext";
import { addThemeAttrs } from "../utils/utils";
import { NavLink } from "react-router-dom";

function ColoredLink(props) {
  // contexts
  const currentTheme = React.useContext(ThemeContext);

  // classNames
  const linkClassName = addThemeAttrs({
    theme: currentTheme,
    classList: props.className,
  });

  return (
    <NavLink className={linkClassName} to={props.to}>
      {props.children}
    </NavLink>
  );
}

export default ColoredLink;
