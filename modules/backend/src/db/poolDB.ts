import mysql from 'mysql2/promise';

let conn: mysql.Connection | null = null;

const initConnection = async () => {
  if (!conn) {
    conn = await mysql.createConnection({
      host: '127.0.0.1',
      user: 'root',
      password: 'admin',
      database: 'susdb',
      port: 3006,
      insecureAuth: true,
    });

    await conn.connect();
  }
  return conn;
};

export default initConnection;
