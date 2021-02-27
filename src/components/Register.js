import React from "react";
import Field from "./Field";
import SubmitButton from "./SubmitButton";
import Form from "./Form";
import { registerSettings } from "../utils/constants";
import ColoredLink from "./ColoredLink";
import ColoredTitle from "./ColoredTitle";
import Fieldset from "./Fieldset";

function Register() {
  // constants
  const {
    classNames,
    emailInput: emailInputSettings,
    passwordInput: passwordInputSettings,
    attributes,
  } = registerSettings;
  // states
  const [emailInput, setEmailInput] = React.useState("");
  const [passwordInput, setPasswordInput] = React.useState("");

  return (
    <section className={classNames.register}>
      <div className={classNames.registerContainer}>
        <Form className={classNames.form} title={attributes.titleText}>
          <ColoredTitle className={classNames.title}>Регистрация</ColoredTitle>
          <Fieldset className={classNames.fieldset}>
            <Field
              {...emailInputSettings}
              onInput={setEmailInput}
              inputClass={classNames.input}
              fieldClass={classNames.field}
            />
            <Field
              {...passwordInputSettings}
              onInput={setPasswordInput}
              inputClass={classNames.input}
              fieldClass={classNames.field}
            />
          </Fieldset>
          <SubmitButton
            className={classNames.submitButton}
            text={attributes.submitButtonText}
          />
        </Form>
        <div className={classNames.subtextContainer}>
          <ColoredLink className={classNames.link} to={attributes.linkToLogin}>
            Уже зарегистрированы? Войти
          </ColoredLink>
        </div>
      </div>
    </section>
  );
}

export default Register;
