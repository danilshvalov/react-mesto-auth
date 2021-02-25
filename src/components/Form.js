import React from "react";
import ThemeContext from "../contexts/ThemeContext";
import {getOnlyDOMProps} from "../utils/utils";

function Form(props) {
  const currentTheme = React.useContext(ThemeContext);

  const formClass = `form form_theme_${currentTheme} ${props.className} ${props.formClass}_theme_${currentTheme}`;

  return (
    <form {...getOnlyDOMProps(props)} className={formClass}>
      {props.children}
    </form>
  );
}

export default Form;
 

