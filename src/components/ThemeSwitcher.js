import React from "react";
import ThemeContext from "../contexts/ThemeContext";
import { addThemeAttrs } from "../utils/utils";

function ThemeSwitcher({ onThemeSwitch }) {
  // contexts
  const currentTheme = React.useContext(ThemeContext);

  // classes
  const defaultThemeButtonClass = "theme-button button";
  const themeButtonClassName = addThemeAttrs({theme: currentTheme, classList: defaultThemeButtonClass});

  const handleThemeSwitch = () => {
    onThemeSwitch(currentTheme === "dark" ? "light" : "dark");
  };

  return (
    <div className="theme-switcher">
      <button
        className={themeButtonClassName}
        onClick={handleThemeSwitch}
      />
    </div>
  );
}

export default ThemeSwitcher;
