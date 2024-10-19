import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import GamesPage from './GamesPage'; // Ensure this path is correct
import PlayersPage from './PlayersPage'; // Ensure this path is correct
import PlayerDetailPage from './PlayerDetailPage'; // Ensure this path is correct

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<GamesPage />} /> {/* Ensure this line is correct */}
        <Route path="/players/:gameId" element={<PlayersPage />} />
        <Route path="/player/:playerId" element={<PlayerDetailPage />} />
      </Routes>
    </Router>
  );
};

export default App;
