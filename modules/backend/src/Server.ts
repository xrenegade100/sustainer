import express from 'express';
import session from 'express-session';
import morgan from 'morgan';
import helmet from 'helmet';
import cors from 'cors';
import multer, { Multer } from 'multer';
import PianoController from './Controller/PianoController';
import UtenteController from './Controller/UtenteController';
import AmministratoreController from './Controller/AmministratoreController';
import AddestramentoController from './Controller/AddestramentoController';
import PreventivoController from './Controller/PreventivoController';

const server = express();
const upload: Multer = multer();

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
server.use('/login', async (req, res) => {
  await UtenteController.loginIMP(req, res);
});
server.use('/logout', async (req, res) => {
  await UtenteController.logout(req, res);
});
server.use('/verificaLogin', async (req, res) => {
  await UtenteController.verificaLogin(req, res);
});
server.use('/register', async (req, res) => {
  await UtenteController.registrazioneIMP(req, res);
});
server.use('/InfoUtente/:idUtente', async (req, res) => {
  await UtenteController.getUtenteById(req, res);
});
// fineUtente

// piano
server.use('/piani', async (req, res) => {
  await PianoController.getTipiPianoIMP(req, res);
});
server.use('/modificaPiano', async (req, res) => {
  await PianoController.visulizzaPianoIMP(req, res);
});
server.use('/checkout', async (req, res) => {
  await PianoController.AcquistoPianoIMP(req, res);
});
server.use('/registraPianoAcquistato', async (req, res) => {
  await PianoController.RegistraPianoAcquistatoIMP(req, res);
});
server.use('/annullaPiano', async (req, res) => {
  await PianoController.AnnullaPianoIMP(req, res);
});
server.use('/differenzaGiorni', async (req, res) => {
  await PianoController.differenzaGiorniIMP(req, res);
});
server.use('/AllPiani', async (req, res) => {
  await PianoController.visualizzaPianiIMP(req, res);
});

// finePiano

// preventivo
server.use('/creaPreventivo', async (req, res) => {
  await PreventivoController.creaPreventivoIMP(req, res);
});
server.use('/preventivoUtente', async (req, res) => {
  await PreventivoController.getPreventivoIMP(req, res);
});
server.use('/statoPreventivo', async (req, res) => {
  await PreventivoController.getStatoIMP(req, res);
});
server.use('/eliminaPreventivo', async (req, res) => {
  await PreventivoController.eliminaPreventivoIMP(req, res);
});
server.use('/verificaPreventivo', async (req, res) => {
  await PreventivoController.controllaPreventivoIMP(req, res);
});
server.use('/preventivi', async (req, res) => {
  await PreventivoController.TuttiPreventiviIMP(req, res);
});
server.use('/preventivoModificato', async (req, res) => {
  await PreventivoController.ModificaPreventivoIMP(req, res);
});
server.use('/checkoutEnterprise', async (req, res) => {
  await PianoController.AcquistoPianoEIMP(req, res);
});
server.use('/inserimentoEnterprise', async (req, res) => {
  await PianoController.InserimentoPianoEnterpriseIMP(req, res);
});
// fine preventivo

// amministratore
server.use('/loginAm', async (req, res) => {
  await AmministratoreController.login(req, res);
});
server.use('/logoutAm', async (req, res) => {
  await AmministratoreController.logout(req, res);
});
server.use('/cancellaUtenteAm', async (req, res) => {
  await AmministratoreController.cancellaUtente(req, res);
});
server.use('/modificaInformazioniUtenteAm', async (req, res) => {
  await AmministratoreController.modificaInformazioniUtente(req, res);
});
server.use('/verificaLoginAm', async (req, res) => {
  await AmministratoreController.verificaLoginAm(req, res);
});
// fineAmministratore

// addestramento
server.use('/salvaJson', async (req, res) => {
  await AddestramentoController.salvaJson(req, res);
});
server.use('/leggiCSV', async (req, res) => {
  await AddestramentoController.attributiDataset(req, res);
});

server.use('/upload', upload.single('file'), async (req, res) => {
  await AddestramentoController.caricaFileIMP(req, res);
});

server.use('/testPython', async (req, res) => {
  await AddestramentoController.AddestramentoIMP(req, res);
});

server.use('/gruppoPrivilegiato', async (req, res) => {
  await AddestramentoController.attributiDataset(req, res);
});

server.use('/avvioAddestramento', async (req, res) => {
  await AddestramentoController.AddestramentoIMP(req, res);
});
server.use('/downloadModello', async (req, res) => {
  await AddestramentoController.downloadIMP(req, res);
});
// fine addestramento

export default server;
export { key };
