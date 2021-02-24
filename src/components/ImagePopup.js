import Popup from "./Popup";

function ImagePopup({ name, link, isOpen, onClose }) {
  return (
    <Popup name={name} isOpen={isOpen} onClose={onClose}>
      <div className="popup__picture picture">
        <img className="picture__image" src={link} alt={name} />
        <p className="picture__description">{name}</p>
      </div>
    </Popup>
  );
}

export default ImagePopup;
