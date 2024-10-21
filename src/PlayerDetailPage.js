import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import './PlayerDetailPage.css';

const PlayerDetailPage = () => {
  const { playerId } = useParams();
  const [player, setPlayer] = useState(null);

  useEffect(() => {
    axios.get(`http://localhost:5000/api/player/${playerId}`)
      .then(res => setPlayer(res.data))
      .catch(err => console.error(err));
  }, [playerId]);

  if (!player) return <div>Loading...</div>;

  return (
    <div className="player-details-container">
      <h1>{player.name}</h1>
      <img src={player.picture} alt={player.name} width="200" height="200" />
      <div className="player-info">
        <h2>Role : {player.details.role}</h2>
        <h3>Rank : {player.details.rank}</h3>
        <h3>Matches PLayed : {player.details.statistics.matchesPlayed}</h3>
        <h3>Wins : {player.details.statistics.wins}</h3>
        <h3>Losses : {player.details.statistics.losses}</h3>
        {/* Render more detailed statistics here */}
      </div>
      <button className="back-button" onClick={() => window.history.back()}>Back</button>
    </div>
  );
};

export default PlayerDetailPage;
