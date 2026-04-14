import app from './src/app.js';

import companiesRoutes from './src/routes/companiesRoutes.js';
import authenticationsRoutes from './src/routes/authenticationsRoutes.js';
import 'dotenv/config';

const port = process.env.PORT || 5000;
const host = process.env.HOST || 'localhost';

app.listen(port, host, () => {
  console.log(`🚀 Server OpenJob API telah menyala di http://${host}:${port}`);
});

// Lalu di bagian bawah tempat Tuan memanggil app.use('/users', ...), tambahkan:
app.use('/authentications', authenticationsRoutes);
app.use('/companies', companiesRoutes);