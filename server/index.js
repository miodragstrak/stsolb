// server/index.js
const express = require("express");
const cors = require("cors");
const axios = require("axios");

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

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

app.listen(PORT, () => {
  console.log(`✅ Server is running on http://localhost:${PORT}`);
});
