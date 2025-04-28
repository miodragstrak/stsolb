import React, { useState, useEffect } from 'react';
import axios from 'axios';
import LoadingSpinner from './LoadingSpinner';  // Pretpostavljamo da već imaš LoadingSpinner komponentu za učitavanje

const ValidatorDashboard = () => {
  const [validators, setValidators] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Zoveš API za validatore, u ovom slučaju /api/validators
    axios.get(`${import.meta.env.VITE_API_URL}/validators`)
      .then(response => {
        setValidators(response.data.vote_accounts);  // Postavljamo vote accounts u stanje
        setLoading(false);
      })
      .catch(error => {
        console.error("There was an error fetching the validator data!", error);
        setError('Failed to fetch validator data.');
        setLoading(false);
      });
  }, []);

  if (loading) return <LoadingSpinner />;  // Učitavanje prikazuje spinner
  if (error) return <div>Error: {error}</div>;  // Ako se dogodi greška, prikazuješ poruku

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
