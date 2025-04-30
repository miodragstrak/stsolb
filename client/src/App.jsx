import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import StrategyAnalyzer from './pages/StrategyAnalyzer';
import ValidatorsPage from './pages/ValidatorsPage';
import AccountPage from './pages/AccountPage';
import { Link } from 'react-router-dom';


function App() {
  return (
    <Router>
      <nav>
        <Link to="/">Home</Link> | <Link to="/analyzer">Strategy Analyzer</Link> | <Link to="/validators">Validators</Link>
      </nav>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/analyzer" element={<StrategyAnalyzer />} />
        <Route path="/validators" element={<ValidatorsPage />} />
        <Route path="/account-info/:address" element={<AccountPage/>} />
      </Routes>
    </Router>
  );
}

export default App;