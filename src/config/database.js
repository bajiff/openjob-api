import pg from 'pg';
import 'dotenv/config'; // Mantra modern untuk membaca file .env

const { Pool } = pg;

// Membuat armada truk (Connection Pool) berdasarkan kredensial di .env
const pool = new Pool({
  user: process.env.PGUSER,
  host: process.env.PGHOST,
  database: process.env.PGDATABASE,
  password: process.env.PGPASSWORD,
  port: process.env.PGPORT,
});

// Test koneksi (Opsional, untuk memastikan jalan tidak terputus)
pool.connect((err, client, release) => {
  if (err) {
    return console.error('Truk gagal masuk gudang! Cek kredensial database:', err.stack);
  }
  console.log('Armada Truk berhasil terhubung ke Gudang PostgreSQL!');
  release();
});

export default pool; // Mengekspor Pool agar bisa dipakai Koki (Services)