// src/middlewares/errorHandler.js

export const errorHandler = (err, req, res, next) => {
  console.error('🔥 [Error Handling Middleware] Menangkap error:', err.message);

  // Jika error berasal dari Inspektur Mutu (Validasi Joi) atau Client Error (400)
  if (err.name === 'ValidationError' || err.statusCode === 400) {
    return res.status(400).json({
      status: 'fail',
      message: err.message,
    });
  }

  // Jika error karena masalah Autentikasi/Otorisasi (nanti di Level 5)
  if (err.statusCode === 401) {
    return res.status(401).json({
      status: 'fail',
      message: err.message,
    });
  }

  // Jika terjadi ledakan di Gudang/Database (Server Error 500)
  return res.status(500).json({
    status: 'error',
    message: 'Maaf, terjadi kegagalan pada server internal kami.',
  });
};