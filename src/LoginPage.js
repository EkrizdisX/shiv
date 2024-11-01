import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './LoginPage.css';

const LoginPage = () => {
  const [showLoginForm, setShowLoginForm] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [activeSlide, setActiveSlide] = useState(0);
  const navigate = useNavigate();

  const slides = [
    { title: 'Slide 1', subtitle: 'Welcome to Slide 1',para: 'Our application allows you to create profiles' },
    { title: 'Slide 2', subtitle: 'Welcome to Slide 2',para: 'From where orgs can link with the players' },
    { title: 'Slide 3', subtitle: 'Welcome to Slide 3',para: 'Completely free of charge' },
  ];

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/login', {
        username,
        password,
      }, {
        headers: {
          'Content-Type': 'application/json'
        }
      });

      if (response.data.success) {
        navigate('/games');
      } else {
        setError(response.data.message || 'Invalid username or password');
      }
    } catch (error) {
      console.error("Login request error:", error);
      setError('An error occurred. Please try again.');
    }
  };

  const handleSignUpClick = () => {
    setShowLoginForm(true);
  };

  const handleDotClick = (index) => {
    setActiveSlide(index);
  };

  return (
    <div className="login-container">
      <div className="slide-container">
        {slides.map((slide, index) => (
          <div
            key={index}
            className={`slide ${activeSlide === index ? 'active' : ''}`}
          >
            <div className="slide-content">

              <p>{slide.para}</p>
            </div>
          </div>
        ))}
      </div>

  {/* Dots Navigation */}
  <div className="dots-container">
    {slides.map((_, index) => (
      <div
        key={index}
        className={`dot ${activeSlide === index ? 'active' : ''}`}
        onClick={() => handleDotClick(index)}
      ></div>
    ))}
  </div>

  {/* Login Form */}
  {showLoginForm ? (
    <div className="form-section">
      <h2>Login</h2>
      {error && <p className="error">{error}</p>}
      <form onSubmit={handleLogin}>
        <div className="form-group">
          <label htmlFor="username">Username : </label>
          <input
            type="text"
            className="form-control"
            id="username"
            
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password : </label>
          <input
            type="password"
            className="form-control"
            id="password"
            
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">Login</button>
      </form>
    </div>
  ) : (
    <button onClick={handleSignUpClick} className="btn btn-primary">
      Sign Up
    </button>
  )}
</div>
  );
};

export default LoginPage;