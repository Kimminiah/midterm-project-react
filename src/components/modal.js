import React, { useEffect } from 'react';
import './modal.css'; // Ensure you're importing the styles

const Modal = ({ show, onClose, title, children }) => {
  // Close modal on 'Esc' key press
  useEffect(() => {
    const handleEscKey = (e) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handleEscKey);
    return () => {
      document.removeEventListener('keydown', handleEscKey);
    };
  }, [onClose]);

  // Trap focus within the modal
  useEffect(() => {
    if (show) {
      const focusableElements = 'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])';
      const modal = document.querySelector('.modal-container');
      const firstFocusableElement = modal.querySelectorAll(focusableElements)[0];
      const focusableContent = modal.querySelectorAll(focusableElements);
      const lastFocusableElement = focusableContent[focusableContent.length - 1];

      const handleTabKey = (e) => {
        if (e.key === 'Tab') {
          if (e.shiftKey) {
            if (document.activeElement === firstFocusableElement) {
              lastFocusableElement.focus();
              e.preventDefault();
            }
          } else if (document.activeElement === lastFocusableElement) {
            firstFocusableElement.focus();
            e.preventDefault();
          }
        }
      };

      document.addEventListener('keydown', handleTabKey);
      return () => {
        document.removeEventListener('keydown', handleTabKey);
      };
    }
  }, [show]);

  if (!show) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div
        className="modal-container"
        onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside the modal
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
      >
        <div className="modal-header">
          <h2 id="modal-title">{title}</h2>
          <button className="close-button" onClick={onClose} aria-label="Close modal">
            &times;
          </button>
        </div>
        <div className="modal-content">
          {children}
        </div>
      </div>
    </div>
  );
};

export default Modal;
