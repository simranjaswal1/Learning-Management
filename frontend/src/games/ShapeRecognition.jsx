import React, { useState } from "react";

const shapes = [
  { name: "Circle", color: "#ff6b6b", symbol: "⚪" },
  { name: "Square", color: "#4dabf7", symbol: "◼️" },
  { name: "Triangle", color: "#f59f00", symbol: "🔺" },
];

const ShapeRecognitionGame = () => {
  const [matchedShapes, setMatchedShapes] = useState([]);

  const handleDrop = (e, targetShape) => {
    const droppedShape = e.dataTransfer.getData("shape");
    if (droppedShape === targetShape) {
      setMatchedShapes((prev) => [...prev, targetShape]);
    }
  };

  const handleDragStart = (e, shapeName) => {
    e.dataTransfer.setData("shape", shapeName);
  };

  const handleReset = () => {
    setMatchedShapes([]);
  };

  return (
    <div style={styles.container}>
      <h2>🧩 Shape Matching Game</h2>
      <p>Drag the shape to the matching outline!</p>

      <div style={styles.shapesRow}>
        {shapes.map((shape) => (
          <div
            key={shape.name}
            draggable
            onDragStart={(e) => handleDragStart(e, shape.name)}
            style={{
              ...styles.draggableShape,
              backgroundColor: matchedShapes.includes(shape.name)
                ? "#ccc"
                : shape.color,
              cursor: matchedShapes.includes(shape.name) ? "not-allowed" : "grab",
            }}
          >
            {shape.symbol}
          </div>
        ))}
      </div>

      <div style={styles.dropZoneRow}>
        {shapes.map((shape) => (
          <div
            key={shape.name}
            onDragOver={(e) => e.preventDefault()}
            onDrop={(e) => handleDrop(e, shape.name)}
            style={{
              ...styles.dropZone,
              borderColor: matchedShapes.includes(shape.name)
                ? "green"
                : "#333",
              backgroundColor: matchedShapes.includes(shape.name)
                ? "#d3f9d8"
                : "#f8f9fa",
            }}
          >
            {matchedShapes.includes(shape.name) ? "✔ Matched!" : shape.name}
          </div>
        ))}
      </div>

      {matchedShapes.length === shapes.length && (
        <div style={styles.winMessage}>
          🎉 All shapes matched correctly!
          <button onClick={handleReset} style={styles.resetBtn}>Play Again</button>
        </div>
      )}
    </div>
  );
};

const styles = {
  container: {
    textAlign: "center",
    fontFamily: "'Poppins', sans-serif",
    padding: "2rem",
  },
  shapesRow: {
    display: "flex",
    justifyContent: "center",
    gap: "1rem",
    marginBottom: "2rem",
  },
  draggableShape: {
    width: "80px",
    height: "80px",
    borderRadius: "12px",
    fontSize: "2rem",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
  },
  dropZoneRow: {
    display: "flex",
    justifyContent: "center",
    gap: "1rem",
    flexWrap: "wrap",
  },
  dropZone: {
    width: "100px",
    height: "100px",
    border: "3px dashed #333",
    borderRadius: "12px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "1.1rem",
    transition: "0.3s ease-in-out",
  },
  winMessage: {
    marginTop: "2rem",
    fontSize: "1.3rem",
    color: "#2f9e44",
  },
  resetBtn: {
    marginTop: "1rem",
    padding: "0.5rem 1rem",
    backgroundColor: "#4dabf7",
    color: "#fff",
    border: "none",
    borderRadius: "8px",
    fontSize: "1rem",
    cursor: "pointer",
  },
};

export default ShapeRecognitionGame;
