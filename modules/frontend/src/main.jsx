import React from 'react';
import ReactDOM from 'react-dom/client';
import { Client as Styletron } from 'styletron-engine-monolithic';
import { Provider as StyletronProvider } from 'styletron-react';
import { LightTheme, BaseProvider } from 'baseui';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Login from './pages/Login';
import RegisterForm from './components/RegisterForm';

//Qui fare il routing frontend, quindi aggiungere qui le pagine jsx qui
const router = createBrowserRouter([
  {
    path: '/',
    element: <div>Home Page</div>,
  },
  {
    path: '/login',
    element: <Login />, //passare la pagina jsx con le <>
  },
  {
    path: '/Register',
    element: <RegisterForm />, //passare la pagina jsx con le <>
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
