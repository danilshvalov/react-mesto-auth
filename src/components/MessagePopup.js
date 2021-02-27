import PushButton from "./PushButton";
import Popup from "./Popup";
import { messagePopupClassNames } from "../utils/constants";

function MessagePopup({ message, onClose, isOpen }) {
  return (
    <Popup name={messagePopupClassNames.name} onClose={onClose} isOpen={isOpen}>
      <div className={messagePopupClassNames.container}>
        <span className={messagePopupClassNames.textContainer}>{message}</span>
      </div>
      <PushButton
        className={messagePopupClassNames.closeButton}
        onClick={onClose}
      />
    </Popup>
  );
}

export default MessagePopup;
