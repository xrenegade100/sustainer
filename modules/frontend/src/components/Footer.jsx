import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Footer.css'; // Importa il file di stile CSS per la navbar

const Footer = () => (
  <div className="footer">
    <div class="tab">
      <img className="img-maniblue" src="/maniblue.png" alt="" />
      <div>
        <p>contact@sustainer.com</p>
        <p>333 3333333</p>
      </div>
      <div>
        <p>Quick links</p>
        <p>Home</p>
        <p>About us</p>
        <p>Assistenza</p>
        <p>Contact</p>
      </div>
      <div>
        <p>Socials</p>
        <p>Linkedin</p>
        <p>Instagram</p>
        <p>Github</p>
        <p>Reddit</p>
      </div>
      <img className="img-susblue" src="/susblue.png" alt="" />
    </div>
    <div class="sottodiv">
      <img className="img-footer" src="/footersin.png" alt="" />
      <div class="footerdiv">
        <p>&copy; 2023 Sustainer. Tutti i diritti riservati.</p>
      </div>
      <img className="img-footer" src="/footerdex.png" alt="" />
    </div>
  </div>
);

export default Footer;
