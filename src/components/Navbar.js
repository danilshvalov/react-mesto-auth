import React from "react";
import { Route } from "react-router-dom";
import CurrentUserContext from "../contexts/CurrentUserContext";
import { navbarClassNames } from "../utils/constants";
import ColoredLink from "./ColoredLink";

function Navbar(props) {
  // contexts
  const currentUser = React.useContext(CurrentUserContext);

  return (
    <nav className={navbarClassNames.navbar}>
      <ul className="navbar__container">
        <Route exact path="/">
          <li className="navbar__item">{currentUser.email}</li>
          <li className="navbar__item">
            <ColoredLink
              to="/sign-in"
              className="navbar__link navbar__link_type_dim"
              onClick={props.onSignOut}
            >
              Выйти
            </ColoredLink>
          </li>
        </Route>

        <Route path="/sign-up">
          <li className="navbar__item">
            <ColoredLink to="/sign-in" className="navbar__link">
              Войти
            </ColoredLink>
          </li>
        </Route>

        <Route path="/sign-in">
          <li className="navbar__item">
            <ColoredLink to="/sign-up" className="navbar__link">
              Регистрация
            </ColoredLink>
          </li>
        </Route>
      </ul>
    </nav>
  );
}

export default Navbar;
