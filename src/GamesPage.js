import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom'; 
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
    <div className="background-video-container1">
      <video autoPlay muted loop className="background-video1">
        <source src="/nep.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <div>
        <nav className="navigation-menu">
          <Link to="/" className="nav-link">Home</Link>
          <Link to="/insert-player" className="nav-link">Register Yourself</Link>
        </nav>
        <div className='tit'>
        <h1>Games</h1>
        </div>
        <div className="games-page-container">
          
          <div className="games-grid">
            {games.map(game => (
              <div key={game._id} className="card">
                <div className='wrapper'>
                <img src={game.thumbnail} alt={game.name} class="cover-image"/>
                </div>
                <img src={game.after_t} alt={game.name} class="character"/>
                <div className='game-card-content'>
                  <h3>{game.name}</h3>
                  <button className="like-button" onClick={() => handleLikeGame(game._id)}>Check Out</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className='bottom-frag'>
        <p>CHAPTER ONE
THE BOY WHO LIVED
Mr. and Mrs. Dursley, of number four, Privet Drive, were proud to say
that they were perfectly normal, thank you very much. They were the last
people you'd expect to be involved in anything strange or mysterious,
because they just didn't hold with such nonsense.
Mr. Dursley was the director of a firm called Grunnings, which made
drills. He was a big, beefy man with hardly any neck, although he did
have a very large mustache. Mrs. Dursley was thin and blonde and had
nearly twice the usual amount of neck, which came in very useful as she
spent so much of her time craning over garden fences, spying on the
neighbors. The Dursleys had a small son called Dudley and in their
opinion there was no finer boy anywhere.
</p>
      </div>
    </div>
  );
};

export default GamesPage;
