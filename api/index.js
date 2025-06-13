import express from 'express';
import serverless from 'serverless-http';
import playerRoutes from '../src/routes/playerRoutes.js';

const app = express();
app.use(express.json());

app.use('/api/players', playerRoutes);

app.get('/', (req, res) => {
  res.send('API is running...');
});

export const handler = serverless(app);
