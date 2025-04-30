import express from 'express';
import axios from 'axios';

const router = express.Router();

router.get("/account-info", async (req, res) => {
  const { address } = req.query;

  if (!address) {
    return res.status(400).json({ error: "Missing address in query params" });
  }

  try {
    const response = await axios.post("https://api.mainnet-beta.solana.com", {
      jsonrpc: "2.0",
      id: 1,
      method: "getAccountInfo",
      params: [address, { encoding: "jsonParsed" }],
    });

    const result = response.data?.result?.value;

    if (!result) {
      return res.status(404).json({ error: "Account not found or no data returned." });
    }

    const lamports = result.lamports || 0;
    const sol = lamports / 1e9;
    const owner = result.owner || "Unknown";
    const parsed = result.data?.parsed;

    const accountData = {
      lamports,
      sol,
      owner,
      program: parsed?.program || null,
      type: parsed?.type || null,
      details: parsed?.info || null,
    };

    res.json(accountData);
  } catch (error) {
    console.error("❌ Error fetching account info:", error.message);
    res.status(500).json({ error: "Failed to fetch account info" });
  }
});

router.get('/vote-credits/:voteAddress', async (req, res) => {
  const { voteAddress } = req.params;

  try {
    const response = await axios.post("https://api.mainnet-beta.solana.com", {
      jsonrpc: "2.0",
      id: 1,
      method: "getVoteAccounts",
      params: []
    });

    const all = response.data.result.current.concat(response.data.result.delinquent);
    const vote = all.find(v => v.votePubkey === voteAddress);

    if (!vote) {
      return res.status(404).json({ error: "Vote account not found" });
    }

    res.json({
      epochCredits: vote.epochCredits,
      status: vote.delinquent ? "❌ Delinquent" : "✅ Active"
    });

  } catch (error) {
    console.error("❌ Error fetching vote credits:", error.message);
    res.status(500).json({ error: "Failed to fetch vote account info" });
  }
});

export default router;
