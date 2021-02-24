import logo from "../images/header-logo.svg";
import ThemeSwitcher from "./ThemeSwitcher";

function Header(props) {
  return (
    <header className="header">
      <img className="header__logo" src={logo} alt="Места России" />
      <div className="header__container">
        <ThemeSwitcher onThemeSwitch={props.onThemeSwitch} />
      </div>
    </header>
  );
}

export default Header;
