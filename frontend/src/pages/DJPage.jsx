import React from 'react';
import DJList from '../components/DJList';

const DJPage = () => {
  return (
    <div style={styles.container}>
      <header style={styles.header}>
        <h1>🎧 DJ Control Panel</h1>
        <p>Manage song requests and build your playlist</p>
      </header>
      
      <div style={styles.content}>
        <DJList />
      </div>
    </div>
  );
};

const styles = {
  container: {
    minHeight: '100vh',
    padding: '20px',
    backgroundColor: '#f5f5f5',
  },
  header: {
    textAlign: 'center',
    marginBottom: '30px',
    color: '#333',
  },
  content: {
    maxWidth: '900px',
    margin: '0 auto',
  },
};

export default DJPage;
