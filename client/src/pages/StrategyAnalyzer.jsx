import { useEffect, useState } from 'react';

export default function StrategyAnalyzer() {
  const [apy, setApy] = useState(null);
  const [prices, setPrices] = useState(null);
  const [investment, setInvestment] = useState(1000); // default $1000
  const [selectedApy, setSelectedApy] = useState(apy?.apy || 10); // Default bSOL APY (možeš postaviti početnu vrednost)

  useEffect(() => {
    fetch('/api/apy')
      .then(res => res.json())
      .then(data => {
        setApy(data);
        setSelectedApy(data.apy); // Kada API vrati podatke, postavimo default APY
      });

    fetch('/api/prices')
      .then(res => res.json())
      .then(data => setPrices(data));
  }, []);

  // Funkcija za izračunavanje profitabilnosti na osnovu APY-a i godina
  function calculateProfit(principal, apyPercent, years = 1) {
    const periods = 12; // Mesečno
    const rate = apyPercent / 100;
    return principal * Math.pow(1 + rate / periods, periods * years);
  }

  // Ako podaci nisu još učitani, prikazujemo Loading...
  if (!apy || !prices) {
    return <div>Loading data...</div>;
  }

  // Izračunavanje teoretskog profita
  const theoreticalProfit = calculateProfit(investment, selectedApy);

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">bSOL DeFi Strategy Analyzer</h1>

      <div className="mb-4">
        <p><strong>Trenutni bSOL APY:</strong> {apy.apy}%</p>
        <p><strong>Cena bSOL:</strong> ${prices['blazestake-staked-sol']?.usd}</p>
        <p><strong>Cena SOL:</strong> ${prices['solana']?.usd}</p>
      </div>

      <div className="mb-4">
        <label className="block mb-2">Investicija ($)</label>
        <input
          type="number"
          className="border p-2"
          value={investment}
          onChange={(e) => setInvestment(Number(e.target.value))}
        />
      </div>

      <div className="mb-4">
        <label className="block mb-2">Izaberite APY (%)</label>
        <input
          type="range"
          min="0"
          max="50"
          step="0.1"
          value={selectedApy}
          onChange={(e) => setSelectedApy(Number(e.target.value))}
          className="w-full"
        />
        <p className="text-center">Trenutni APY: {selectedApy.toFixed(2)}%</p>
      </div>

      <div className="mt-6">
        <h2 className="text-xl font-semibold">Analiza</h2>
        <p>Za {investment}$, potencijalni profit nakon 1 godine sa {selectedApy.toFixed(2)}% APY: <strong>${theoreticalProfit.toFixed(2)}</strong></p>
      </div>
    </div>
  );
}
