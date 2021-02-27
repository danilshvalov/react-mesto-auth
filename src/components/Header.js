import React from "react";
import logo from "../images/header-logo.svg";
import ThemeSwitcher from "./ThemeSwitcher";
import ThemeContext from "../contexts/ThemeContext";
import { addThemeAttrs } from "../utils/utils";

function Header(props) {
  // contexts
  const currentTheme = React.useContext(ThemeContext);

  // classes
  const defaultHeaderClass = "header";
  const headerClassName = addThemeAttrs({
    theme: currentTheme,
    classList: defaultHeaderClass,
  });

  const defaultLogoClass = "header__logo";
  const logoClassName = addThemeAttrs({
    theme: currentTheme,
    classList: defaultLogoClass,
  });

  return (
    <header className={headerClassName}>
      <img className={logoClassName} src={logo} alt="Места России" />
      <div className="header__container">
        <ThemeSwitcher onThemeSwitch={props.onThemeSwitch} />
      </div>
    </header>
  );
}

export default Header;
