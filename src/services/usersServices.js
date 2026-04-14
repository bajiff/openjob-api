// src/services/usersService.js
import bcrypt from 'bcrypt';
import pool from '../config/database.js';

export const addUser = async ({ fullname, email, password }) => {
  // 1. Pengecekan Ketersediaan Email
  const checkQuery = {
    text: 'SELECT email FROM users WHERE email = $1',
    values: [email],
  };
  const checkResult = await pool.query(checkQuery);
  
  if (checkResult.rowCount > 0) {
    const error = new Error('Gagal menambahkan user. Email sudah digunakan.');
    error.statusCode = 400; // Melemparkan error 400 agar ditangkap Petugas P3K kita
    throw error;
  }

  // 2. Persiapan Bahan Baku (Membuat ID unik dan mengacak Password)
  // Karena kolom id kita VARCHAR(50), kita bisa gunakan kombinasi string dan timestamp
  const id = `user-${Date.now()}`; 
  const hashedPassword = await bcrypt.hash(password, 10);

  // 3. Eksekusi Pengiriman ke Gudang (PostgreSQL)
  const insertQuery = {
    text: 'INSERT INTO users (id, fullname, email, password) VALUES ($1, $2, $3, $4) RETURNING id',
    values: [id, fullname, email, hashedPassword],
  };

  const result = await pool.query(insertQuery);
  
  // Mengembalikan ID user yang baru saja dibuat
  return result.rows[0].id; 
};