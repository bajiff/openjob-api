import bcrypt from 'bcrypt';
import pool from '../config/database.js';

// Ubah penerimaan parameter menjadi 'name'
export const addUser = async ({ name, email, password }) => {
  const checkQuery = {
    text: 'SELECT email FROM users WHERE email = $1',
    values: [email],
  };
  const checkResult = await pool.query(checkQuery);
  
  if (checkResult.rowCount > 0) {
    const error = new Error('Gagal menambahkan user. Email sudah digunakan.');
    error.statusCode = 400;
    throw error;
  }

  const id = `user-${Date.now()}`; 
  const hashedPassword = await bcrypt.hash(password, 10);

  // Masukkan variabel 'name' ke dalam kolom 'fullname' di database
  const insertQuery = {
    text: 'INSERT INTO users (id, fullname, email, password) VALUES ($1, $2, $3, $4) RETURNING id',
    values: [id, name, email, hashedPassword], 
  };

  const result = await pool.query(insertQuery);
  return result.rows[0].id; 
};

export const getUserById = async (id) => {
  const query = {
    // Kita gunakan alias "AS name" agar outputnya menjadi 'name', bukan 'fullname'
    text: 'SELECT id, fullname AS name, email FROM users WHERE id = $1',
    values: [id],
  };

  const result = await pool.query(query);

  // Jika gudang kosong (user tidak ada), lemparkan error 404
  if (result.rowCount === 0) {
    const error = new Error('User tidak ditemukan');
    error.statusCode = 404; // Status 404 Not Found
    throw error;
  }

  // Kembalikan data user
  return result.rows[0];
};