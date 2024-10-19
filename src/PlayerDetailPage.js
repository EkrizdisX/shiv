import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

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
    <div>
      <h1>{player.name}</h1>
      <img src={player.picture} alt={player.name} width="200" height="200" />
      <h2>Role: {player.details.role}</h2>
      <h3>Rank: {player.details.rank}</h3>
      {/* Render more detailed statistics here */}
    </div>
  );
};

export default PlayerDetailPage;