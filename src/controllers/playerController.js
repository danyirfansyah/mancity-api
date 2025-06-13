// src/controllers/playerController.js

import playerModel from '../data/players.js';

// ... (getAllPlayers, getPlayerById tetap sama) ...

export const createPlayer = (req, res) => {
  try {
    const { nama, harga } = req.body;

    if (!nama || !harga || !req.file) {
      return res.status(400).json({
        success: false,
        message: "Nama, harga, dan foto wajib diisi"
      });
    }

    // req.file.path sekarang adalah URL LENGKAP dari Cloudinary!
    const fotoUrl = req.file.path;

    const newPlayer = playerModel.create({ nama, harga, foto: fotoUrl });
    
    res.status(201).json({ success: true, data: newPlayer });

  } catch (error) {
    console.error("Error saat membuat pemain:", error);
    res.status(500).json({ success: false, message: "Gagal menambah pemain" });
  }
};

// ... (updatePlayer, deletePlayer tetap sama) ...

// Pastikan Anda export semua fungsi yang dibutuhkan
export { getAllPlayers, getPlayerById, updatePlayer, deletePlayer };