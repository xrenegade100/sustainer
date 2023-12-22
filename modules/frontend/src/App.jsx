// Esempio di errore ESLint:
// Se rimuovo l'import React -> import { useState } from 'react';
// ottengo l'errore: 'React' must be in scope when using JSX
// i dettagli sono qui: https://github.com/jsx-eslint/eslint-plugin-react/blob/master/docs/rules/react-in-jsx-scope.md
import React, { useState } from 'react';
import { Button } from 'baseui/button';
import { Tag } from 'baseui/tag';
import { ProgressBar } from 'baseui/progress-bar';
import reactLogo from './assets/react.svg';
// il commento sotto serve per ignorare l'errore di eslint che non trova il file
// dal momento che vite non usa il path relativo ma quello assoluto
// per importare file dalla cartella `public`
// eslint-disable-next-line import/no-absolute-path, import/no-unresolved
import viteLogo from '/vite.svg';
import './App.css';

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank" rel="noreferrer">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank" rel="noreferrer">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
        <a
          href="https://github.com/xrenegade100/sustainer/"
          target="_blank"
          rel="noreferrer"
        >
          <img
            className="logo sustainer"
            width={120}
            src="/sustainer_logo.png"
            alt="sustainer logo"
          />
        </a>
      </div>
      <h1>Vite + React + SUSTAINER</h1>
      <div className="card">
        <Button
          type="button"
          onClick={() => setCount((oldCount) => oldCount + 1)}
        >
          count is
          <span> </span>
          {count}
        </Button>
        <p>
          Edit
          <code>src/App.jsx</code>
          and save to test HMR
        </p>
        <Tag kind="accent">sustainer</Tag>
        <ProgressBar value={count * 5} showLabel />
      </div>
    </>
  );
}

export default App;
