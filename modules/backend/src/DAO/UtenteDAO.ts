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

/* 
metodo che inserisce un utente nel database e gli assegna un piano free (preso dalla tabella piano con tipo free) 
e aggiunge un acquisto (nella tabella acquisto) con id_utente, id_piano e data_acquisto
*/
const setUtentiRegistrazione = async (
  nome: string,
  cognome: string,
  email: string,
  password: string,
) => {
  const connection = await db();
  const user = await connection.query(
    'INSERT INTO utente (nome, cognome, email, password) VALUES (?, ?, ?, ?)',
    [nome, cognome, email, password],
  );

  const piano = await connection.query(
    'SELECT id_piano FROM piano WHERE tipo = Free',
  );

  const acquisto = await connection.query(
    'INSERT INTO acquisto (id_utente, id_piano, data_acquisto) VALUES (?, ?,?)',
    [user[0].id_utente, piano[0].id_piano, new Date()],
  );

  return user;
};

export { getAllUtenti };
export { getUtenteByMail };
export { setUtentiRegistrazione };
