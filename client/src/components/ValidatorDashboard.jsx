import React, { useState, useEffect } from 'react';
import axios from 'axios';
import LoadingSpinner from './LoadingSpinner';

const ValidatorDashboard = () => {
  const [validators, setValidators] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios.get(`${import.meta.env.VITE_API_URL}/validators`)
      .then(response => {
        console.log("Validator API response:", response.data);
        setValidators(response.data.vote_accounts); // <<< uzimaš samo niz adresa
        setLoading(false);
      })
      .catch(error => {
        console.error("There was an error fetching the validator data!", error);
        setError('Failed to fetch validator data.');
        setLoading(false);
      });
  }, []);

  if (loading) return <LoadingSpinner />;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <h2>Validators</h2>
      {validators.length === 0 ? (
        <p>No validators available.</p>
      ) : (
        <ul>
          {validators.map((validator, index) => (
            <li key={index}>
              <p><strong>Validator {index + 1}:</strong> {validator}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ValidatorDashboard;
