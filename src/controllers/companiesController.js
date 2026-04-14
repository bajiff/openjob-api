// src/controllers/companiesController.js
import { addCompany } from '../services/companiesService.js';
import { CompanyPayloadSchema } from '../validations/companies/schema.js';

export const createCompany = async (req, res, next) => {
  try {
    // 1. Cek paketan dari Postman
    const { error, value } = CompanyPayloadSchema.validate(req.body);
    if (error) {
      const err = new Error(error.details[0].message);
      err.statusCode = 400;
      throw err;
    }

    // 2. Suruh Koki masak
    const { name, location } = value;
    const companyId = await addCompany({ name, location });

    // 3. Hidangkan ke Postman
    res.status(201).json({
      status: 'success',
      message: 'Company berhasil ditambahkan',
      data: {
        id: companyId,
      },
    });
  } catch (err) {
    next(err);
  }
};