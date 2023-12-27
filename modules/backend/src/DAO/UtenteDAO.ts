import { RowDataPacket } from 'mysql2/promise';
import db from '../db/poolDB';

const getAllUtenti = async () => {
  const connection = await db();
  const users = await connection.query('SELECT * FROM utente');

  return users[0] as RowDataPacket[];
};

const getUtenteByMail = async (email: string) => {
  console.log(email);

  const connection = await db();
  const user = (await connection.query(
    'SELECT * FROM utente WHERE email = ?',
    email,
  )) as RowDataPacket[];
  console.log(user[0][0]);
  return user[0][0];
};

const setUtentiRegistrazione = async (nome: string, cognome: string, email: string, password: string) => {
  const connection = await db();
  const user = await connection.query(
    'INSERT INTO utente (nome, cognome, email, password) VALUES (?, ?, ?, ?)',
    [nome, cognome, email, password],
  );
  return user;
};

export { getAllUtenti };
export { getUtenteByMail };
export { setUtentiRegistrazione };