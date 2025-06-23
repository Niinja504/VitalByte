import React, { createContext, useContext, useState, useCallback } from 'react';
import './style/SuccessModal.css';

const SuccessModalContext = createContext();

export function useSuccessModal() {
  return useContext(SuccessModalContext);
}

export function SuccessModalProvider({ children }) {
  const [modal, setModal] = useState({ open: false, message: '' });

  const showSuccess = useCallback((message, duration = 2000) => {
    setModal({ open: true, message });
    setTimeout(() => setModal({ open: false, message: '' }), duration);
  }, []);

  return (
    <SuccessModalContext.Provider value={{ showSuccess }}>
      {children}
      {modal.open && <div className="success-modal-overlay">
        <div className="success-modal">
          <span className="success-check">✔</span>
          <p>{modal.message}</p>
        </div>
      </div>}
    </SuccessModalContext.Provider>
  );
}
