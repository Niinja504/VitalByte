import React from 'react';
import './style/Footer.css';
import { useFooter } from '../hooks/components/useFooter';

const Footer = () => {
  useFooter();
  return (
    <footer className="footer">
      <div className="footer-content">
        <p>&copy; {new Date().getFullYear()} Vital Bytes. Todos los derechos reservados.</p>
        <div className="footer-links">
          <a href="#">Términos y Condiciones</a>
          <a href="#">Política de Privacidad</a>
          <a href="#">Contacto</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
