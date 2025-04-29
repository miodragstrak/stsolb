import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import StrategyAnalyzer from './pages/StrategyAnalyzer';
import ValidatorsPage from './pages/ValidatorsPage';
import AccountPage from './pages/AccountPage';
import ValidatorDashboard from "./components/ValidatorDashboard";


function App() {
  return (
    <Router>
      <nav>
        <a href="/">Home</a> | <a href="/analyzer">Strategy Analyzer</a> | <a href="/validators">Validators</a>
      </nav>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/analyzer" element={<StrategyAnalyzer />} />
        <Route path="/validators" element={<ValidatorsPage />} />
        <Route path="/account/:address" element={<AccountPage />} />
      </Routes>
    </Router>
  );
}

export default App;