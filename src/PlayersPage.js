import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom'; 
import axios from 'axios';
import './PlayersPage.css'; // Updated to correct casing

const PlayersPage = () => {
  const { gameId } = useParams();
  const [players, setPlayers] = useState([]);
  const navigate = useNavigate(); 

  useEffect(() => {
    axios.get(`http://localhost:5000/api/players/${gameId}`)
      .then(res => setPlayers(res.data))
      .catch(err => console.error(err));
  }, [gameId]);

  const handlePlayerClick = (playerId) => {
    navigate(`/player/${playerId}`);
  };

  return (
    <div className="players-container">
      <h1>Players</h1>
      <div className="players-grid">
        {players.map(player => (
          <div key={player._id} className="player-card">
            <img src={player.picture} alt={player.name} width="150" height="150" />
            <h3>{player.name}</h3>
            <button className="view-details-button" onClick={() => handlePlayerClick(player._id)}>View Details</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PlayersPage;
