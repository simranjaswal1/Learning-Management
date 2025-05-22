import React, { useState, useEffect, useCallback } from "react";
import { useMemo } from "react";
const ROWS = 15;
const COLS = 15;

const DIRECTIONS = [
  [-1, 0],
  [0, 1],
  [1, 0],
  [0, -1],
];

function generateMaze(rows, cols) {
  const maze = Array(rows).fill(null).map(() => Array(cols).fill(1));
  function inBounds(r, c) {
    return r >= 0 && r < rows && c >= 0 && c < cols;
  }
  function carvePassagesFrom(r, c) {
    maze[r][c] = 0;
    const dirs = DIRECTIONS.sort(() => Math.random() - 0.5);
    for (const [dr, dc] of dirs) {
      const nr = r + dr * 2;
      const nc = c + dc * 2;
      if (inBounds(nr, nc) && maze[nr][nc] === 1) {
        maze[r + dr][c + dc] = 0;
        carvePassagesFrom(nr, nc);
      }
    }
  }
  carvePassagesFrom(1, 1);
  return maze;
}

export default function MazeGame() {
  const [maze, setMaze] = useState(() => generateMaze(ROWS, COLS));
  const [playerPos, setPlayerPos] = useState({ row: 1, col: 1 });
  const [moves, setMoves] = useState(0);
  const [won, setWon] = useState(false);

const exitPos = useMemo(() => ({ row: ROWS - 2, col: COLS - 2 }), []);
  const movePlayer = useCallback(
    (dr, dc) => {
      if (won) return;

      const newRow = playerPos.row + dr;
      const newCol = playerPos.col + dc;

      if (
        newRow >= 0 &&
        newRow < ROWS &&
        newCol >= 0 &&
        newCol < COLS &&
        maze[newRow][newCol] === 0
      ) {
        setPlayerPos({ row: newRow, col: newCol });
        setMoves((m) => m + 1);
        if (newRow === exitPos.row && newCol === exitPos.col) {
          setWon(true);
        }
      }
    },
    [playerPos, maze, won, exitPos]
  );

  useEffect(() => {
    function handleKey(e) {
      if (won) return;
      switch (e.key) {
        case "ArrowUp":
          movePlayer(-1, 0);
          break;
        case "ArrowDown":
          movePlayer(1, 0);
          break;
        case "ArrowLeft":
          movePlayer(0, -1);
          break;
        case "ArrowRight":
          movePlayer(0, 1);
          break;
        default:
          break;
      }
    }
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [movePlayer, won]);

  const restartGame = () => {
    setMaze(generateMaze(ROWS, COLS));
    setPlayerPos({ row: 1, col: 1 });
    setMoves(0);
    setWon(false);
  };

  // Responsive cell size based on window width
  const [cellSize, setCellSize] = useState(30);

  useEffect(() => {
    function updateCellSize() {
      const width = window.innerWidth;
      if (width < 400) setCellSize(20);
      else if (width < 600) setCellSize(25);
      else setCellSize(30);
    }
    updateCellSize();
    window.addEventListener("resize", updateCellSize);
    return () => window.removeEventListener("resize", updateCellSize);
  }, []);

  return (
    <div
      style={{
        userSelect: "none",
        maxWidth: 600,
        margin: "auto",
        fontFamily: "Arial, sans-serif",
        padding: "0 10px",
      }}
    >
      <h1>🌀 Maze Game</h1>
      <p>Use arrow keys to reach the exit (green square). Moves: {moves}</p>
      {won && (
        <div
          style={{
            padding: 10,
            marginBottom: 10,
            backgroundColor: "#d4edda",
            color: "#155724",
            borderRadius: 5,
            fontWeight: "bold",
          }}
        >
          🎉 You reached the exit! Congrats! 🎉
        </div>
      )}

      <div
        style={{
          display: "grid",
          gridTemplateColumns: `repeat(${COLS}, ${cellSize}px)`,
          gridTemplateRows: `repeat(${ROWS}, ${cellSize}px)`,
          gap: 2,
          backgroundColor: "#333",
          padding: 10,
          borderRadius: 8,
          overflowX: "auto",
        }}
      >
        {maze.flatMap((rowArr, r) =>
          rowArr.map((cell, c) => {
            const isPlayer = playerPos.row === r && playerPos.col === c;
            const isExit = exitPos.row === r && exitPos.col === c;

            let bgColor = cell === 1 ? "#222" : "#eee";
            if (isExit) bgColor = "#4caf50";
            if (isPlayer) bgColor = "#2196f3";

            return (
              <div
                key={`${r}-${c}`}
                style={{
                  width: cellSize,
                  height: cellSize,
                  backgroundColor: bgColor,
                  borderRadius: 4,
                  boxShadow: isPlayer ? "0 0 8px 3px #2196f3" : "none",
                  transition: "background-color 0.3s",
                }}
              />
            );
          })
        )}
      </div>

      <button
        onClick={restartGame}
        style={{
          marginTop: 15,
          padding: "10px 20px",
          fontSize: 16,
          borderRadius: 6,
          border: "none",
          backgroundColor: "#2196f3",
          color: "white",
          cursor: "pointer",
          width: "100%",
          maxWidth: 200,
          display: "block",
          marginLeft: "auto",
          marginRight: "auto",
        }}
      >
        Restart Maze
      </button>
    </div>
  );
}
