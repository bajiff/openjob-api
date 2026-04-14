// src/middlewares/authMiddleware.js
import jwt from 'jsonwebtoken';

export const authenticateToken = (req, res, next) => {
  // 1. Minta kartu akses dari header request (biasanya formatnya "Bearer [TOKEN]")
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]; 

  // 2. Kalau tidak bawa token, usir!
  if (!token) {
    const error = new Error('Akses ditolak. Token tidak ditemukan.');
    error.statusCode = 401; // Unauthorized
    return next(error);
  }

  // 3. Kalau bawa token, cek keaslian stempelnya pakai kunci rahasia kita
  jwt.verify(token, process.env.ACCESS_TOKEN_KEY, (err, decoded) => {
    if (err) {
      const error = new Error('Token tidak valid atau sudah kedaluwarsa.');
      error.statusCode = 401; // Unauthorized
      return next(error);
    }
    
    // 4. Jika asli, catat ID tamu ini dan silakan masuk ke ruangan (lanjut ke controller)
    req.user = decoded; 
    next(); 
  });
};