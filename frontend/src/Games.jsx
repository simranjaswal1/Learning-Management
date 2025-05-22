import React, { useState } from "react";
import "./Games.css";

import NumberCountingGame from "./games/NumberCountings";
import HappyCrayons from "./games/HappyCrayons";
import TicTacToe from "./games/tictactoe";
import BlueBlock from "./games/BlueBlock";
import SudokuBoard from "./games/SudokuBoard";
import NumberSequenceGame from "./games/NumberSequence";
import AlphabetMatchingGame from "./games/AlphabetMatching";
import ShapeRecognitionGame from "./games/ShapeRecognition";
import PatternGame from "./games/Pattern";
import MazeGame from "./games/MazeGame";

const gamesList = [
  { name: "Happy Crayons", component: HappyCrayons },
  { name: "Tic Tac Toe", component: TicTacToe },
  { name: "Blue Block", component: BlueBlock },
  { name: "Sudoku Board", component: SudokuBoard },
  { name: "Number Counting", component: NumberCountingGame },
  { name: "Number Sequence", component: NumberSequenceGame },
  { name: "Alphabet Matching", component: AlphabetMatchingGame },
  { name: "Shape Recognition", component: ShapeRecognitionGame },
  { name: "Pattern Game", component: PatternGame },
  { name: "Maze Game", component: MazeGame },
];

const Games = () => {
  const [selectedGameIndex, setSelectedGameIndex] = useState(0);
  const SelectedGameComponent = gamesList[selectedGameIndex].component;

  return (
    <div className="games-container">
      <h2 className="games-header">Select a Game to Play</h2>

      <div className="games-grid">
        {gamesList.map((game, index) => (
          <div
            key={game.name}
            onClick={() => setSelectedGameIndex(index)}
            className={`game-card ${
              index === selectedGameIndex ? "selected" : ""
            }`}
          >
            {game.name}
          </div>
        ))}
      </div>

      <div className="selected-game-container">
        <SelectedGameComponent />
      </div>
    </div>
  );
};

export default Games;
