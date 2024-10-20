import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './AcceptancePage.css';

const AcceptancePage = () => {
  const [pendingPlayers, setPendingPlayers] = useState([]);
  const [games, setGames] = useState([]);

  useEffect(() => {
    // Fetch pending players
    axios.get('http://localhost:5000/api/pending-players')
      .then(res => setPendingPlayers(res.data))
      .catch(err => console.error(err));
      
    // Fetch games to map gameId to game name
    axios.get('http://localhost:5000/api/games')
      .then(res => setGames(res.data))
      .catch(err => console.error(err));
  }, []);

  const handleAccept = (player) => {
    axios.post(`http://localhost:5000/api/player`, player) // Send player data to main player collection
      .then(res => {
        alert('Player accepted!');
        setPendingPlayers(prevPlayers => prevPlayers.filter(p => p._id !== player._id));
      })
      .catch(err => console.error(err));
  };

  return (
    <div className="acceptance-page-container">
      <h1>Pending Player Requests</h1>
      {pendingPlayers.length > 0 ? (
        <ul className="pending-players-list">
          {pendingPlayers.map(player => {
            const game = games.find(game => game._id === player.gameId);
            return (
              <li key={player._id} className="pending-player-card">
                <h3>{player.name}</h3>
                <p>Game: {game ? game.name : 'Unknown Game'}</p>
                <p>Role: {player.role}</p>
                <p>Rank: {player.rank}</p>
                <p>Matches Played: {player.matchesPlayed}</p>
                <p>Wins: {player.wins}</p>
                <p>Losses: {player.losses}</p>
                <button onClick={() => handleAccept(player)}>Accept</button>
              </li>
            );
          })}
        </ul>
      ) : (
        <p>No pending requests.</p>
      )}
    </div>
  );
};

export default AcceptancePage;
