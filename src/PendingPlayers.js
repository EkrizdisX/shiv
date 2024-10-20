const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

// Pending Player Schema
const pendingPlayerSchema = new mongoose.Schema({
  name: String,
  gameId: String,
  picture: String,
  role: String,
  rank: String,
  statistics: {
    matchesPlayed: Number,
    wins: Number,
    losses: Number
  }
});

const PendingPlayer = mongoose.model('PendingPlayer', pendingPlayerSchema);

// Route to add a new pending player
router.post('/pending-players', async (req, res) => {
  try {
    const newPendingPlayer = new PendingPlayer(req.body);
    await newPendingPlayer.save();
    res.status(201).json(newPendingPlayer);
  } catch (error) {
    res.status(500).json({ error: 'Error adding player' });
  }
});

// Route to get all pending players
router.get('/pending-players', async (req, res) => {
  try {
    const pendingPlayers = await PendingPlayer.find();
    res.json(pendingPlayers);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching pending players' });
  }
});

// Route to accept a pending player and move to the main players collection
router.post('/players/:playerId/accept', async (req, res) => {
  try {
    const pendingPlayer = await PendingPlayer.findById(req.params.playerId);
    
    if (!pendingPlayer) {
      return res.status(404).json({ error: 'Player not found' });
    }

    const Player = mongoose.model('Player');
    const newPlayer = new Player(pendingPlayer.toObject());
    await newPlayer.save();
    await PendingPlayer.findByIdAndDelete(req.params.playerId);

    res.status(201).json(newPlayer);
  } catch (error) {
    res.status(500).json({ error: 'Error accepting player' });
  }
});

module.exports = router;
