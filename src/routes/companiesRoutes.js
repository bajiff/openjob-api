// src/routes/companiesRoutes.js
import express from 'express';
import { createCompany } from '../controllers/companiesController.js';

const router = express.Router();

router.post('/', createCompany);

export default router;