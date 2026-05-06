import React, { useState } from 'react';
import SongForm from '../components/SongForm';
import SongsList from '../components/SongsList';

const UserPage = () => {
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  const handleSongAdded = () => {
    // Trigger refresh of the songs list
    setRefreshTrigger(prev => prev + 1);
  };

  return (
    <div style={styles.container}>
      <header style={styles.header}>
        <h1>🎵 Carousel Party - Suggest a Song</h1>
        <p>Help us pick the best songs for tonight!</p>
      </header>
      
      <div style={styles.content}>
        <SongForm onSongAdded={handleSongAdded} />
        <SongsList refreshTrigger={refreshTrigger} />
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
    maxWidth: '800px',
    margin: '0 auto',
  },
};

export default UserPage;
