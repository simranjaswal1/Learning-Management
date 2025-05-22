import React, { useState, useEffect } from 'react';
import './BlueBlock.css';

const getRandomIndex = (size) => Math.floor(Math.random() * size);

const BlueBlock = () => {
  const [blueIndex, setBlueIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(30);
  const [gameActive, setGameActive] = useState(true);

  const totalBlocks = 15;

  useEffect(() => {
    if (gameActive && timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else {
      setGameActive(false);
    }
  }, [timeLeft, gameActive]);

  const handleClick = (index) => {
    if (!gameActive) return;
    if (index === blueIndex) {
      setScore(score + 1);
      setBlueIndex(getRandomIndex(totalBlocks));
    }
  };

  const resetGame = () => {
    setScore(0);
    setTimeLeft(30);
    setBlueIndex(getRandomIndex(totalBlocks));
    setGameActive(true);
  };

  return (
    <div className="blue-block-container">
      <h2>🟦 Blue Block Game</h2>
      <p>Click the blue block as fast as you can!</p>
      <div className="info">
        <span>⏱️ Time Left: {timeLeft}s</span>
        <span>🏆 Score: {score}</span>
      </div>
      <div className="grid">
        {Array.from({ length: totalBlocks }).map((_, index) => (
          <div
            key={index}
            className={`block ${index === blueIndex ? 'blue' : ''}`}
            onClick={() => handleClick(index)}
          ></div>
        ))}
      </div>
      {!gameActive && (
        <button className="restart-btn" onClick={resetGame}>🔁 Play Again</button>
      )}
    </div>
  );
};

export default BlueBlock;
