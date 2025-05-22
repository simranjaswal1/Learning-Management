import { useState } from "react";
import "./style.css";

const RiddleCard = ({ title, riddle, answer, hint }) => {
  const [flipped, setFlipped] = useState(false);
  const [showHint, setShowHint] = useState(false);

  const handleFlip = () => setFlipped(!flipped);
  const handleHint = (e) => {
    e.stopPropagation(); // Prevent flip when clicking hint
    setShowHint(!showHint);
  };

  return (
    <div className={`riddle-card ${flipped ? "flipped" : ""}`} onClick={handleFlip}>
      <div className="card-inner">
        <div className="card-front">
          <h3 className="riddle-title">{title}</h3>
          <p className="riddle-text">{riddle}</p>
          <button className="hint-btn" onClick={handleHint}>💡 Hint</button>
          {showHint && <p className="hint-text">{hint}</p>}
        </div>
        <div className="card-back">
          <p className="answer-text">{answer}</p>
        </div>
      </div>
    </div>
  );
};

export default RiddleCard;
