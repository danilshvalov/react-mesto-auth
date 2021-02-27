import React from "react";
import ThemeContext from "../contexts/ThemeContext";
import {addThemeAttrs} from "../utils/utils";

function Footer() {
  // contexts
  const currentTheme = React.useContext(ThemeContext);
  
  // classes
  const defaultFooterClass = "footer";
  const footerClassName = addThemeAttrs({theme: currentTheme, classList: "footer"});

  return (
    <footer className={footerClassName}>
      <p className="footer__copyright">© 2020 — 2021 Mesto Russia</p>
    </footer>
  );
}

export default Footer;
