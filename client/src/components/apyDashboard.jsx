import React, { useState, useEffect } from 'react';
import axios from 'axios';
import LoadingSpinner from './LoadingSpinner'; 

const ApyDashboard = () => {
  const [apyData, setApyData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios.get(`${import.meta.env.VITE_API_URL}/solblaze/apy`)
      .then(response => {
        setApyData(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error("There was an error fetching the APY data!", error);
        setError('Failed to fetch APY data.');
        setLoading(false);
      });
  }, []);

  if (loading) return <LoadingSpinner />;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <h2>APY Data</h2>
      <p>APY: {apyData.apy}%</p>
      <p>BLZE Bonus: {apyData.blze}%</p>
      <p>Base: {apyData.base}%</p>
      <p>DeFi: {apyData.defi}%</p>
      <p>Lending: {apyData.lending}%</p>
      <p>Liquidity: {apyData.liquidity}%</p>
    </div>
  );
};

export default ApyDashboard;
