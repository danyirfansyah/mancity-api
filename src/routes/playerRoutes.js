// src/routes/playerRoutes.js

import express from 'express';
import * as playerController from '../controllers/playerController.js';
import multer from 'multer';
import { v2 as cloudinary } from 'cloudinary';
import { CloudinaryStorage } from 'multer-storage-cloudinary';

const router = express.Router();

// Konfigurasi Cloudinary menggunakan Environment Variables
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Konfigurasi penyimpanan Multer ke Cloudinary
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'mancity-players', // Nama folder di Cloudinary
    allowedFormats: ['jpeg', 'png', 'jpg'], // Format yang diizinkan
  },
});

// Inisialisasi Multer dengan storage Cloudinary
const upload = multer({ storage: storage });

// Endpoint untuk tambah pemain (dengan foto ke Cloudinary)
// 'foto' harus sama dengan nama field di Android (MultipartBody.Part.createFormData("foto", ...))
router.post('/', upload.single('foto'), playerController.createPlayer);

// Endpoint lainnya (tidak berubah)
router.get('/', playerController.getAllPlayers);
router.get('/:id', playerController.getPlayerById);
router.put('/:id', playerController.updatePlayer); // Catatan: updatePlayer belum menangani foto, hanya create
router.delete('/:id', playerController.deletePlayer);

export default router;