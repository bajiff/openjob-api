// src/routes/usersRoute.js
import express from 'express';
import { registerUser } from '../controllers/usersController.js';
import { validate } from '../middlewares/validator.js';
import { UserPayloadSchema } from '../validations/users/schema.js';

const router = express.Router();

// Jalur POST / dipasangi 2 penjaga: 
// 1. Inspektur Joi (validate)
// 2. Jika lolos, masuk ke Pelayan (registerUser)
router.post('/', validate(UserPayloadSchema), registerUser);

export default router;