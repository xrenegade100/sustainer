import express from 'express';
import session from 'express-session';
import morgan from 'morgan';
import helmet from 'helmet';
import cors from 'cors';
import { upload, handleFileUpload } from './Dataset/DatasetMenage';
import PianoController from './Controller/PianoController';
import UtenteController from './Controller/UtenteController';
import AmministratoreController from './Controller/AmministratoreController';
import ModelloController from './Controller/ModelloController';

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
server.use('/checkout', (req, res) => {
  PianoController.AcquistoPianoIMP(req, res);
});
server.use('/registraPianoAcquistato', (req, res) => {
  PianoController.RegistraPianoAcquistatoIMP(req, res);
});
server.use('/annullaPiano', (req, res) => {
  PianoController.AnnullaPianoIMP(req, res);
});
server.use('/differenzaGiorni', (req, res) => {
  PianoController.differenzaGiorniIMP(req, res);
});

// finePiano

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

server.use('/salvaJson', (req, res) => {
  ModelloController.salvaJson(req, res);
});
server.use('/leggiCSV', (req, res) => {
  ModelloController.leggiCSV(req, res);
});

// eslint-disable-next-line consistent-return
server.use(
  '/upload',
  upload.single('file'),
  handleFileUpload,
  async (req, res) => {
    try {
      return res.status(200).json();
    } catch (error) {
      console.error(error);
      return res.status(500).json();
    }
  },
);

server.use('/testPython', (req, res) => {
  ModelloController.AddestramentoIMP(req, res);
});

server.use('/gruppoPrivilegiato', (req, res) => {
  ModelloController.leggiCSV(req, res);
});

server.use('/avvioAddestramento', (req, res) => {
  ModelloController.AddestramentoIMP(req, res);
});
server.use('/downloadModello', (req, res) => {
  ModelloController.downloadIMP(req, res);
});

export default server;
export { key };
