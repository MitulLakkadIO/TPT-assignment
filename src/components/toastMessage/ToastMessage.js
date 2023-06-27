import React, { useState, useEffect } from "react";
import "./ToastMessage.css";

const ToastMessage = ({ message, duration = 3000, onClose }) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
    }, duration);

    return () => {
      clearTimeout(timer);
    };
  }, [duration, onClose]);

  return (
    <div className={`toast-message ${isVisible ? "visible" : ""}`}>
      <div className="message">Error : {message}</div>
    </div>
  );
};

export default ToastMessage;
