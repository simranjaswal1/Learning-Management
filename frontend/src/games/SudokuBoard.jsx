import React, { useState } from 'react';
import './SudokuBoard.css';

const initialBoard = [
  [5, 3, '', '', 7, '', '', '', ''],
  [6, '', '', 1, 9, 5, '', '', ''],
  ['', 9, 8, '', '', '', '', 6, ''],
  [8, '', '', '', 6, '', '', '', 3],
  [4, '', '', 8, '', 3, '', '', 1],
  [7, '', '', '', 2, '', '', '', 6],
  ['', 6, '', '', '', '', 2, 8, ''],
  ['', '', '', 4, 1, 9, '', '', 5],
  ['', '', '', '', 8, '', '', 7, 9]
];

function SudokuBoard() {
  const [board, setBoard] = useState(initialBoard);

  const handleChange = (row, col, value) => {
    const updated = board.map((r, i) =>
      r.map((c, j) => (i === row && j === col ? value : c))
    );
    setBoard(updated);
  };

  const checkSolution = () => {
    const flat = board.flat();
    if (flat.includes('') || flat.includes(0)) {
      alert('Fill in all cells!');
      return;
    }
    alert('Puzzle submitted! (No validation logic in this version)');
  };

  return (
    <div className="sudoku-container">
      <h2>Sudoku</h2>
      <div className="sudoku-board">
        {board.map((row, i) => (
          <div className="sudoku-row" key={i}>
            {row.map((cell, j) => (
              <input
                key={`${i}-${j}`}
                type="text"
                maxLength="1"
                className="sudoku-cell"
                value={cell}
                onChange={(e) => handleChange(i, j, e.target.value.replace(/[^1-9]/g, ''))}
                disabled={initialBoard[i][j] !== ''}
              />
            ))}
          </div>
        ))}
      </div>
      <button onClick={checkSolution} className="check-btn">Check</button>
    </div>
  );
}

export default SudokuBoard;
