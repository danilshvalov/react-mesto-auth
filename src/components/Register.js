import React from "react";
import Field from "./Field";
import SubmitButton from "./SubmitButton";
import Form from "./Form";
import { NavLink } from "react-router-dom";
import ThemeContext from "../contexts/ThemeContext";

function Register() {
  // contexts
  const currentTheme = React.useContext(ThemeContext);

  // constants
  const emailInputSettings = {
    name: "email",
    type: "email",
    defaultValue: "",
    placeholder: "Email",
    required: true,
  };
  const passwordInputSettings = {
    name: "password",
    type: "password",
    defaultValue: "",
    placeholder: "Пароль",
    required: true,
  };

  // states
  const [emailInput, setEmailInput] = React.useState("");
  const [passwordInput, setPasswordInput] = React.useState("");

  // classes
  const fieldsetDefaultClass = "fieldset";
  const fieldsetClass = `form__fieldset form__fieldset_theme_${currentTheme} fieldset fieldset_theme_${currentTheme}`;

  return (
    <section className="register">
      <div className="register__container">
        <Form formClass="register__form" title="Регистрация">
          <fieldset className={fieldsetClass}>
            <Field
              {...emailInputSettings}
              onInput={setEmailInput}
              inputClass="register__input"
              fieldClass="register__field"
            />
            <Field
              {...passwordInputSettings}
              onInput={setPasswordInput}
            />
          </fieldset>
          <SubmitButton
            className="form__submit-button button_light"
            text="Зарегистрироваться"
          />
        </Form>
        <div className="register__subtext-container">
          <NavLink className="register__login-link" to="/signup">
            Уже зарегистрированы? Войти
          </NavLink>
        </div>
      </div>
    </section>
  );
}

export default Register;
