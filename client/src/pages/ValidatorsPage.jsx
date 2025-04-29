import React from 'react';
import ValidatorDashboard from '../components/ValidatorDashboard';

const ValidatorsPage = () => {
  return (
    <div className="p-6 max-w-4xl mx-auto">
      <header className="mb-6">
        <h1 className="text-3xl font-bold">Solana Validator Dashboard</h1>
        <p className="text-gray-600 mt-2">
          Pregled validatora sa opcijom detaljne analize ponašanja i glasanja.
        </p>
      </header>
      <main>
        <ValidatorDashboard />
      </main>
    </div>
  );
};

export default ValidatorsPage;
