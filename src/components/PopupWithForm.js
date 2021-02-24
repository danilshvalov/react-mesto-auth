import React from "react";
import Popup from "./Popup";
import Form from "./Form";

function PopupWithForm({
  name,
  title,
  children,
  onClose,
  isOpen,
  onSubmit,
  submitButton,
}) {
  return (
    <Popup name={name} isOpen={isOpen} onClose={onClose}>
      <Form
        className={`form popup__${name}-form`}
        method="POST"
        action="/"
        name={name}
        noValidate
        onSubmit={onSubmit}
      >
        <h2 className="form__title">{title}</h2>
        {children}
        {submitButton}
      </Form>
    </Popup>
  );
}

export default PopupWithForm;
