import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const AccountPage = () => {
  const { address } = useParams();
  const [accountData, setAccountData] = useState(null);
  const [voteData, setVoteData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!address) return;

    const fetchData = async () => {
      try {
        const [accountRes, voteRes] = await Promise.all([
          axios.get(`/api/solana/account-info?address=${address}`),
          axios.get(`/api/solana/vote-credits/${address}`),
        ]);

        setAccountData(accountRes.data);
        setVoteData(voteRes.data);
      } catch (err) {
        console.error("Greška:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [address]);

  const stability = (epochCredits) => {
    const deltas = epochCredits.map((e) => e.delta);
    const avg = deltas.reduce((a, b) => a + b, 0) / deltas.length;
    const recent = deltas.slice(-3);
    const drops = recent.filter((v) => v < avg * 0.8);
    if (drops.length >= 1) return "⚠️ Validator activity is declining.";
    return "✅ Stable validator activity.";
  };

  if (loading) return <p>Loading...</p>;
  if (!accountData) return <p>Account not found.</p>;

  return (
    <div className="card">
      <h1>Account overview</h1>
      <p>View detailed validator stats including Epoch progress, Total Credits, and Delta activity. Track validator ownership and performance changes in real time.</p>
      <p><strong>Address:</strong> {address}</p>
      <p><strong>State:</strong> {accountData.sol.toFixed(4)} SOL</p>
      <p><strong>Owner:</strong> {accountData.owner}</p>

      {accountData.program && (
        <>
          <hr />
          <p></p>
          <h3>Program and type</h3>
          <p><strong>Program:</strong> {accountData.program}</p>
          <p><strong>Type:</strong> {accountData.type}</p>

          <hr />
          <p></p>
          <h3>Details (parsed)</h3>
          <pre>
            {JSON.stringify(accountData.details, null, 2)}
          </pre>
        </>
      )}

      {voteData?.epochCredits && (
        <>
          <hr />
          <p></p>
          <h3>Activity by epoch</h3>
          <p>{stability(voteData.epochCredits)}</p>
          <p></p>
          <table>
            <thead>
              <tr>
                <th>Epoch</th>
                <th>Total credits</th>
                <th>Previous</th>
                <th>Delta</th>
              </tr>
            </thead>
            <tbody>
              {voteData.epochCredits.slice(-20).map(([epoch, total, previous], idx) => (
                <tr key={epoch} className="border-t">
                  <td>{epoch}</td>
                  <td>{total}</td>
                  <td>{previous}</td>
                  <td>{total - previous}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <p></p>
          <h3>Visual display of delta values</h3>
          <div style={{ width: '100%', height: 300 }}>
              <ResponsiveContainer width="50%" height="50%">
                <LineChart
                  data={voteData.epochCredits.slice(-20).map(([epoch, total, previous]) => ({
                    epoch,
                    delta: total - previous,
                  }))}
                  margin={{ top: 10, right: 20, left: 0, bottom: 10 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="epoch" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="delta" stroke="#8884d8" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </div>
        </>
      )}
    </div>
  );
};

export default AccountPage;
