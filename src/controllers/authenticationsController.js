// src/controllers/authenticationsController.js
import jwt from 'jsonwebtoken';
import { verifyUserCredential } from '../services/usersService.js';
import { PostAuthenticationPayloadSchema } from '../validations/authentications/schema.js';

export const loginUser = async (req, res, next) => {
  try {
    // 1. Validasi request dari Postman (harus ada email & password)
    const { error, value } = PostAuthenticationPayloadSchema.validate(req.body);
    if (error) {
      const err = new Error(error.details[0].message);
      err.statusCode = 400;
      throw err;
    }

    const { email, password } = value;

    // 2. Suruh koki ngecek keaslian email dan password
    const userId = await verifyUserCredential(email, password);

    // 3. Cetak Access Token (Kartu Akses Utama)
    const accessToken = jwt.sign({ id: userId }, process.env.ACCESS_TOKEN_KEY, {
      expiresIn: parseInt(process.env.ACCESS_TOKEN_AGE, 10), 
    });

    // 4. Cetak Refresh Token (Kartu Cadangan)
    const refreshToken = jwt.sign({ id: userId }, process.env.REFRESH_TOKEN_KEY);

    // 5. Berikan ke Postman
    res.status(201).json({
      status: 'success',
      message: 'Authentication berhasil ditambahkan',
      data: {
        accessToken,
        refreshToken,
      },
    });
  } catch (error) {
    next(error);
  }
};