import playerModel from '../data/players.js';

export const getAllPlayers = (req, res) => {
  try {
    const data = playerModel.getAll();
    res.json({ success: true, data });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error" });
  }
};

export const getPlayerById = (req, res) => {
  try {
    const player = playerModel.getById(parseInt(req.params.id));
    if (!player) {
      return res.status(404).json({ 
        success: false, 
        message: "Pemain tidak ditemukan" 
      });
    }
    res.json({ success: true, data: player });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// ================== KODE YANG DIPERBAIKI MULAI DARI SINI ==================
export const createPlayer = (req, res) => {
  try {
    const { nama, harga } = req.body;

    // 1. Validasi diperbarui untuk mengecek file
    if (!nama || !harga || !req.file) {
      return res.status(400).json({
        success: false,
        message: "Nama, harga, dan foto wajib diisi"
      });
    }

    // 2. URL lengkap untuk foto dibuat dari informasi request
    // Contoh: http://localhost:3000/uploads/1718284858169.jpg
    const fotoUrl = `${req.protocol}://${req.get('host')}/${req.file.path.replace(/\\/g, "/")}`;

    // 3. 'fotoUrl' dikirim ke model bersama 'nama' dan 'harga'
    const newPlayer = playerModel.create({ nama, harga, foto: fotoUrl });
    
    res.status(201).json({ success: true, data: newPlayer });

  } catch (error) {
    // Menambahkan log error untuk mempermudah debugging di server
    console.error("Error saat membuat pemain:", error);
    res.status(500).json({ success: false, message: "Gagal menambah pemain" });
  }
};
// ================== KODE YANG DIPERBAIKI SELESAI DI SINI ==================


export const updatePlayer = (req, res) => {
  try {
    const { nama, harga } = req.body;

    if (!nama || !harga) {
      return res.status(400).json({
        success: false,
        message: "Nama dan harga wajib diisi"
      });
    }

    const updatedPlayer = playerModel.update(
      parseInt(req.params.id),
      { nama, harga }
    );

    if (!updatedPlayer) {
      return res.status(404).json({
        success: false,
        message: "Pemain tidak ditemukan"
      });
    }

    res.json({ success: true, data: updatedPlayer });
  } catch (error) {
    res.status(500).json({ success: false, message: "Gagal update pemain" });
  }
};

export const deletePlayer = (req, res) => {
  try {
    const deletedPlayer = playerModel.delete(parseInt(req.params.id));
    
    if (!deletedPlayer) {
      return res.status(404).json({
        success: false,
        message: "Pemain tidak ditemukan"
      });
    }

    res.json({ 
      success: true, 
      data: deletedPlayer,
      message: "Pemain berhasil dihapus"
    });
  } catch (error) {
    res.status(500).json({ success: false, message: "Gagal menghapus pemain" });
  }
};