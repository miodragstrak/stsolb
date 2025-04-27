import React from 'react';
import APYDashboard from './components/apyDashboard.jsx';
import ValidatorDashboard from './components/validatorDashboard.jsx';

const App = () => {
  return (
    <div>
      <h1 color>SolBlaze Dashboard</h1>
      <APYDashboard />
      <ValidatorDashboard />
    </div>
  );
};

export default App;
