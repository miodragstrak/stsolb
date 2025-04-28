import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import cors from 'cors';
import axios from 'axios';

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Ruta za APY sa SolBlaze
app.get('/api/apy', async (req, res) => {
  try {
    const response = await axios.get(`${process.env.SOLBLAZE_API_URL}/apy`);
    res.json(response.data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch APY data' });
  }
});

// Ruta za cene sa CoinGecko
app.get('/api/prices', async (req, res) => {
  try {
    const response = await axios.get(
      'https://api.coingecko.com/api/v3/simple/price?ids=solana,blazestake-staked-sol&vs_currencies=usd'
    );
    res.json(response.data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch price data' });
  }
});

// Ruta za APY za Validators
app.get('/api/validators', async (req, res) => {
  try {
    const response = await axios.get(`${process.env.SOLBLAZE_API_URL}/validator_set`);
    res.json(response.data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch the validators list' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
