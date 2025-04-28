import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import StrategyAnalyzer from './pages/StrategyAnalyzer';
import ValidatorsPage from './pages/ValidatorsPage'; // Uvezi ValidatorsPage

function App() {
  return (
    <Router>
      <nav>
        <a href="/">Home</a> | <a href="/analyzer">Strategy Analyzer</a> | <a href="/validators">Validators</a>
      </nav>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/analyzer" element={<StrategyAnalyzer />} />
        <Route path="/validators" element={<ValidatorsPage />} /> {/* Dodaj Validators stranicu */}
      </Routes>
    </Router>
  );
}

export default App;