import React from 'react';
import ReactDOM from 'react-dom/client';
import { Client as Styletron } from 'styletron-engine-monolithic';
import { Provider as StyletronProvider } from 'styletron-react';
import { LightTheme, BaseProvider } from 'baseui';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Login from './pages/Login';
import Homepage from './pages/Homepage';
import Piani from './pages/Piani';
import ModificaPiano from './pages/ModificaPiano';
import LoginAmministratore from './pages/LoginAmministratore';
import PianoEnterprise from './pages/PianoEnterprise';
import GestionePiani from './pages/GestionePiani';
import CardPianoEnterprise from './pages/CardPianoEnterprise';
import InserimentoParametri from './pages/InserimentoParametri';
import CaricaDataset from './pages/CaricaDataset';
import Fairness from './pages/Fairness';
import FineAddestramento from './pages/FineAddestramento';

// Qui fare il routing frontend, quindi aggiungere qui le pagine jsx qui
const router = createBrowserRouter([
  {
    path: '/',
    element: <Homepage />,
  },
  {
    path: '/login',
    element: <Login />, // passare la pagina jsx con le <>
  },

  {
    path: '/homepage',
    element: <Homepage />, // passare la pagina jsx con le <>
  },
  {
    path: '/piani',
    element: <Piani />, // passare la pagina jsx con le <>
  },
  {
    path: '/loginAm',
    element: <LoginAmministratore />, // passare la pagina jsx con le <>
  },
  {
    path: '/modifica-piano',
    element: <ModificaPiano />, // passare la pagina jsx con le <>
  },
  {
    path: '/richiesta-Enterprise',
    element: <PianoEnterprise />, // passare la pagina jsx con le <>
  },
  {
    path: '/gestionePiani',
    element: <GestionePiani />, // passare la pagina jsx con le <>
  },
  {
    path: '/newPianoEnterprise',
    element: <CardPianoEnterprise />, // passare la pagina jsx con le <>
  },
  {
    path: '/addestra',
    element: <CaricaDataset />, // passare la pagina jsx con le <>
  },
  {
    path: '/inserimentoparametri',
    element: <InserimentoParametri />, // passare la pagina jsx con le <>
  },
  {  
    path: '/fairness',
    element: <Fairness />, // passare la pagina jsx con le <>
  },
  {
    path: '/fine-addestramento',
    element: <FineAddestramento />, // passare la pagina jsx con le <>
  },
]);

const engine = new Styletron();

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <StyletronProvider value={engine}>
      <BaseProvider theme={LightTheme}>
        <RouterProvider router={router} />
      </BaseProvider>
    </StyletronProvider>
  </React.StrictMode>,
);
