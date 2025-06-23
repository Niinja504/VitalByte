import React, { useEffect } from 'react';
import './style/SuccessMessage.css';

function SuccessMessage({ message, onClose, duration = 2000, style = {}, icon = '✔️', children }) {
  useEffect(() => {
    if (duration && onClose) {
      const timer = setTimeout(onClose, duration);
      return () => clearTimeout(timer);
    }
  }, [duration, onClose]);

  return (
    <div className="success-message" style={style}>
      <span className="success-icon">{icon}</span>
      <span className="success-text">{message || children}</span>
      {onClose && (
        <button className="success-close" onClick={onClose}>&times;</button>
      )}
    </div>
  );
}

export default SuccessMessage;
