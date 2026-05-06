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
      setError('Failed to load songs: ' + err.message);
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
      // Update the song in the list
      setSongs(songs.map(song => song.id === id ? response.data : song));
    } catch (err) {
      alert('Error liking song: ' + err.message);
    }
  };

  const handleDislike = async (id) => {
    try {
      const response = await axios.put(
        `${process.env.REACT_APP_API_URL}/songs/${id}/dislike`
      );
      // Update the song in the list
      setSongs(songs.map(song => song.id === id ? response.data : song));
    } catch (err) {
      alert('Error disliking song: ' + err.message);
    }
  };

  return (
    <div style={styles.container}>
      <h2>Top 50 Songs</h2>
      {loading && <p>Loading songs...</p>}
      {error && <p style={styles.error}>{error}</p>}
      {!loading && songs.length === 0 && <p>No songs available yet. Suggest one!</p>}
      {!loading && songs.length > 0 && (
        <div style={styles.list}>
          {songs.map((song) => (
            <div key={song.id} style={styles.songItem}>
              <div style={styles.songInfo}>
                <h3>{song.name}</h3>
                <p>Likes: {song.likecount} | Dislikes: {song.dislikecount}</p>
              </div>
              <div style={styles.buttonGroup}>
                <button
                  onClick={() => handleLike(song.id)}
                  style={styles.likeButton}
                >
                  👍 Like
                </button>
                <button
                  onClick={() => handleDislike(song.id)}
                  style={styles.dislikeButton}
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
  container: {
    backgroundColor: '#ffffff',
    borderRadius: '8px',
    padding: '20px',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
  },
  list: {
    marginTop: '15px',
  },
  songItem: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '15px',
    borderBottom: '1px solid #eee',
  },
  songInfo: {
    flex: 1,
  },
  buttonGroup: {
    display: 'flex',
    gap: '10px',
  },
  likeButton: {
    padding: '8px 15px',
    backgroundColor: '#28a745',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontFamily: 'inherit',
  },
  dislikeButton: {
    padding: '8px 15px',
    backgroundColor: '#dc3545',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontFamily: 'inherit',
  },
  error: {
    color: '#dc3545',
    padding: '10px',
    backgroundColor: '#f8d7da',
    borderRadius: '4px',
  },
};

export default SongsList;
