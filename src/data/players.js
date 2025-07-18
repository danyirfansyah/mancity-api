let players = [
  {
    id: 1,
    nama: "Ederson",
    harga: 50000000,
    foto: "https://assets.goal.com/images/v3/blt87c22cc9bccdda92/GOAL%20-%20Blank%20WEB%20-%20Facebook%20(65).png?auto=webp&format=pjpg&width=1080&quality=60"
  },
  {
    id: 2,
    nama: "Kyle Walker",
    harga: 15000000,
    foto: "https://img.a.transfermarkt.technology/portrait/big/95424-1668090663.jpg?lm=1"
  },
  {
    id: 3,
    nama: "Rúben Dias",
    harga: 75000000,
    foto: "https://img.a.transfermarkt.technology/portrait/big/258004-1684921271.jpg?lm=1"
  }
];

const playerModel = {
  getAll: () => players,

  getById: (id) => players.find(p => p.id === id),

  // ================== KODE YANG DIPERBAIKI MULAI DARI SINI ==================
  create: ({ nama, harga, foto }) => { // 1. Menerima 'foto' sebagai parameter
    const player = {
      id: players.length > 0 ? Math.max(...players.map(p => p.id)) + 1 : 1,
      nama,
      harga: parseInt(harga), // 2. Mengonversi harga menjadi angka
      foto: foto // 3. Menggunakan URL foto dari parameter, bukan hardcode
    };
    players.push(player);
    return player;
  },
  // ================== KODE YANG DIPERBAIKI SELESAI DI SINI ==================

  update: (id, { nama, harga }) => {
    const index = players.findIndex(p => p.id === id);
    if (index !== -1) {
      if (nama) players[index].nama = nama;
      if (harga) players[index].harga = harga;
      return players[index];
    }
    return null;
  },

  delete: (id) => {
    const index = players.findIndex(p => p.id === id);
    if (index !== -1) {
      return players.splice(index, 1)[0];
    }
    return null;
  }
};

export default playerModel;