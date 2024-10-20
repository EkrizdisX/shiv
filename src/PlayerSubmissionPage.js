import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './PlayerSubmissionPage.css';

const PlayerSubmissionPage = () => {
  const [playerData, setPlayerData] = useState({
    name: '',
    gameId: '',
    picture: '',
    role: '',
    rank: '',
    matchesPlayed: '',
    wins: '',
    losses: ''
  });

  const [games, setGames] = useState([]);

  // Fetch games to populate the dropdown
  useEffect(() => {
    axios.get('http://localhost:5000/api/games')
      .then(res => {
        setGames(res.data);
      })
      .catch(err => console.error(err));
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPlayerData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Structure the details object
    const details = {
      role: playerData.role,
      rank: playerData.rank,
      statistics: {
        matchesPlayed: playerData.matchesPlayed,
        wins: playerData.wins,
        losses: playerData.losses
      }
    };

    // Prepare data for submission
    const submissionData = {
      name: playerData.name,
      gameId: playerData.gameId,
      picture: playerData.picture,
      details // Include the structured details
    };

    // Send the data to the server
    axios.post('http://localhost:5000/api/pending-player', submissionData)
      .then(res => {
        alert('Player submission successful!');
        // Reset the form
        setPlayerData({
          name: '',
          gameId: '',
          picture: '',
          role: '',
          rank: '',
          matchesPlayed: '',
          wins: '',
          losses: ''
        });
      })
      .catch(err => console.error(err));
  };

  return (
    <div className="submission-form-container">
      <h1>Submit Your Player Details</h1>
      <form onSubmit={handleSubmit}>
        <input type="text" name="name" placeholder="Player Name" value={playerData.name} onChange={handleChange} required />
        <input type="text" name="picture" placeholder="Picture URL" value={playerData.picture} onChange={handleChange} required />
        
        {/* Dropdown for game selection */}
        <label>
          Select Game:
          <select name="gameId" value={playerData.gameId} onChange={handleChange} required>
            <option value="" disabled>Select Game</option>
            {games.map(game => (
              <option key={game._id} value={game._id}>{game.name}</option>
            ))}
          </select>
        </label>
        
        <input type="text" name="role" placeholder="Player Role" value={playerData.role} onChange={handleChange} required />
        <input type="text" name="rank" placeholder="Player Rank" value={playerData.rank} onChange={handleChange} required />
        <input type="number" name="matchesPlayed" placeholder="Matches Played" value={playerData.matchesPlayed} onChange={handleChange} required />
        <input type="number" name="wins" placeholder="Wins" value={playerData.wins} onChange={handleChange} required />
        <input type="number" name="losses" placeholder="Losses" value={playerData.losses} onChange={handleChange} required />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default PlayerSubmissionPage;
