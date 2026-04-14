import app from './src/app.js';
import 'dotenv/config';

const port = process.env.PORT || 5000;
const host = process.env.HOST || 'localhost';

app.listen(port, host, () => {
  console.log(`🚀 Server OpenJob API telah menyala di http://${host}:${port}`);
});