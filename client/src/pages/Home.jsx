import React from 'react';
import APYDashboard from '../components/apyDashboard';
const Home = () => {
  return (
    <div className="card">
      <h1>SolBlaze Dashboard</h1>
      <p>Explore how SolBlaze boosts your staking rewards through APY, BLZE Bonus, and DeFi integrations like Lending and Liquidity pools. Learn how each percentage contributes to your total earnings.</p>
      <APYDashboard />
    </div>
  );
};

export default Home;
