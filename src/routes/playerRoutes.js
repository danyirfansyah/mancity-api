import express from 'express';
import * as playerController from '../controllers/playerController.js';
import multer from 'multer';
import path from 'path';

const router = express.Router();

// Konfigurasi penyimpanan file foto
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname)); // Misalnya: 1627388123.jpg
    }
});

const upload = multer({ storage });

// Endpoint untuk tambah pemain (dengan foto)
router.post('/', upload.single('foto'), playerController.createPlayer);

// Endpoint lainnya
router.get('/', playerController.getAllPlayers);
router.get('/:id', playerController.getPlayerById);
router.put('/:id', upload.single('foto'), playerController.updatePlayer);
router.delete('/:id', playerController.deletePlayer);

export default router;
