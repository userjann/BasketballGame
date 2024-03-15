import React, { useState } from 'react';
import './App.css';
import basketballImage from './basketball.jpg';

function BasketballGame() {
  const [guestScore, setGuestScore] = useState(0);
  const [homeScore, setHomeScore] = useState(0);
  const [history, setHistory] = useState([]);
  const [guestProgress, setGuestProgress] = useState(0);
  const [homeProgress, setHomeProgress] = useState(0);
  const [guestCanThrow, setGuestCanThrow] = useState(true);
  const [homeCanThrow, setHomeCanThrow] = useState(true);
  const targetScore = 12;

  const throwBall = (isGuestThrow) => {
    if ((isGuestThrow && !guestCanThrow) || (!isGuestThrow && !homeCanThrow)) return;

    const points = Math.random() < 0.5 ? 3 : 0;

    if (isGuestThrow) {
      setGuestScore(guestScore + points);
      setGuestProgress((guestScore + points) / targetScore * 100);
      setHistory([...history, `Guest scored ${points} points`]);
      setHomeCanThrow(true);
      setGuestCanThrow(false);
    } else {
      setHomeScore(homeScore + points);
      setHomeProgress((homeScore + points) / targetScore * 100);
      setHistory([...history, `Home scored ${points} points`]);
      setHomeCanThrow(false);
      setGuestCanThrow(true);
    }

    if (guestScore + points >= targetScore) {
      setHistory([...history, 'Guest wins!']);
    } else if (homeScore + points >= targetScore) {
      setHistory([...history, 'Home wins!']);
    }
  };

  const clearData = () => {
    setGuestScore(0);
    setHomeScore(0);
    setHistory([]);
    setGuestProgress(0);
    setHomeProgress(0);
    setGuestCanThrow(true);
    setHomeCanThrow(true);
  };

  return (
    <div className="game-container">
      <div className="team-container">
        <div className="team-info">
          <div className="team-name">Guest</div>
          <progress className="progress-bar" value={guestProgress} max={100} />
          <button className="throw-button" onClick={() => throwBall(true)} disabled={!guestCanThrow}>Throw</button>
        </div>
        <img className="basketball-image" src={basketballImage} alt="Basketball" />
        <div className="team-info">
          <div className="team-name">Home</div>
          <progress className="progress-bar" value={homeProgress} max={100} />
          <button className="throw-button" onClick={() => throwBall(false)} disabled={!homeCanThrow}>Throw</button>
        </div>
      </div>
      <div className="score-container">
        <div className="score">{guestScore}</div>
        <div className="score">{homeScore}</div>
      </div>
      <button className="clear-button" onClick={clearData}>Clear</button>
      <ul className="history">
        {history.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
    </div>
  );
}

export default BasketballGame;
