import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Footer.css'; // Importa il file di stile CSS per la navbar

const Footer = () => (
  <div className="footer">
    <table className="tabella">
        <tr className="row1">
          <td className="col1">
            <img className="img-maniblue" src="/maniblue.png" alt="" aria-label="Maniblue" />
          </td>
          <td className="col2">
            <div>
              <p>contact@sustainer.com</p>
              <p>333 3333333</p>
            </div>
          </td>
          <td className="col3">
            <div>
              <p>Quick links</p>
              <p>Home</p>
              <p>About us</p>
              <p>Assistenza</p>
              <p>Contact</p>
            </div>
          </td>
          <td className="col4">
            <div>
              <p>Socials</p>
              <p>Linkedin</p>
              <p>Instagram</p>
              <p>Github</p>
              <p>Reddit</p>
            </div>
          </td>
          <td className="col5">
            <img className="img-susblue" src="/susblue.png" alt="" />
          </td>
        </tr>
        <tr className="row2">
          <td className="col1">
            <img className="img-footer" src="/footersin.png" alt="" />
          </td>
          <td className="col2">
            <div className="footerdiv">
              <p>&copy; 2023 Sustainer. Tutti i diritti riservati.</p>
            </div>
          </td>
          <td className="col3">
            <img className="img-footer" src="/footerdex.png" alt="" />
          </td>
        </tr>
    </table>
  </div>
);

export default Footer;
