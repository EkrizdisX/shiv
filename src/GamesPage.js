import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'; 
import axios from 'axios';
import './GamesPage.css';

const GamesPage = () => {
  const [games, setGames] = useState([]);
  const navigate = useNavigate(); 

  useEffect(() => {
    axios.get('http://localhost:5000/api/games')
      .then(res => setGames(res.data))
      .catch(err => console.error(err));
  }, []);

  const handleLikeGame = (gameId) => {
    navigate(`/players/${gameId}`);
  };

  return (
    <div className="games-container">
      <h1>Games</h1>
      <div className="games-grid">
        {games.map(game => (
          <div key={game._id} className="game-card">
            <img src={game.thumbnail} alt={game.name} />
            <h3>{game.name}</h3>
            <button className="like-button" onClick={() => handleLikeGame(game._id)}>Like</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GamesPage;
