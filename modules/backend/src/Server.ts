import express from 'express';
import session from 'express-session';
import morgan from 'morgan';
import helmet from 'helmet';
import cors from 'cors';
import PianoController from './controller/pianoController';
import UtenteController from './controller/utenteController';
import AmministratoreController from './controller/amministratoreController';

const server = express();

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
server.use('/login', (req, res) => {
  UtenteController.loginIMP(req, res);
});
server.use('/logout', UtenteController.logout);
server.use('/verificaLogin', (req, res) => {
  UtenteController.verificaLogin(req, res);
});
server.use('/register', (req, res) => {
  UtenteController.registrazioneIMP(req, res);
});
// fineUtente

// piano
server.use('/piani', (req, res) => {
  PianoController.getTipiPianoIMP(req, res);
});
server.use('/modificaPiano', (req, res) => {
  PianoController.visulizzaPianoIMP(req, res);
});
server.use('/piani', (req, res) => {
  PianoController.getTipiPianoIMP(req, res);
});
server.use('/checkout', (req, res) => {
  PianoController.AcquistoPianoIMP(req, res);
});
server.use('/checkout', (req, res) => {
  PianoController.AcquistoPianoIMP(req, res);
});
server.use('/registraPianoAcquistato', (req, res) => {
  PianoController.RegistraPianoAcquistatoIMP(req, res);
});

// amministratore
server.use('/loginAm', (req, res) => {
  AmministratoreController.login(req, res);
});
server.use('/logoutAm', (req, res) => {
  AmministratoreController.logout(req, res);
});
server.use('/cancellaUtenteAm', (req, res) => {
  AmministratoreController.cancellaUtente(req, res);
});
server.use('/modificaInformazioniUtenteAm', (req, res) => {
  AmministratoreController.modificaInformazioniUtente(req, res);
});
server.use('/verificaLoginAm', (req, res) => {
  AmministratoreController.verificaLoginAm(req, res);
});
// fineAmministratore

export default server;
export { key };
