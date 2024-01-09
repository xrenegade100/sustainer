import React from 'react';
import '../styles/PianoEnterprise.css';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import '../styles/Navbar.css';
import ProgressEnterprise from '../components/ProgressEnterprise';

const PianoEnterprise = () => (
  <>
    <div className="header">
      <Navbar />
    </div>
    <div className="body">
      <div className="titolo">
        <h1>Richiesta Piano Enterprise</h1>
      </div>
      <ProgressEnterprise />
    </div>
    <div className="footer">
      <Footer />
    </div>
  </>
);

export default PianoEnterprise;
