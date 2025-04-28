import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import cors from 'cors';
import solBlazeAPI from './routes/solblazeAPI.js'; // ← Dodato
import axios from 'axios';

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Uključivanje svih SolBlaze ruta ispod /api
app.use('/api', solBlazeAPI);

// Dodatne rute koje nisu u SolBlazeAPI:

// GET /api/apy - APY sa SolBlaze
app.get('/api/apy', async (req, res) => {
  try {
    const response = await axios.get(`${process.env.SOLBLAZE_API_URL}/apy`);
    res.json(response.data);
  } catch (error) {
    console.error('Error fetching APY:', error.message);
    res.status(500).json({ error: 'Failed to fetch APY data' });
  }
});

// GET /api/prices - Cene SOL i bSOL sa CoinGecko (bez PRO API ključa)
app.get('/api/prices', async (req, res) => {
  try {
    const response = await axios.get('https://api.coingecko.com/api/v3/simple/price', {
      params: {
        ids: 'solana,blazestake-staked-sol',
        vs_currencies: 'usd',
      },
    });
    res.json(response.data);
  } catch (error) {
    console.error('Error fetching prices:', error.message);
    res.status(500).json({ error: 'Failed to fetch price data' });
  }
});

// Pokretanje servera
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
