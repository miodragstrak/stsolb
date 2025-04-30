import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import StrategyAnalyzer from './pages/StrategyAnalyzer';
import ValidatorsPage from './pages/ValidatorsPage';
import AccountPage from './pages/AccountPage';
import Navbar from './components/Navbar';
import './index.css';


function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/analyzer" element={<StrategyAnalyzer />} />
        <Route path="/validators" element={<ValidatorsPage />} />
        <Route path="/account-info/:address" element={<AccountPage/>} />
      </Routes>
      <footer>
        © {new Date().getFullYear()} Liquid Staking and Validator Ecosystem Data – by SolBlaze Hackathons 💻⚡
      </footer>
    </Router>
  );
}

export default App;