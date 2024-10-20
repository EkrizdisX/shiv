import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './InsertPlayerPage.css'; // Create this CSS file

const InsertPlayerPage = () => {
  const [games, setGames] = useState([]);
  const [selectedGame, setSelectedGame] = useState('');
  const [playerData, setPlayerData] = useState({
    name: '',
    picture: '',
    role: '',
    rank: '',
    matchesPlayed: '',
    wins: '',
    losses: ''
  });

  // Fetch games to display as radio buttons
  useEffect(() => {
    axios.get('http://localhost:5000/api/games')
      .then(res => setGames(res.data))
      .catch(err => console.error(err));
  }, []);

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPlayerData({ ...playerData, [name]: value });
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!selectedGame) {
      alert('Please select a game for the player.');
      return;
    }

    const playerDetails = {
      ...playerData,
      gameId: selectedGame, // Send the selected game ID
      details: {
        role: playerData.role,
        rank: playerData.rank,
        statistics: {
          matchesPlayed: playerData.matchesPlayed,
          wins: playerData.wins,
          losses: playerData.losses
        }
      }
    };

    axios.post('http://localhost:5000/api/player', playerDetails)
      .then(() => {
        alert('Player added successfully!');
        setPlayerData({
          name: '',
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
    <div className="insert-player-container">
      <h1>Insert New Player</h1>
      <form onSubmit={handleSubmit} className="insert-player-form">
        <div className="games-selection">
          <h3>Select Game:</h3>
          {games.map(game => (
            <label key={game._id}>
              <input
                type="radio"
                name="gameId"
                value={game._id}
                checked={selectedGame === game._id}
                onChange={() => setSelectedGame(game._id)}
              />
              {game.name}
            </label>
          ))}
        </div>

        <div className="player-inputs">
          <label>
            Player Name:
            <input
              type="text"
              name="name"
              value={playerData.name}
              onChange={handleInputChange}
              required
            />
          </label>

          <label>
            Picture URL:
            <input
              type="text"
              name="picture"
              value={playerData.picture}
              onChange={handleInputChange}
              required
            />
          </label>

          <label>
            Role:
            <input
              type="text"
              name="role"
              value={playerData.role}
              onChange={handleInputChange}
              required
            />
          </label>

          <label>
            Rank:
            <input
              type="text"
              name="rank"
              value={playerData.rank}
              onChange={handleInputChange}
              required
            />
          </label>

          <label>
            Matches Played:
            <input
              type="number"
              name="matchesPlayed"
              value={playerData.matchesPlayed}
              onChange={handleInputChange}
              required
            />
          </label>

          <label>
            Wins:
            <input
              type="number"
              name="wins"
              value={playerData.wins}
              onChange={handleInputChange}
              required
            />
          </label>

          <label>
            Losses:
            <input
              type="number"
              name="losses"
              value={playerData.losses}
              onChange={handleInputChange}
              required
            />
          </label>
        </div>

        <button type="submit" className="submit-button">Insert Player</button>
      </form>
    </div>
  );
};

export default InsertPlayerPage;
