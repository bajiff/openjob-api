// src/validations/users/schema.js
import Joi from 'joi';

export const UserPayloadSchema = Joi.object({
  name: Joi.string().required(),          email: Joi.string().email().required(),
  password: Joi.string().required(),
  role: Joi.string().optional()          
});