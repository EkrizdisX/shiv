import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import GamesPage from './GamesPage';
import PlayersPage from './PlayersPage';
import PlayerDetailPage from './PlayerDetailPage';
import PlayerSubmissionPage from './PlayerSubmissionPage'; // Import new component
import AcceptancePage from './AcceptancePage'; // Import Acceptance page

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<GamesPage />} />
        <Route path="/players/:gameId" element={<PlayersPage />} />
        <Route path="/player/:playerId" element={<PlayerDetailPage />} />
        <Route path="/insert-player" element={<PlayerSubmissionPage />} /> {/* New Route */}
        <Route path="/acceptance" element={<AcceptancePage />} /> {/* New Acceptance Route */}
      </Routes>
    </Router>
  );
};

export default App;
