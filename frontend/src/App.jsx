import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link, Navigate } from 'react-router-dom';
import UserPage from './pages/UserPage';
import DJPage from './pages/DJPage';
import './App.css';

function App() {
  return (
    <Router>
      <div className="app">
        <nav className="navbar">
          <div className="nav-container">
            <Link to="/user" className="logo-link">
              <img src="/logo-solidus.png" alt="Solidus Logo" className="logo-image" />
              <span className="brand-name">SOLIDUS CAROUSEL PARTY</span>
            </Link>
            <ul className="nav-links">
              <li>
                <Link to="/user" className="nav-link">Sugestii</Link>
              </li>
              <li>
               <Link to="/djadminpage" className="nav-link">DJ Control</Link>
              </li>
            </ul>
          </div>
        </nav>

        <Routes>
          <Route path="/user" element={<UserPage />} />
          <Route path="/djadminpage" element={<DJPage />} />
          <Route path="/" element={<Navigate to="/user" replace />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
