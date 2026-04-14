// src/controllers/usersController.js
import { addUser } from '../services/usersService.js';

export const registerUser = async (req, res, next) => {
  try {
    // 1. Ambil data dari pelanggan (sudah dijamin aman oleh Joi)
    const { fullname, email, password } = req.body;

    // 2. Berikan ke Koki Utama (Service)
    const userId = await addUser({ fullname, email, password });

    // 3. Kembalikan makanan (respons) yang sudah jadi ke Pelanggan
    res.status(201).json({
      status: 'success',
      message: 'User berhasil didaftarkan',
      data: {
        userId,
      },
    });
  } catch (error) {
    // Jika Koki teriak ada masalah (misal email ganda), panggil Petugas P3K
    next(error);
  }
};