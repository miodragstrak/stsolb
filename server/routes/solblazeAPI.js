import express from 'express';
import axios from 'axios';

const router = express.Router();

const fetchExternalData = async (url, headers = {}) => {
  const response = await axios.get(url, { headers });
  return response.data;
};

router.get('/bsol-price', async (req, res) => {
  try {
     const response = await axios.get('https://api.coingecko.com/api/v3/simple/price', {
      params: {
        ids: 'blazestake-staked-sol',
        vs_currencies: 'usd',
      },
    });
    res.json(response.data);
  } catch (error) {
    console.error('Error fetching bSOL price:', error.message);
    res.status(500).json({ error: 'Failed to fetch bSOL price' });
  }
});

router.get('/sol-price', async (req, res) => {
  try {
     const response = await axios.get('https://api.coingecko.com/api/v3/simple/price', {
      params: {
        ids: 'solana',
        vs_currencies: 'usd',
      },
    });
    res.json(response.data);
  } catch (error) {
    console.error('Error fetching SOL price:', error.message);
    res.status(500).json({ error: 'Failed to fetch SOL price' });
  }
});

router.get('/validators', async (req, res) => {
  try {
    const data = await fetchExternalData(`${process.env.SOLBLAZE_API_URL}/validator_set`);
    res.json(data);
  } catch (error) {
    console.error('Error fetching SolBlaze validator data:', error.message);
    res.status(500).json({ error: 'Failed to fetch SolBlaze validators' });
  }
});

router.get('/staking', async (req, res) => {
  try {
    const data = await fetchExternalData(`${process.env.SOLBLAZE_API_URL}/staking`);
    res.json(data);
  } catch (error) {
    console.error('Error fetching SolBlaze staking data:', error.message);
    res.status(500).json({ error: 'Failed to fetch SolBlaze staking data' });
  }
});

router.get('/apy', async (req, res) => {
  try {
    const response = await axios.get(`${process.env.SOLBLAZE_API_URL}/apy`);
    res.json(response.data);
  } catch (error) {
    console.error('Error fetching APY:', error.message);
    res.status(500).json({ error: 'Failed to fetch APY data' });
  }
});


export default router;
