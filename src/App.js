import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import GamesPage from './GamesPage';
import PlayersPage from './PlayersPage';
import PlayerDetailPage from './PlayerDetailPage';
import PlayerSubmissionPage from './PlayerSubmissionPage'; // Import new component
import AcceptancePage from './AcceptancePage'; // Import Acceptance page
import LoginPage from './LoginPage';


const App = () => {
  const location = useLocation();

  useEffect(() => {
    // Reset body class
    document.body.className = '';

    // Set body class based on the current route
    if (location.pathname.includes('players')) {
      document.body.classList.add('players'); // Styles for PlayersPage
    } else if (location.pathname.includes('games')) {
      document.body.classList.add('games'); // Styles for GamesPage
    } else if (location.pathname.includes('insert-player')) {
      document.body.classList.add('insert-player'); // Styles for Player Submission Page
    } else if (location.pathname.includes('acceptance')) {
      document.body.classList.add('acceptance'); // Styles for Acceptance Page
    } else if (location.pathname.includes('login')) {
      document.body.classList.add('login'); // Styles for Acceptance Page
    } else {
      document.body.classList.add('default'); // Default styles
    }
  }, [location]);

  return (
    <Routes>
      <Route path="/Games" element={<GamesPage />} />
      <Route path="/players/:gameId" element={<PlayersPage />} />
      <Route path="/player/:playerId" element={<PlayerDetailPage />} />
      <Route path="/insert-player" element={<PlayerSubmissionPage />} />
      <Route path="/acceptance" element={<AcceptancePage />} />
      <Route path="/" element={<LoginPage />} />
    </Routes>
  );
};

const RouterWrapper = () => (
  <Router>
    <App />
  </Router>
);

export default RouterWrapper;
