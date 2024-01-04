import express, {} from 'express';
import session from 'express-session';
import morgan from 'morgan';
import helmet from 'helmet';
import cors from 'cors';
import UtenteController from './Controller/UtenteController';
import PianoController from './Controller/PianoController';
import AmministratoreController from './Controller/amministratoreController';

const server = express();

// Morgan is a HTTP request logger middleware for Node.js.
// It simplifies the process of logging requests to your application.
// You might think of Morgan as a helper that collects logs from your server,
// such as your request logs.
const key = 'keyboard cat';
server.use(morgan('dev', { skip: () => process.env.NODE_ENV === 'test' })); // skip request logging during tests
server.use(helmet());
server.use(cors({ credentials: true, origin: true }));
server.use(express.json());
server.use(
  session({
    secret: key,
    resave: false,
    saveUninitialized: true,
    cookie: {
      secure: false,
      maxAge: 600000,
    },
  }),
);
// utente
server.use('/login', UtenteController.loginIMP);
server.use('/logout', UtenteController.logout);
server.use('/verificaLogin', UtenteController.verificaLogin);
server.use('/register', UtenteController.registrazioneIMP);
// fineutente

// piano
server.use('/piani', PianoController.getTipiPianoIMP);
server.use('/modificaPiano', PianoController.visulizzaPianoIMP);
server.use('/checkout', PianoController.AcquistoPianoIMP);
server.use(
  '/registraPianoAcquistato',
  PianoController.RegistraPianoAcquistatoIMP,
);
// finepiano

// amministratore
server.use('/loginAm', AmministratoreController.login);
server.use('/logoutAm', AmministratoreController.logout);
server.use('/cancellaUtenteAm', AmministratoreController.cancellaUtente);
server.use(
  '/modificaInformazioniUtenteAm',
  AmministratoreController.modificaInformazioniUtente,
);
/* server.use('/visualizzaUtentiAm', AmministratoreController.visualizzaUtenti); */
server.use('/verificaLoginAm', AmministratoreController.verificaLoginAm);
// fineamministratore
export default server;
export { key };
