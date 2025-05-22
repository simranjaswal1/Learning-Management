// src/components/GamePlayer.jsx
import React from 'react';

function GamePlayer() {
  return (
    <div style={{ height: '100vh' }}>
      <iframe
        src="/games/index.html"  // Ensure this path points to the correct location of your game file
        title="Game"
        width="70%"
        height="100%"
        style={{ border: 'none' }}
      ></iframe>
    </div>
  );
}

export default GamePlayer;
