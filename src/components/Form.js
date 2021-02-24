import React from "react";
import ThemeContext from "../contexts/ThemeContext";
import getOnlyDOMProps from "../utils/utils";

function Form(props) {
  const currentTheme = React.useContext(ThemeContext);

  const formClass = `form form_${currentTheme} ${props.className}`;

  return (
    <form {...getOnlyDOMProps(props)} className={formClass}>
      {props.children}
    </form>
  );
}

export default Form;