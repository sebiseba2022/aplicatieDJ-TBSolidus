const express = require('express');
const router = express.Router();
const pool = require('../config/db');

// GET /api/songs - Get top 50 songs with active=1
router.get('/songs', async (req, res) => {
  try {
    const connection = await pool.getConnection();
    const [songs] = await connection.query(
      'SELECT id, NAME as name, active, likecount, dislikecount, created_at, updated_at FROM songs WHERE active = 1 ORDER BY likecount DESC LIMIT 50'
    );
    connection.release();
    res.json(songs);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch songs' });
  }
});

// GET /api/songs/all - Get all songs (for DJ page)
router.get('/songs/all', async (req, res) => {
  try {
    const connection = await pool.getConnection();
    const [songs] = await connection.query(
      'SELECT id, NAME as name, active, likecount, dislikecount, created_at, updated_at FROM songs ORDER BY likecount DESC'
    );
    connection.release();
    res.json(songs);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch songs' });
  }
});

// POST /api/songs - Add new song
router.post('/songs', async (req, res) => {
  const { name } = req.body;
  
  if (!name || name.trim() === '') {
    return res.status(400).json({ error: 'Song name is required' });
  }

  try {
    const connection = await pool.getConnection();
    const [result] = await connection.query(
      'INSERT INTO songs (name, active, likecount, dislikecount) VALUES (?, ?, ?, ?)',
      [name, 1, 0, 0]
    );
    connection.release();
    res.status(201).json({ id: result.insertId, name, active: 1, likecount: 0, dislikecount: 0 });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to add song' });
  }
});

// PUT /api/songs/:id/like - Increment like count
router.put('/songs/:id/like', async (req, res) => {
  const { id } = req.params;

  try {
    const connection = await pool.getConnection();
    await connection.query(
      'UPDATE songs SET likecount = likecount + 1 WHERE id = ?',
      [id]
    );
    const [songs] = await connection.query('SELECT id, NAME as name, active, likecount, dislikecount, created_at, updated_at FROM songs WHERE id = ?', [id]);
    connection.release();
    
    if (songs.length === 0) {
      return res.status(404).json({ error: 'Song not found' });
    }
    
    res.json(songs[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to update like count' });
  }
});

// PUT /api/songs/:id/dislike - Increment dislike count
router.put('/songs/:id/dislike', async (req, res) => {
  const { id } = req.params;

  try {
    const connection = await pool.getConnection();
    await connection.query(
      'UPDATE songs SET dislikecount = dislikecount + 1 WHERE id = ?',
      [id]
    );
    const [songs] = await connection.query('SELECT id, NAME as name, active, likecount, dislikecount, created_at, updated_at FROM songs WHERE id = ?', [id]);
    connection.release();
    
    if (songs.length === 0) {
      return res.status(404).json({ error: 'Song not found' });
    }
    
    res.json(songs[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to update dislike count' });
  }
});

// PUT /api/songs/:id/move-used - Set active=0 (move to used)
router.put('/songs/:id/move-used', async (req, res) => {
  const { id } = req.params;

  try {
    const connection = await pool.getConnection();
    await connection.query(
      'UPDATE songs SET active = 0 WHERE id = ?',
      [id]
    );
    const [songs] = await connection.query('SELECT id, NAME as name, active, likecount, dislikecount, created_at, updated_at FROM songs WHERE id = ?', [id]);
    connection.release();
    
    if (songs.length === 0) {
      return res.status(404).json({ error: 'Song not found' });
    }
    
    res.json(songs[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to move song to used' });
  }
});

module.exports = router;
