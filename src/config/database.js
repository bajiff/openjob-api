import pg from 'pg';
import 'dotenv/config'; 
const { Pool } = pg;

const pool = new Pool({
  user: process.env.PGUSER,
  host: process.env.PGHOST,
  database: process.env.PGDATABASE,
  password: process.env.PGPASSWORD,
  port: process.env.PGPORT,
});

pool.connect((err, client, release) => {
  if (err) {
    return console.error('Truk gagal masuk gudang! Cek kredensial database:', err.stack);
  }
  console.log('Armada Truk berhasil terhubung ke Gudang PostgreSQL!');
  release();
});

export default pool;