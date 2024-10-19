import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Updated import
import axios from 'axios';

const GamesPage = () => {
  const [games, setGames] = useState([]);
  const navigate = useNavigate(); // Updated to useNavigate

  useEffect(() => {
    axios.get('http://localhost:5000/api/games')
      .then(res => setGames(res.data))
      .catch(err => console.error(err));
  }, []);

  const handleLikeGame = (gameId) => {
    navigate(`/players/${gameId}`); // Updated to use navigate
  };

  return (
    <div>
      <h1>Games</h1>
      <div style={{ display: 'flex', flexWrap: 'wrap' }}>
        {games.map(game => (
          <div key={game._id} style={{ margin: '10px', border: '1px solid black', padding: '10px' }}>
            <img src={game.thumbnail} alt={game.name} width="200" height="100" />
            <h3>{game.name}</h3>
            <button onClick={() => handleLikeGame(game._id)}>Like</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GamesPage;
