import React from "react";

function Popup({ name, children, onClose, isOpen }) {
  // constants
  const escapeKeyCode = "Escape";

  // refs
  const popupWrapperRef = React.useRef();
  const popupContainerRef = React.useRef();
  const closeButtonRef = React.useRef();

  // handlers

  const handleClose = (evt) => {
    if (
      evt.target === popupWrapperRef.current ||
      evt.target === closeButtonRef.current ||
      evt.target === popupContainerRef.current
    ) {
      onClose();
    }
  };

  // effects
  React.useEffect(() => {
    const escapeButtonHandler = (evt) => {
      if (evt.key === escapeKeyCode) {
        onClose();
        document.removeEventListener("keydown", escapeButtonHandler);
      }
    };
    if (isOpen) {
      document.addEventListener("keydown", escapeButtonHandler);
    }
  }, [isOpen, onClose]);
  return (
    <div
      className={`popup popup_type_${name} ${isOpen && "popup_opened"}`}
      ref={popupWrapperRef}
      onClick={handleClose}
    >
      <div className="popup__container" ref={popupContainerRef}>
        {children}
        <button
          className="button button_type_close popup__close-button"
          type="button"
          ref={closeButtonRef}
        />
      </div>
    </div>
  );
}

export default Popup;
