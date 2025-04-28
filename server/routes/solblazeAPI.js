import express from 'express';
import axios from 'axios';

const router = express.Router();

// API za dobijanje cene bSOL-a sa CoinGecko
router.get('/bsol-price', async (req, res) => {
  try {
    const response = await axios.get('https://pro-api.coingecko.com/api/v3/simple/price', {
      params: {
        ids: 'blazestake-staked-sol',
        vs_currencies: 'usd',
      },
      headers: {
        'x-cg-pro-api-key': process.env.COINGECKO_API_KEY,
      },
    });

    res.json(response.data);
  } catch (error) {
    console.error('Error fetching bSOL price:', error.message);
    res.status(500).json({ error: 'Failed to fetch bSOL price' });
  }
});

// SolBlaze API endpoint za dobijanje informacija o validatorima
router.get('/validators', async (req, res) => {
  try {
    const response = await axios.get('https://stake.solblaze.org/api/v1/validator_set');
    res.json(response.data);
  } catch (error) {
    console.error('Error fetching SolBlaze validator data:', error.message);
    res.status(500).json({ error: 'Failed to fetch SolBlaze validators' });
  }
});

// SolBlaze API endpoint za dobijanje informacija o stakingu
router.get('/staking', async (req, res) => {
  try {
    const response = await axios.get('https://stake.solblaze.org/api/v1/staking');
    res.json(response.data);
  } catch (error) {
    console.error('Error fetching SolBlaze staking data:', error.message);
    res.status(500).json({ error: 'Failed to fetch SolBlaze staking data' });
  }
});

export default router;
