import React from "react";
import Field from "./Field";
import SubmitButton from "./SubmitButton";
import Form from "./Form";
import { loginSettings } from "../utils/constants";
import ColoredLink from "./ColoredLink";
import ColoredTitle from "./ColoredTitle";
import Fieldset from "./Fieldset";
import { useRouteMatch } from "react-router-dom";

function Login(props) {
  // constants
  const {
    classNames,
    emailInput: emailInputSettings,
    passwordInput: passwordInputSettings,
    attributes,
  } = loginSettings;
  // states
  const [emailInput, setEmailInput] = React.useState("");
  const [passwordInput, setPasswordInput] = React.useState("");

  // handlers
  const handleLogin = (evt) => {
    evt.preventDefault();
    props.onLogin({ email: emailInput.value, password: passwordInput.value });
  };

  return (
    <section className={classNames.login}>
      <div className={classNames.loginContainer}>
        <Form className={classNames.form} onSubmit={handleLogin}>
          <ColoredTitle className={classNames.title}>
            {attributes.titleText}
          </ColoredTitle>
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
      </div>
    </section>
  );
}

export default Login;
