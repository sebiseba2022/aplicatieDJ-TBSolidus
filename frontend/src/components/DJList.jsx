import React, { useState, useEffect } from 'react';
import axios from 'axios';

const DJList = () => {
  const [songs, setSongs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetchAllSongs();
  }, []);

  const fetchAllSongs = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/songs/all`);
      setSongs(response.data);
      setError('');
    } catch (err) {
      setError('Eroare la încărcarea melodiilor: ' + err.message);
      setSongs([]);
    } finally {
      setLoading(false);
    }
  };

  const handleMoveToUsed = async (id, name) => {
    try {
      await axios.put(`${process.env.REACT_APP_API_URL}/songs/${id}/move-used`);
      setMessage(`"${name}" mutată în melodii folosite ✓`);
      setTimeout(() => setMessage(''), 3000);
      setSongs(songs.filter(song => song.id !== id));
    } catch (err) {
      alert('Eroare: ' + err.message);
    }
  };

  const activeSongs = songs.filter(song => song.active === 1);
  const usedSongs = songs.filter(song => song.active === 0);

  return (
    <div>
      <h1 style={styles.dashboardTitle}>🎧 Dashboard DJ</h1>
      {message && <div style={styles.successMessage}>{message}</div>}
      {error && <div style={styles.errorMessage}>{error}</div>}
      
      {loading && <p style={styles.loading}>Se încarcă melodiile...</p>}

      {!loading && (
        <>
          <div className="card" style={styles.suggestedSection}>
            <h2>Melodii Sugerate ({activeSongs.length})</h2>
            {activeSongs.length === 0 && <p style={styles.empty}>Nicio melodie sugerată</p>}
            {activeSongs.length > 0 && (
              <div style={styles.songsList}>
                {activeSongs
                  .sort((a, b) => b.likecount - a.likecount)
                  .map((song, idx) => (
                    <div key={song.id} style={styles.songItem}>
                      <div style={styles.ranking}>#{idx + 1}</div>
                      <div style={styles.songDetails}>
                        <h3 style={styles.songName}>{song.NAME || song.name}</h3>
                        <div style={styles.stats}>
                          <span style={styles.stat}>👍 {song.likecount}</span>
                          <span style={styles.stat}>👎 {song.dislikecount}</span>
                        </div>
                      </div>
                      <button
                        onClick={() => handleMoveToUsed(song.id, song.NAME || song.name)}
                        className="btn btn-warning"
                      >
                        ✓ Folosit
                      </button>
                    </div>
                  ))}
              </div>
            )}
          </div>

          <div className="card" style={styles.usedSection}>
            <h2>Melodii Folosite ({usedSongs.length})</h2>
            {usedSongs.length === 0 && <p style={styles.empty}>Nicio melodie folosită</p>}
            {usedSongs.length > 0 && (
              <div style={styles.usedList}>
                {usedSongs.map((song) => (
                  <div key={song.id} style={styles.usedItem}>
                    <p style={styles.usedName}>{song.NAME || song.name}</p>
                    <small style={styles.usedStats}>👍 {song.likecount} • 👎 {song.dislikecount}</small>
                  </div>
                ))}
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
};

const styles = {
  dashboardTitle: {
    color: '#00205B',
    textAlign: 'center',
    marginBottom: '30px',
    fontSize: '28px',
    fontWeight: 700,
  },
  suggestedSection: {
    marginBottom: '30px',
  },
  usedSection: {
    marginBottom: '30px',
  },
  songsList: {
    marginTop: '15px',
  },
  songItem: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '15px',
    backgroundColor: '#f8f9fa',
    borderRadius: '4px',
    marginBottom: '10px',
    border: '1px solid #e0e0e0',
    borderLeft: '4px solid #0066cc',
    transition: 'all 0.3s ease',
  },
  ranking: {
    backgroundColor: '#00205B',
    color: 'white',
    padding: '5px 10px',
    borderRadius: '4px',
    fontWeight: 700,
    fontSize: '12px',
    marginRight: '12px',
    minWidth: '40px',
    textAlign: 'center',
  },
  songDetails: {
    flex: 1,
    marginRight: '15px',
  },
  songName: {
    color: '#00205B',
    margin: '0 0 8px 0',
    fontSize: '16px',
    fontWeight: 600,
  },
  stats: {
    display: 'flex',
    gap: '15px',
  },
  stat: {
    fontSize: '13px',
    color: '#666',
    fontWeight: 500,
  },
  usedList: {
    marginTop: '15px',
    backgroundColor: '#f8f9fa',
    padding: '15px',
    borderRadius: '4px',
    maxHeight: '300px',
    overflowY: 'auto',
  },
  usedItem: {
    paddingBottom: '12px',
    borderBottom: '1px solid #e0e0e0',
    marginBottom: '12px',
  },
  usedName: {
    color: '#00205B',
    margin: '0 0 4px 0',
    fontWeight: 600,
    fontSize: '15px',
  },
  usedStats: {
    color: '#666',
    fontSize: '12px',
  },
  successMessage: {
    padding: '12px',
    backgroundColor: '#d4edda',
    color: '#155724',
    borderRadius: '4px',
    marginBottom: '15px',
    border: '1px solid #c3e6cb',
    fontWeight: 500,
  },
  errorMessage: {
    padding: '12px',
    backgroundColor: '#f8d7da',
    color: '#721c24',
    borderRadius: '4px',
    marginBottom: '15px',
    border: '1px solid #f5c6cb',
    fontWeight: 500,
  },
  loading: {
    color: '#666',
    fontStyle: 'italic',
    padding: '20px',
    textAlign: 'center',
  },
  empty: {
    color: '#999',
    fontStyle: 'italic',
    padding: '20px',
    textAlign: 'center',
  },
};

export default DJList;
