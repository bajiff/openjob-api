import express from 'express';
import { errorHandler } from './middlewares/errorHandler';

const app = express();

app.use(express.json());

app.get('/', (req, res) => {
  res.status(200).json({
    status: 'success',
    message: 'Selamat datang di Dapur MBG OpenJob API v1!',
  });
});

// Nanti kita akan tambahkan Error Handling Middleware di sini...
// 

app.use(errorHandler);
export default app;