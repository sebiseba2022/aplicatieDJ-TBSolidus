import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link, Navigate } from 'react-router-dom';
import UserPage from './pages/UserPage';
import DJPage from './pages/DJPage';
import './App.css';

function App() {
  return (
    <Router>
      <div className="app">
        <nav style={styles.navbar}>
          <div style={styles.navContainer}>
            <h2 style={styles.logo}>🎶 Carousel Party DJ</h2>
            <ul style={styles.navLinks}>
              <li>
                <Link to="/user" style={styles.link}>User Page</Link>
              </li>
              <li>
                <Link to="/dj" style={styles.link}>DJ Control</Link>
              </li>
            </ul>
          </div>
        </nav>

        <Routes>
          <Route path="/user" element={<UserPage />} />
          <Route path="/dj" element={<DJPage />} />
          <Route path="/" element={<Navigate to="/user" replace />} />
        </Routes>
      </div>
    </Router>
  );
}

const styles = {
  navbar: {
    backgroundColor: '#333',
    padding: '10px 0',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
    marginBottom: '20px',
  },
  navContainer: {
    maxWidth: '900px',
    margin: '0 auto',
    padding: '0 20px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  logo: {
    color: 'white',
    margin: 0,
  },
  navLinks: {
    display: 'flex',
    listStyle: 'none',
    gap: '30px',
    margin: 0,
    padding: 0,
  },
  link: {
    color: 'white',
    textDecoration: 'none',
    fontSize: '16px',
    fontWeight: 'bold',
    transition: 'color 0.3s',
  },
};

export default App;
