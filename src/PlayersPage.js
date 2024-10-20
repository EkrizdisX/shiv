import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom'; // Updated import
import axios from 'axios';
import './PlayersPage.css';
const PlayersPage = () => {
  const { gameId } = useParams();
  const [players, setPlayers] = useState([]);
  const navigate = useNavigate(); // Updated to useNavigate

  useEffect(() => {
    axios.get(`http://localhost:5000/api/players/${gameId}`)
      .then(res => setPlayers(res.data))
      .catch(err => console.error(err));
  }, [gameId]);

  const handlePlayerClick = (playerId) => {
    navigate(`/player/${playerId}`); // Updated to use navigate
  };

  return (
    <div>
      <h1>Players</h1>
      <div style={{ display: 'flex', flexWrap: 'wrap' }}>
        {players.map(player => (
          <div key={player._id} style={{ margin: '10px', border: '1px solid black', padding: '10px' }}>
            <img src={player.picture} alt={player.name} width="150" height="150" />
            <h3>{player.name}</h3>
            <button onClick={() => handlePlayerClick(player._id)}>View Details</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PlayersPage;
