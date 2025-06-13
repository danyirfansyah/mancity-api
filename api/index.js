import express from 'express';
import serverless from 'serverless-http';
import playerRoutes from '../src/routes/playerRoutes.js';

const app = express();
app.use(express.json());

// Tambahkan ini untuk mengecek root
app.get('/', (req, res) => {
  res.send('API is running');
});

app.use('/api/players', playerRoutes);

export const handler = serverless(app);
