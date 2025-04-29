import axios from "axios";

const SOLANA_RPC_URL = "https://api.mainnet-beta.solana.com";

export async function getAccountInfo(address) {
  const response = await axios.post(SOLANA_RPC_URL, {
    jsonrpc: "2.0",
    id: 1,
    method: "getAccountInfo",
    params: [address, { encoding: "jsonParsed" }],
  });

  return response.data.result;
}
