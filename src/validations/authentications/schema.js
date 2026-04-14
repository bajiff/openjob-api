// src/validations/authentications/schema.js
import Joi from 'joi';

export const PostAuthenticationPayloadSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});