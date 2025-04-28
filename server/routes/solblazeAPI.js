import express from 'express';
import axios from 'axios';

const router = express.Router();

// Helper funkcija za slanje zahteva
const fetchExternalData = async (url, headers = {}) => {
  const response = await axios.get(url, { headers });
  return response.data;
};

// GET /api/bsol-price - Cena bSOL-a sa CoinGecko
router.get('/bsol-price', async (req, res) => {
  try {
    const data = await fetchExternalData('https://pro-api.coingecko.com/api/v3/simple/price?ids=blazestake-staked-sol&vs_currencies=usd', {
      'x-cg-pro-api-key': process.env.COINGECKO_API_KEY,
    });
    res.json(data);
  } catch (error) {
    console.error('Error fetching bSOL price:', error.message);
    res.status(500).json({ error: 'Failed to fetch bSOL price' });
  }
});

// GET /api/validators - Lista validatora sa SolBlaze
router.get('/validators', async (req, res) => {
  try {
    const data = await fetchExternalData('https://stake.solblaze.org/api/v1/validator_set');
    res.json(data);
  } catch (error) {
    console.error('Error fetching SolBlaze validator data:', error.message);
    res.status(500).json({ error: 'Failed to fetch SolBlaze validators' });
  }
});

// GET /api/staking - Informacije o stakingu sa SolBlaze
router.get('/staking', async (req, res) => {
  try {
    const data = await fetchExternalData('https://stake.solblaze.org/api/v1/staking');
    res.json(data);
  } catch (error) {
    console.error('Error fetching SolBlaze staking data:', error.message);
    res.status(500).json({ error: 'Failed to fetch SolBlaze staking data' });
  }
});

export default router;
