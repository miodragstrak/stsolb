import { useEffect, useState } from 'react';

export default function StrategyAnalyzer() {
  const [apy, setApy] = useState(null);
  const [bsolPrice, setBsolPrice] = useState(null);
  const [solPrice, setSolPrice] = useState(null);
  const [investment, setInvestment] = useState(1000);
  const [selectedApy, setSelectedApy] = useState(10);

  useEffect(() => {
    fetch('/api/solblaze/apy')
      .then(res => res.json())
      .then(data => {
        setApy(data);
        setSelectedApy(data.apy);
      });

    fetch('/api/solblaze/bsol-price')
      .then(res => res.json())
      .then(data => setBsolPrice(data['blazestake-staked-sol']?.usd));

    fetch('/api/solblaze/sol-price')
      .then(res => res.json())
      .then(data => setSolPrice(data['solana']?.usd));
  }, []);

  function calculateProfit(principal, apyPercent, years = 1) {
    const periods = 12;
    const rate = apyPercent / 100;
    return principal * Math.pow(1 + rate / periods, periods * years);
  }

  if (!apy || bsolPrice === null || solPrice === null) {
    return <div>Loading data...</div>;
  }

  const theoreticalProfit = calculateProfit(investment, selectedApy);

  return (
    <div className="card">
      <h1>bSOL DeFi Strategy Analyzer</h1>
      <p></p>
      <p>Simulate your staking returns by adjusting APY and investment amount to see potential gains over time. Understand how small changes in yield can lead to significant outcomes.</p>
      <div>
        <p><strong>Current bSOL APY:</strong> {apy.apy}%</p>
        <p><strong>bSOL price:</strong> ${bsolPrice}</p>
        <p><strong>SOL price:</strong> ${solPrice}</p>
        <p></p>
        <p></p>
      </div>
      <hr />
      <p></p>
      <div>
        <h1>Analysis</h1>
        <label>Your investment ($)</label>
        <input
          type="number"
          className="border p-2"
          value={investment}
          onChange={(e) => setInvestment(Number(e.target.value))}
        />
        <p></p>
      </div>
      <div>
        <label>Select APY (%)</label>
        <input
          type="range"
          min="0"
          max="50"
          step="0.1"
          value={selectedApy}
          onChange={(e) => setSelectedApy(Number(e.target.value))}
          className="w-full"
        />
        <p>APY for financial analysis: {selectedApy.toFixed(2)}%</p>
      </div>
      <p></p>
      <div>
        <h3>➡️ For {investment}$, potential profit after 1 year with {selectedApy.toFixed(2)}% APY: <strong>💵${theoreticalProfit.toFixed(2)}</strong></h3>
        <p></p>
        <p></p>
      </div>
      <hr />
    </div>
  );
}
