import express, { Request, Response } from 'express';
import morgan from 'morgan';
import helmet from 'helmet';
import cors from 'cors';
import { getAllUtenti } from './dao/UtenteDAO';

import apiV1 from './api/v1';

const server = express();

// Morgan is a HTTP request logger middleware for Node.js.
// It simplifies the process of logging requests to your application.
// You might think of Morgan as a helper that collects logs from your server,
// such as your request logs.
server.use(morgan('dev', { skip: () => process.env.NODE_ENV === 'test' })); // skip request logging during tests
server.use(helmet());
server.use(cors());
server.use(express.json());

server.get('/', (_: Request, res: Response) => {
  res.json({
    message: '🦄🌈✨👋🌎🌍🌏✨🌈🦄',
  });
});

server.use('/api/v1', apiV1);

server.post('/trovaUtente', async (req: Request, res: Response) => {
  const { email } = req.body;

  const users = await getAllUtenti();
  const u = users.find((user) => user.email === email);

  if (u) {
    return res.status(200).json({ user: u });
  }
  return res.status(403).json({ message: 'utente non trovato' });
});

export default server;
