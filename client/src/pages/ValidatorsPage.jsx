import React from 'react';
import ValidatorDashboard from '../components/ValidatorDashboard';

const ValidatorsPage = () => {
  return (
    <div className="card">
      <header>
        <h1>SolBlaze Validator Dashboard</h1>
        <p>
          Overview of validators with the option of analyzing behavior and voting - Click on the desired validator.
        </p>
      </header>
      <main>
        <ValidatorDashboard />
      </main>
    </div>
  );
};

export default ValidatorsPage;
