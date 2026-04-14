// src/middlewares/validator.js

export const validate = (schema) => {
  return (req, res, next) => {
    // Inspektur mengecek data (req.body) dengan skema Joi yang diberikan
    const { error } = schema.validate(req.body, { abortEarly: false });
    
    if (error) {
      // Jika ada bahan yang busuk/salah format, kumpulkan pesan errornya
      const errorMessage = error.details.map((detail) => detail.message).join(', ');
      
      const err = new Error(errorMessage);
      err.name = 'ValidationError';
      err.statusCode = 400;
      
      // Tendang error ini ke Petugas P3K (errorHandler) di app.js
      return next(err);
    }
    
    // Jika bahan aman, biarkan masuk ke dapur (Controller)
    next();
  };
};