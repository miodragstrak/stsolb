import { NavLink } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  return (
    <header>
      <div className="nav-container">
        <h1>⚡ SolBlaze Dashboard</h1>
        <nav>
          <NavLink to="/" end>
            Home
          </NavLink>
          <NavLink to="/analyzer">Strategy Analyzer</NavLink>
          <NavLink to="/validators">Validators</NavLink>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
