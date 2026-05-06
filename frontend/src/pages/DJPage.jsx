import React from 'react';
import DJList from '../components/DJList';

const DJPage = () => {
  return (
    <div className="dj-page">
      <div className="header">
        <h1>🎧 Control Panel DJ</h1>
        <p>Gestionează cererile de melodii și construiește-ți playlist-ul</p>
      </div>
      
      <div className="container">
        <DJList />
      </div>
    </div>
  );
};

export default DJPage;
