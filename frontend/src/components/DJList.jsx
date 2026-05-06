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
      setError('Failed to load songs: ' + err.message);
      setSongs([]);
    } finally {
      setLoading(false);
    }
  };

  const handleMoveToUsed = async (id, name) => {
    try {
      await axios.put(`${process.env.REACT_APP_API_URL}/songs/${id}/move-used`);
      setMessage(`"${name}" moved to used!`);
      setTimeout(() => setMessage(''), 3000);
      // Remove the song from the list
      setSongs(songs.filter(song => song.id !== id));
    } catch (err) {
      alert('Error moving song to used: ' + err.message);
    }
  };

  const activeSongs = songs.filter(song => song.active === 1);
  const usedSongs = songs.filter(song => song.active === 0);

  return (
    <div style={styles.container}>
      <h1>DJ Dashboard</h1>
      {message && <div style={styles.successMessage}>{message}</div>}
      {error && <div style={styles.errorMessage}>{error}</div>}
      
      {loading && <p>Loading songs...</p>}

      {!loading && (
        <>
          <div style={styles.section}>
            <h2>Suggested Songs ({activeSongs.length})</h2>
            {activeSongs.length === 0 && <p>No suggested songs yet.</p>}
            {activeSongs.length > 0 && (
              <div style={styles.songsList}>
                {activeSongs
                  .sort((a, b) => b.likecount - a.likecount)
                  .map((song) => (
                    <div key={song.id} style={styles.songItem}>
                      <div style={styles.songDetails}>
                        <h3>{song.name}</h3>
                        <div style={styles.stats}>
                          <span style={styles.stat}>👍 {song.likecount}</span>
                          <span style={styles.stat}>👎 {song.dislikecount}</span>
                        </div>
                      </div>
                      <button
                        onClick={() => handleMoveToUsed(song.id, song.name)}
                        style={styles.moveButton}
                      >
                        Move to Used
                      </button>
                    </div>
                  ))}
              </div>
            )}
          </div>

          <div style={styles.section}>
            <h2>Used Songs ({usedSongs.length})</h2>
            {usedSongs.length === 0 && <p>No used songs yet.</p>}
            {usedSongs.length > 0 && (
              <div style={styles.usedList}>
                {usedSongs.map((song) => (
                  <div key={song.id} style={styles.usedItem}>
                    <p>{song.name}</p>
                    <small>Likes: {song.likecount} | Dislikes: {song.dislikecount}</small>
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
  container: {
    backgroundColor: '#ffffff',
    borderRadius: '8px',
    padding: '20px',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
  },
  section: {
    marginBottom: '30px',
    paddingBottom: '20px',
    borderBottom: '1px solid #eee',
  },
  songsList: {
    marginTop: '15px',
  },
  songItem: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '15px',
    backgroundColor: '#f9f9f9',
    borderRadius: '4px',
    marginBottom: '10px',
    border: '1px solid #ddd',
  },
  songDetails: {
    flex: 1,
  },
  stats: {
    marginTop: '8px',
    display: 'flex',
    gap: '15px',
  },
  stat: {
    fontSize: '14px',
    color: '#666',
  },
  moveButton: {
    padding: '10px 20px',
    backgroundColor: '#ffc107',
    color: '#000',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontFamily: 'inherit',
    fontWeight: 'bold',
  },
  usedList: {
    marginTop: '15px',
    backgroundColor: '#f0f0f0',
    padding: '15px',
    borderRadius: '4px',
  },
  usedItem: {
    padding: '10px',
    borderBottom: '1px solid #ddd',
  },
  successMessage: {
    padding: '10px',
    backgroundColor: '#d4edda',
    color: '#155724',
    borderRadius: '4px',
    marginBottom: '15px',
  },
  errorMessage: {
    padding: '10px',
    backgroundColor: '#f8d7da',
    color: '#721c24',
    borderRadius: '4px',
    marginBottom: '15px',
  },
};

export default DJList;
