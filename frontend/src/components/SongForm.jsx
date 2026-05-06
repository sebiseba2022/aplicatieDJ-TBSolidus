import React, { useState } from 'react';
import axios from 'axios';

const SongForm = ({ onSongAdded }) => {
  const [songName, setSongName] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!songName.trim()) {
      setMessage('Please enter a song name');
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/songs`,
        { name: songName }
      );
      setMessage('Song suggested successfully!');
      setSongName('');
      setTimeout(() => setMessage(''), 3000);
      if (onSongAdded) {
        onSongAdded(response.data);
      }
    } catch (error) {
      setMessage('Error suggesting song: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.formContainer}>
      <h2>Suggest a Song</h2>
      <form onSubmit={handleSubmit} style={styles.form}>
        <input
          type="text"
          value={songName}
          onChange={(e) => setSongName(e.target.value)}
          placeholder="Enter song name..."
          style={styles.input}
          disabled={loading}
        />
        <button type="submit" style={styles.button} disabled={loading}>
          {loading ? 'Submitting...' : 'Suggest'}
        </button>
      </form>
      {message && <p style={styles.message}>{message}</p>}
    </div>
  );
};

const styles = {
  formContainer: {
    padding: '20px',
    backgroundColor: '#ffffff',
    borderRadius: '8px',
    marginBottom: '20px',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
  },
  form: {
    display: 'flex',
    gap: '10px',
    marginTop: '10px',
  },
  input: {
    flex: 1,
    padding: '10px',
    fontSize: '16px',
    border: '1px solid #ddd',
    borderRadius: '4px',
    fontFamily: 'inherit',
  },
  button: {
    padding: '10px 20px',
    fontSize: '16px',
    backgroundColor: '#007bff',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontFamily: 'inherit',
  },
  message: {
    marginTop: '10px',
    padding: '10px',
    backgroundColor: '#d4edda',
    color: '#155724',
    borderRadius: '4px',
  },
};

export default SongForm;
