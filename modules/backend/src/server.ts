import express, { Request, Response } from 'express';
import session from 'express-session';
import morgan from 'morgan';
import helmet from 'helmet';
import cors from 'cors';
import UtenteController from './Controller/UtenteController';

const server = express();

// Morgan is a HTTP request logger middleware for Node.js.
// It simplifies the process of logging requests to your application.
// You might think of Morgan as a helper that collects logs from your server,
// such as your request logs.
const key = 'keyboard cat';
server.use(morgan('dev', { skip: () => process.env.NODE_ENV === 'test' })); // skip request logging during tests
server.use(helmet());
server.use(cors());
server.use(express.json());
server.use(
  session({
    secret: key,
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: false,
      maxAge: 600000,
    },
  }),
);

server.use('/login', UtenteController.loginIMP);
server.use('/register', UtenteController.registrazioneIMP);
export default server;
export { key };
