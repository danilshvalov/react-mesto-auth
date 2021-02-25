import React from "react";
import logo from "../images/header-logo.svg";
import ThemeSwitcher from "./ThemeSwitcher";
import ThemeContext from "../contexts/ThemeContext";

function Header(props) {
  const currentTheme = React.useContext(ThemeContext);
  return (
    <header className="header">
      <img className={`header__logo header__logo_theme_${currentTheme}`} src={logo} alt="Места России" />
      <div className="header__container">
        <ThemeSwitcher onThemeSwitch={props.onThemeSwitch} />
      </div>
    </header>
  );
}

export default Header;
