// src/validations/companies/schema.js
import Joi from 'joi';

export const CompanyPayloadSchema = Joi.object({
  name: Joi.string().required(),
  location: Joi.string().required()
});