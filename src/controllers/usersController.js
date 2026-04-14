// src/controllers/usersController.js
import { addUser } from '../services/usersService.js';
import { getUserById } from '../services/usersService.js';

export const registerUser = async (req, res, next) => {
  try {
    // 1. Ambil 'name' dan 'role' (sesuaikan dengan Postman)
    const { name, email, password, role } = req.body;

    // 2. Berikan ke Koki
    const userId = await addUser({ name, email, password, role });

    // 3. Kembalikan respons sesuai format yang diminta script Postman
    res.status(201).json({
      status: 'success',
      message: 'User berhasil didaftarkan',
      data: {
        id: userId, // <-- PERUBAHAN PENTING: Postman mencari 'id'
      },
    });
  } catch (error) {
    next(error);
  }
};
// 2. Tambahkan fungsi baru ini di bawah registerUser:
export const getUserByIdHandler = async (req, res, next) => {
  try {
    // Ambil ID dari URL (req.params)
    const { id } = req.params;

    // Suruh Koki mengambil data user
    const user = await getUserById(id);

    // Hidangkan ke Postman dengan status 200 OK
    res.status(200).json({
      status: 'success',
      data: {
        user,
      },
    });
  } catch (error) {
    next(error); // Lempar ke Petugas P3K jika error (misal 404 tadi)
  }
};