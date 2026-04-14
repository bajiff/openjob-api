// src/validations/users/schema.js
import Joi from 'joi';

export const UserPayloadSchema = Joi.object({
  fullname: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});