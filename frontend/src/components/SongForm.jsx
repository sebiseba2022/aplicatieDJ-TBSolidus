import React, { useState } from 'react';
import axios from 'axios';

const SongForm = ({ onSongAdded }) => {
  const [songName, setSongName] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!songName.trim()) {
      setMessage('Vă rugăm introduceți o melodie');
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/songs`,
        { name: songName }
      );
      setMessage('Melodie sugerată cu succes!');
      setSongName('');
      setTimeout(() => setMessage(''), 3000);
      if (onSongAdded) {
        onSongAdded(response.data);
      }
    } catch (error) {
      setMessage('Eroare: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="card">
      <h2>Sugerează o Melodie</h2>
      <form onSubmit={handleSubmit} style={styles.form}>
        <input
          type="text"
          value={songName}
          onChange={(e) => setSongName(e.target.value)}
          placeholder="Numele piesei sau artist..."
          style={styles.input}
          disabled={loading}
        />
        <button type="submit" className="btn btn-primary" disabled={loading}>
          {loading ? 'Se trimite...' : '✨ Sugerează'}
        </button>
      </form>
      {message && <p style={styles.message(message.includes('succes') ? 'success' : 'error')}>{message}</p>}
    </div>
  );
};

const styles = {
  form: {
    display: 'flex',
    gap: '10px',
    marginTop: '15px',
  },
  input: {
    flex: 1,
    padding: '12px',
    fontSize: '15px',
    border: '1px solid #e0e0e0',
    borderRadius: '4px',
    fontFamily: 'inherit',
    transition: 'border-color 0.3s ease',
  },
  message: (type) => ({
    marginTop: '12px',
    padding: '12px',
    backgroundColor: type === 'success' ? '#d4edda' : '#f8d7da',
    color: type === 'success' ? '#155724' : '#721c24',
    borderRadius: '4px',
    border: type === 'success' ? '1px solid #c3e6cb' : '1px solid #f5c6cb',
    fontSize: '14px',
  }),
};

export default SongForm;
