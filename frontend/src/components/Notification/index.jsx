import { useEffect } from "react";
import "./index.css";

function Notification({ message, type = "success", onClose }) {
  useEffect(() => {
    if (!message) {
      return undefined;
    }

    const timer = setTimeout(() => {
      onClose();
    }, 4000);

    return () => clearTimeout(timer);
  }, [message, onClose]);

  if (!message) {
    return null;
  }

  return (
    <div className={`notification notification-${type}`} role="alert">
      <p>{message}</p>
      <button type="button" aria-label="Fechar notificação" onClick={onClose}>
        x
      </button>
    </div>
  );
}

export default Notification;
