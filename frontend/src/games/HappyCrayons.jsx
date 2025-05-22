import React, { useState, useEffect } from 'react';
import './HappyCrayons.css';

const COLORS = [
  { name: 'Red', hex: '#e74c3c' },
  { name: 'Blue', hex: '#3498db' },
  { name: 'Green', hex: '#2ecc71' },
  { name: 'Purple', hex: '#9b59b6' },
  { name: 'Orange', hex: '#e67e22' },
  { name: 'Yellow', hex: '#f1c40f' },
  { name: 'Pink', hex: '#fd79a8' },
];

function shuffle(array) {
  return [...array].sort(() => Math.random() - 0.5);
}

const HappyCrayons = () => {
  const [shuffledColors, setShuffledColors] = useState([]);
  const [targetColor, setTargetColor] = useState(null);
  const [score, setScore] = useState(0);
  const [message, setMessage] = useState('');

  useEffect(() => {
    startGame();
  }, []);

  const startGame = () => {
    const newColors = shuffle(COLORS).slice(0, 4);
    setShuffledColors(newColors);
    setTargetColor(newColors[Math.floor(Math.random() * newColors.length)]);
    setMessage('');
  };

  const handleClick = (color) => {
    if (color.name === targetColor.name) {
      setScore(score + 1);
      setMessage('🎉 Correct! Great job!');
    } else {
      setMessage('❌ Oops! Try again.');
    }

    setTimeout(() => {
      startGame();
    }, 1000);
  };

  return (
    <div className="crayon-game-container">
      <h2>🎨 Happy Crayons Game</h2>
      <p className="instruction">Click the crayon that is <strong>{targetColor?.name}</strong></p>
      <div className="crayon-options">
        {shuffledColors.map((color) => (
          <button
            key={color.name}
            className="crayon"
            style={{ backgroundColor: color.hex }}
            onClick={() => handleClick(color)}
          />
        ))}
      </div>
      <p className="message">{message}</p>
      <p className="score">Score: {score}</p>
      <button className="reset-btn" onClick={startGame}>🔁 Reset Game</button>
    </div>
  );
};

export default HappyCrayons;
