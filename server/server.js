// server/server.js

import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import cors from 'cors';
import axios from 'axios';
import solBlazeAPI from './routes/solblazeAPI.js'; // Ako postoji, neka ostane

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// SolBlaze API rute
app.use('/api', solBlazeAPI);

// 🔁 Account info ruta — prebačena iz index.js
app.post("/api/account-info", async (req, res) => {
  const { address } = req.body;

  if (!address) {
    return res.status(400).json({ error: "Missing address in request body." });
  }

  try {
    const response = await axios.post("https://api.mainnet-beta.solana.com", {
      jsonrpc: "2.0",
      id: 1,
      method: "getAccountInfo",
      params: [
        address,
        {
          encoding: "jsonParsed",
        },
      ],
    });

    res.json(response.data);
  } catch (error) {
    console.error("RPC call failed:", error.message);
    res.status(500).json({ error: "Failed to fetch account info from Solana RPC." });
  }
});

// 🔁 APY ruta
app.get('/api/apy', async (req, res) => {
  try {
    const response = await axios.get(`${process.env.SOLBLAZE_API_URL}/apy`);
    res.json(response.data);
  } catch (error) {
    console.error('Error fetching APY:', error.message);
    res.status(500).json({ error: 'Failed to fetch APY data' });
  }
});

// 🔁 Prices ruta
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

// 🔁 Validator info ruta
app.get('/api/validator/:votePubkey', async (req, res) => {
  const { votePubkey } = req.params;
  
  try {
    const response = await axios.post('https://api.mainnet-beta.solana.com', {
      jsonrpc: "2.0",
      id: 1,
      method: "getVoteAccounts",
      params: []
    });

    const allValidators = response.data.result.current.concat(response.data.result.delinquent);
    const validator = allValidators.find(v => v.votePubkey === votePubkey);

    if (!validator) {
      return res.status(404).json({ message: "Validator not found" });
    }

    const recentVotes = [
      { slot: 12345678, confirmationStatus: 'confirmed' },
      { slot: 12345679, confirmationStatus: 'confirmed' },
    ];

    res.json({ ...validator, recentVotes });

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch validator info' });
  }
});

app.listen(PORT, () => {
  console.log(`✅ Unified server running at http://localhost:${PORT}`);
});
