import React from 'react';
import GestionePianiAmministratore from '../components/GestionePianiAmministratore';
import '../styles/Navbar.css';
import '../styles/Login.css';
import Navbar from '../components/Navbar';

const GestionePiani = () => (
  <div className="header">
    <Navbar />
    <div className="main">
      <GestionePianiAmministratore />
    </div>
  </div>
);

export default GestionePiani;
