import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import axios from 'axios';

const router = express.Router();

const API_BASE_URL = process.env.SOLBLAZE_API_URL;

console.log('API Base URL:', API_BASE_URL);

// Ruta za APY podatke
router.get('/apy', async (req, res) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/apy`);
    res.json(response.data);
  } catch (error) {
    console.error('Error fetching data:', error.response ? error.response.data : error.message);
    res.status(500).json({ error: 'Failed to fetch APY data' });
  }
});

// Ruta za broj validatora
router.get('/validator_count', async (req, res) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/validator_count`);
    res.json(response.data);
  } catch (error) {
    console.error('Error fetching data:', error.response ? error.response.data : error.message);
    res.status(500).json({ error: 'Failed to fetch validator count data' });
  }
});

export default router;
