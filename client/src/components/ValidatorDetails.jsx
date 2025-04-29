import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import LoadingSpinner from './LoadingSpinner';

const ValidatorDetails = () => {
  const { votePubkey } = useParams();
  const [validatorInfo, setValidatorInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!votePubkey) return;

    const fetchValidatorInfo = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/validator/${votePubkey}`);
        setValidatorInfo(response.data);
      } catch (err) {
        console.error(err);
        setError('Failed to fetch validator details.');
      } finally {
        setLoading(false);
      }
    };

    fetchValidatorInfo();
  }, [votePubkey]);

  if (loading) return <LoadingSpinner />;
  if (error) return <div>Error: {error}</div>;

  if (!validatorInfo) return <div>No data available.</div>;

  return (
    <div>
      <h2>Validator Details</h2>
      <p><strong>Vote Pubkey:</strong> {validatorInfo.votePubkey}</p>
      <p><strong>Commission:</strong> {validatorInfo.commission}%</p>
      <h3>Recent Votes:</h3>
      {validatorInfo.recentVotes && validatorInfo.recentVotes.length > 0 ? (
        <ul>
          {validatorInfo.recentVotes.map((vote, index) => (
            <li key={index}>
              Slot: {vote.slot} | Confirmation Status: {vote.confirmationStatus}
            </li>
          ))}
        </ul>
      ) : (
        <p>No recent votes found.</p>
      )}
    </div>
  );
};

export default ValidatorDetails;
