import React, { useState, useEffect } from 'react';
import axios from 'axios';

const SongsList = ({ refreshTrigger }) => {
  const [songs, setSongs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchSongs();
  }, [refreshTrigger]);

  const fetchSongs = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/songs`);
      setSongs(response.data);
      setError('');
    } catch (err) {
      setError('Eroare la încărcarea melodiilor: ' + err.message);
      setSongs([]);
    } finally {
      setLoading(false);
    }
  };

  const handleLike = async (id) => {
    try {
      const response = await axios.put(
        `${process.env.REACT_APP_API_URL}/songs/${id}/like`
      );
      setSongs(songs.map(song => song.id === id ? response.data : song));
    } catch (err) {
      alert('Eroare: ' + err.message);
    }
  };

  const handleDislike = async (id) => {
    try {
      const response = await axios.put(
        `${process.env.REACT_APP_API_URL}/songs/${id}/dislike`
      );
      setSongs(songs.map(song => song.id === id ? response.data : song));
    } catch (err) {
      alert('Eroare: ' + err.message);
    }
  };

  return (
    <div className="card">
      <h2>Melodii blanaoooo</h2>
      {loading && <p style={styles.loading}>Încărcarea melodiilor...</p>}
      {error && <p style={styles.error}>{error}</p>}
      {!loading && songs.length === 0 && <p style={styles.empty}>Nicio melodie disponibilă. Sugerează una!</p>}
      {!loading && songs.length > 0 && (
        <div style={styles.list}>
          {songs.map((song) => (
            <div key={song.id} style={styles.songItem}>
              <div style={styles.songInfo}>
                <h3 style={styles.songName}>{song.NAME || song.name}</h3>
                <p style={styles.stats}>👍 {song.likecount} • 👎 {song.dislikecount}</p>
              </div>
              <div style={styles.buttonGroup}>
                <button
                  onClick={() => handleLike(song.id)}
                  className="btn btn-success"
                  style={styles.smallBtn}
                >
                  👍 Like
                </button>
                <button
                  onClick={() => handleDislike(song.id)}
                  className="btn btn-danger"
                  style={styles.smallBtn}
                >
                  👎 Dislike
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

const styles = {
  list: {
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
    borderLeft: '3px solid #0066cc',
    transition: 'all 0.3s ease',
  },
  songInfo: {
    flex: 1,
  },
  songName: {
    color: '#00205B',
    margin: '0 0 8px 0',
    fontSize: '16px',
    fontWeight: 600,
  },
  stats: {
    color: '#666',
    fontSize: '13px',
    margin: '0',
  },
  buttonGroup: {
    display: 'flex',
    gap: '8px',
  },
  smallBtn: {
    padding: '8px 12px',
    fontSize: '13px',
  },
  loading: {
    color: '#666',
    fontStyle: 'italic',
    marginTop: '10px',
  },
  error: {
    color: '#721c24',
    backgroundColor: '#f8d7da',
    padding: '10px',
    borderRadius: '4px',
    marginTop: '10px',
  },
  empty: {
    color: '#666',
    fontStyle: 'italic',
    marginTop: '10px',
  },
};

export default SongsList;
