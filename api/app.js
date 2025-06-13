import express from 'express';
import bodyParser from 'body-parser';
import playerRoutes from '../src/routes/playerRoutes.js'; // Pastikan path ini benar sesuai struktur folder Anda
import path from 'path';
import { fileURLToPath } from 'url';

const app = express();

// ✅ Ini benar: definisi __dirname dalam ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(bodyParser.json());

// ✅ Menyajikan folder "uploads" secara publik (Ingat, ini read-only di Vercel)
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

// ❌ BAGIAN INI TELAH DIHAPUS KARENA MENYEBABKAN CRASH DI VERCEL
/*
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server berjalan di port ${PORT}`);
});
*/

// ✅ TAMBAHKAN BARIS INI DI AKHIR FILE
// Ini adalah cara yang benar untuk Vercel
export default app;