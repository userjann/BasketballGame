import React, { useState } from 'react';
import './App.css'; // Importieren von Stylesheets

// Importieren des Bildes für den Basketball
import basketballImage from './basketball.jpg';

function BasketballGame() {
  // Verwendung von useState, um verschiedene Zustände zu verfolgen
  const [guestScore, setGuestScore] = useState(0);
  const [homeScore, setHomeScore] = useState(0);
  const [history, setHistory] = useState([]);
  const [guestProgress, setGuestProgress] = useState(0);
  const [homeProgress, setHomeProgress] = useState(0);
  const [guestCanThrow, setGuestCanThrow] = useState(true);
  const [homeCanThrow, setHomeCanThrow] = useState(true);
  const targetScore = 12; // Definieren des Ziel-Scores

  // Funktion zum Werfen des Balls, basierend auf dem Team, das wirft
  const throwBall = (isGuestThrow) => {
    // Überprüfen, ob das Team werfen kann, um doppelte Würfe zu verhindern
    if ((isGuestThrow && !guestCanThrow) || (!isGuestThrow && !homeCanThrow)) return;

    // Zufällige Punktzahl, entweder 3 Punkte oder 0 Punkte
    const points = Math.random() < 0.5 ? 3 : 0;

    if (isGuestThrow) {
      // Aktualisieren des Gastscores und des Fortschritts
      setGuestScore(guestScore + points);
      setGuestProgress((guestScore + points) / targetScore * 100);
      // Aktualisieren der Historie und der Wurfberechtigung
      setHistory([...history, `Guest scored ${points} points`]);
      setHomeCanThrow(true);
      setGuestCanThrow(false);
    } else {
      // Aktualisieren des Heimscores und des Fortschritts
      setHomeScore(homeScore + points);
      setHomeProgress((homeScore + points) / targetScore * 100);
      // Aktualisieren der Historie und der Wurfberechtigung
      setHistory([...history, `Home scored ${points} points`]);
      setHomeCanThrow(false);
      setGuestCanThrow(true);
    }

    // Überprüfen auf Sieg eines der Teams
    if (guestScore + points >= targetScore) {
      setHistory([...history, 'Guest wins!']);
    } else if (homeScore + points >= targetScore) {
      setHistory([...history, 'Home wins!']);
    }
  };

  // Funktion zum Löschen der Spiel- und Wurfberechtigungsdaten
  const clearData = () => {
    setGuestScore(0);
    setHomeScore(0);
    setHistory([]);
    setGuestProgress(0);
    setHomeProgress(0);
    setGuestCanThrow(true);
    setHomeCanThrow(true);
  };

  // Rückgabe des JSX-Elements
  return (
    <div className="game-container">
      <div className="team-container">
        {/* Gastteam-Anzeige */}
        <div className="team-info">
          <div className="team-name">Guest</div>
          <progress className="progress-bar" value={guestProgress} max={100} />
          <button className="throw-button" onClick={() => throwBall(true)} disabled={!guestCanThrow}>Throw</button>
        </div>
        {/* Bild des Basketballs */}
        <img className="basketball-image" src={basketballImage} alt="Basketball" />
        {/* Heimteam-Anzeige */}
        <div className="team-info">
          <div className="team-name">Home</div>
          <progress className="progress-bar" value={homeProgress} max={100} />
          <button className="throw-button" onClick={() => throwBall(false)} disabled={!homeCanThrow}>Throw</button>
        </div>
      </div>
      {/* Anzeige der aktuellen Punkte */}
      <div className="score-container">
        <div className="score">{guestScore}</div>
        <div className="score">{homeScore}</div>
      </div>
      {/* Button zum Löschen der Daten */}
      <button className="clear-button" onClick={clearData}>Clear</button>
      {/* Anzeige der Wurfhistorie */}
      <ul className="history">
        {history.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
    </div>
  );
}


export default BasketballGame;
