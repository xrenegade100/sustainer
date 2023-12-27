import { RowDataPacket } from 'mysql2/promise';
import db from '../db/poolDB';

const getAllUtenti = async () => {
  const connection = await db();
  const users = await connection.query('SELECT * FROM utente');

  return (users[0] as RowDataPacket[]);
};


const getUtenteByMail = async (email: string) => {
  console.log(email); 

  const connection = await db();
  const user = await connection.query('SELECT * FROM utente WHERE email = ?', email) as RowDataPacket[];
  console.log(user[0][0]);
  return (user[0][0]);
  /* const result = (await user).map((user: any) => ({
    id: user.id,
    nome: user.nome,
    cognome: user.cognome,
    email: user.email,
    password: user.password,
    data_nascita: user.data_nascita,
    data_registrazione: user.data_registrazione,
    is_admin: user.is_admin, 
  })); */
};


export { getUtenteByMail };
