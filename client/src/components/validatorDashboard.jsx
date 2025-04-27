import React, { useState, useEffect } from 'react';
import axios from 'axios';
import LoadingSpinner from './LoadingSpinner'; 

const ValidatorDashboard = () => {
  const [validatorCount, setValidatorCount] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios.get(`${import.meta.env.VITE_API_URL}/validator_count`)
      .then(response => {
        setValidatorCount(response.data.total); 
        setLoading(false);
      })
      .catch(error => {
        console.error("There was an error fetching the validator count data!", error);
        setError('Failed to fetch validator count.');
        setLoading(false);
      });
  }, []);

  if (loading) return <LoadingSpinner />;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <h2>Validator Count</h2>
      <p>Number of Validators: {validatorCount}</p>
    </div>
  );
};

export default ValidatorDashboard;
