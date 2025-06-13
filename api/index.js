import express from 'express';
import serverless from 'serverless-http';
import playerRoutes from '../src/routes/playerRoutes.js';

const app = express();

app.use(express.json());

// Routing utama
app.use('/api/players', playerRoutes);

// Tes root
app.get('/', (req, res) => {
  res.send('Man City API is running ✅');
});

export const handler = serverless(app);
