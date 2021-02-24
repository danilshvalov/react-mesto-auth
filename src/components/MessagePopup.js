function MessagePopup({message, isOpen, onClose}) {
  return (
    <div className={`popup popup_type_message ${isOpen && "popup_opened"}`}>
      <div className="popup__container">
        <div className="popup__message-box message-box">
          <span className="message-box__text">{message}</span>
        </div>
        <button
          className="popup__close-button popup__close-button_indent button button_type_close button_small-size button_inverted-color"
          type="button"
          onClick={onClose}
        />
      </div>
    </div>
  );
}

export default MessagePopup;
