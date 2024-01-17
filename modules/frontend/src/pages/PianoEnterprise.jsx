import React from 'react';
import { useLocation } from 'react-router-dom';
import '../styles/PianoEnterprise.css';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import '../styles/Navbar.css';
import ProgressEnterprise from '../components/ProgressEnterprise';

const PianoEnterprise = () => {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const paymentStep = params.get('paymentStep');

  return (
    <div className="container">
      <div className="header">
        <Navbar />
      </div>
      <div className="body">
        <div className="titolo">
          <h1>Richiesta Piano Enterprise</h1>
        </div>
        <ProgressEnterprise paymentStep={paymentStep} />
      </div>
      <div className="footerPE">
        <Footer />
      </div>
    </div>
  );
};

export default PianoEnterprise;
