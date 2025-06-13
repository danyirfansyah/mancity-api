import express from 'express';
import bodyParser from 'body-parser';
import playerRoutes from '../src/routes/playerRoutes.js';
import path from 'path';
import { fileURLToPath } from 'url';

const app = express();
const PORT = process.env.PORT || 3000;

// ✅ Ini benar: definisi __dirname dalam ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename); //

app.use(bodyParser.json());

// ✅ Menyajikan folder "uploads" secara publik
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));

// ✅ Routing utama
app.use('/api/players', playerRoutes);

// ✅ Handler untuk error internal
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ success: false, message: 'Terjadi kesalahan server' });
});

// ✅ Handler untuk endpoint tidak ditemukan
app.use((req, res) => {
  res.status(404).json({ success: false, message: 'Endpoint tidak ditemukan' });
});

// ✅ Mulai server (untuk local development)
app.listen(PORT, () => {
  console.log(`Server berjalan di port ${PORT}`);
});
