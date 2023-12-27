import React, { useState } from 'react';
import '../styles/LoginSignupForm.css';
import { Tabs, Tab, FILL } from 'baseui/tabs-motion';
import { Input } from 'baseui/input';
import { Button, SIZE } from 'baseui/button';

const RegisterForm = ({ onSubmit }) => {
    
    const [nome, setNome] = useState('');   
    const [cognome, setCognome] = useState('');
    const [emailr, setEmailr] = useState('');
    const [passwordr, setPasswordr] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async () => {
        setIsLoading(true);
        const response = await fetch('http://localhost:5000/login/register', {
          headers: {
            'Content-Type': 'application/json',
          },
          method: 'POST',
          body: JSON.stringify({
            nome,
            cognome,
            emailr,
            passwordr,
          }),
        });

        setIsLoading(false);
    if (!response.ok) {
      alert('Credeziali errate');
      return;
    }

    const data = await response.json();
    alert(JSON.stringify(data));
  };

  return (
    <div className="register">
                <Input
                  value={nome}
                  onChange={(e) => setNome(e.target.value)}
                  placeholder="Nome"
                  clearable
                  type="text"
                />
                <Input
                  value={cognome}
                  onChange={(e) => setCognome(e.target.value)}
                  placeholder="Cognome"
                  clearable
                  type="text"
                />
                <Input
                  value={emailr}
                  onChange={(e) => setEmailr(e.target.value)}
                  placeholder="mario@rossi.it"
                  clearable
                  type="email"
                />
                <Input
                  value={passwordr}
                  onChange={(e) => setPasswordr(e.target.value)}
                  placeholder="password"
                  clearable
                  type="password"
                />
        
                <Button
                  isLoading={isLoading}
                  onClick={handleSubmit}
                  size={SIZE.large}
                >
                  Registrati
                </Button>
                </div>
  );
};
RegisterForm.propTypes = {
    onSubmit: () => {},
  };
  
  export default RegisterForm;