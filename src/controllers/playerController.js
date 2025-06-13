import playerModel from '../data/players.js';

// PASTIKAN ADA 'export' DI SINI
export const getAllPlayers = (req, res) => {
  try {
    const data = playerModel.getAll();
    res.json({ success: true, data });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// PASTIKAN ADA 'export' DI SINI
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

// PASTIKAN ADA 'export' DI SINI
export const createPlayer = (req, res) => {
  try {
    const { nama, harga } = req.body;

    if (!nama || !harga || !req.file) {
      return res.status(400).json({
        success: false,
        message: "Nama, harga, dan foto wajib diisi"
      });
    }

    const fotoUrl = req.file.path;
    const newPlayer = playerModel.create({ nama, harga, foto: fotoUrl });

    res.status(201).json({ success: true, data: newPlayer });
  } catch (error) {
    console.error("Error saat membuat pemain:", error);
    res.status(500).json({ success: false, message: "Gagal menambah pemain" });
  }
};

// PASTIKAN ADA 'export' DI SINI
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

// PASTIKAN ADA 'export' DI SINI
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