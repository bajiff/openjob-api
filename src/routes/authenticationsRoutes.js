// src/routes/authenticationsRoutes.js
import express from 'express';
import { loginUser } from '../controllers/authenticationsController.js';

const router = express.Router();

// Rute untuk Login (POST)
router.post('/', loginUser);

export default router;