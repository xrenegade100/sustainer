import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Footer.css'; // Importa il file di stile CSS per la navbar

const Footer = () => {
  const emailAddress = 'contact@sustainer.com';
  const linkedinProfileUrl = 'https://www.linkedin.com/in/tuo_profilo/';
  const instagramProfileUrl = 'https://www.instagram.com/tuo_profilo/';
  const githubProfileUrl = 'https://www.github.com/tuo_profilo/';
  const redditProfileUrl = 'https://www.reddit.com/tuo_profilo/';

  return (
    <div className="footer">
      <table className="tabella">
        <tr className="row1">
          <td className="col1" aria-label="Image">
            <img className="img-maniblue" src="/maniblue.png" alt="" />
          </td>
          <td className="col2">
            <div className="link">
              <p><a href={`mailto:${emailAddress}`}>{emailAddress}</a></p>
            </div>
          </td>
          <td className="col3">
            <div className="link">
              <p className="titleF">Quick links</p>
              <p>
                <Link to="/homepage" className="text-whiteF">
                  Home
                </Link>
              </p>
              <p>
                <Link to="/homepage" className="text-whiteF">
                  About us
                </Link>
              </p>
              <p>
                <Link to="/assistenza" className="text-whiteF">
                  Assistenza
                </Link>
              </p>
              <p>
                <Link to="/contatti" className="text-whiteF">
                  Contatti
                </Link>
              </p>
            </div>
          </td>
          <td className="col4">
            <div className="link">
              <p className="titleF">Socials</p>
              <p><a href={linkedinProfileUrl} target="_blank" rel="noopener noreferrer">Linkedin</a></p>
              <p><a href={instagramProfileUrl} target="_blank" rel="noopener noreferrer">Instagram</a></p>
              <p><a href={githubProfileUrl} target="_blank" rel="noopener noreferrer">Github</a></p>
              <p><a href={redditProfileUrl} target="_blank" rel="noopener noreferrer">Reddit</a></p>
            </div>
          </td>
          <td className="col5" aria-label="Image">
            <img className="img-susblue" src="/susblue.png" alt="" />
          </td>
        </tr>
        <tr className="row2">
          <td className="col1" aria-label="Footer Image">
            <img className="img-footer" src="/footersin.png" alt="" />
          </td>
          <td className="col2">
            <div className="footerdiv">
              <p>&copy; 2023 Sustainer. Tutti i diritti riservati.</p>
            </div>
          </td>
          <td className="col3" aria-label="Footer Image">
            <img className="img-footer" src="/footerdex.png" alt="" />
          </td>
        </tr>
      </table>
    </div>
  );
};
export default Footer;
