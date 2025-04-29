// express endpoint
app.post("/api/account-info", async (req, res) => {
    const { address } = req.body;
    try {
      const response = await axios.post("https://api.mainnet-beta.solana.com", {
        jsonrpc: "2.0",
        id: 1,
        method: "getAccountInfo",
        params: [address, { encoding: "jsonParsed" }],
      });
  
      res.json(response.data);
    } catch (error) {
      console.error("Error fetching account info:", error);
      res.status(500).json({ error: "Failed to fetch account info" });
    }
  });
  