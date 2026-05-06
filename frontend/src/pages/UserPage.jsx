import React, { useState } from 'react';
import SongForm from '../components/SongForm';
import SongsList from '../components/SongsList';

const UserPage = () => {
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  const handleSongAdded = () => {
    setRefreshTrigger(prev => prev + 1);
  };

  return (
    <div className="user-page">
      <div className="header">
        <h1>🎵 Sugerează o Melodie</h1>
        <p>Ajută-ne să alegem cele mai bune piese pentru petrecere!</p>
      </div>
      
      <div className="container">
        <SongForm onSongAdded={handleSongAdded} />
        <SongsList refreshTrigger={refreshTrigger} />
      </div>
    </div>
  );
};

export default UserPage;
