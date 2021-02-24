import React from "react";
import ThemeContext from "../contexts/ThemeContext";

function ThemeSwitcher({ onThemeSwitch }) {
  // contexts
  const currentTheme = React.useContext(ThemeContext);

  // states
  const [themeButtonClass, setThemeButtonClass] = React.useState();

  // effects
  React.useEffect(() => {
    if (currentTheme === "dark") {
      setThemeButtonClass("button_type_sun");
    } else {
      setThemeButtonClass("button_type_moon");
    }
  }, [currentTheme]);

  const handleThemeSwitch = () => {
    onThemeSwitch(currentTheme === "dark" ? "light" : "dark");
  };

  return (
    <div className="theme-switcher">
      <button
        className={`theme-switcher__button button ${themeButtonClass}`}
        onClick={handleThemeSwitch}
      />
    </div>
  );
}

export default ThemeSwitcher;
