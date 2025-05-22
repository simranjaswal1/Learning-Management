import React, { useState, useEffect } from "react";

const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

const shuffleArray = (array) => [...array].sort(() => Math.random() - 0.5);

const AlphabetMatchingGame = () => {
  const [cards, setCards] = useState([]);
  const [flipped, setFlipped] = useState([]);
  const [matched, setMatched] = useState([]);

  useEffect(() => {
    const newCards = letters
      .slice(0, 8)
      .flatMap((letter, i) => [
        { id: i, letter, caseType: "upper" },
        { id: i, letter, caseType: "lower" },
      ]);
    setCards(shuffleArray(newCards));
  }, []);

  const handleFlip = (index) => {
    if (
      flipped.length === 2 ||
      flipped.includes(index) ||
      matched.includes(cards[index].id)
    )
      return;

    const newFlipped = [...flipped, index];
    setFlipped(newFlipped);

    if (newFlipped.length === 2) {
      const [first, second] = newFlipped;
      if (
        cards[first].id === cards[second].id &&
        cards[first].caseType !== cards[second].caseType
      ) {
        setMatched([...matched, cards[first].id]);
      }
      setTimeout(() => setFlipped([]), 1000);
    }
  };

  const handleReset = () => {
    setMatched([]);
    setFlipped([]);
    setCards(shuffleArray(cards));
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Alphabet Matching Game</h2>
      <p style={styles.subtitle}>Match uppercase letters with their lowercase partners!</p>

      <div style={styles.gridWrapper}>
        <div style={styles.grid}>
          {cards.map((card, index) => {
            const isFlipped =
              flipped.includes(index) || matched.includes(card.id);

            return (
              <div
                key={index}
                style={styles.cardContainer}
                onClick={() => handleFlip(index)}
              >
                <div
                  style={{
                    ...styles.cardInner,
                    transform: isFlipped ? "rotateY(180deg)" : "rotateY(0deg)",
                  }}
                >
                  <div style={styles.cardFront}></div>
                  <div
                    style={{
                      ...styles.cardBack,
                      backgroundColor: matched.includes(card.id)
                        ? "#4caf50"
                        : "#2196f3",
                    }}
                  >
                    {card.caseType === "upper"
                      ? card.letter
                      : card.letter.toLowerCase()}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {matched.length === cards.length / 2 && (
        <div style={styles.winMessage}>
          🎉 You matched all pairs! Great job! 🎉
          <br />
          <button onClick={handleReset} style={styles.resetBtn}>
            Play Again
          </button>
        </div>
      )}
    </div>
  );
};

const styles = {
  container: {
    fontFamily: "'Poppins', sans-serif",
    textAlign: "center",
    padding: "1.5rem",
  },
  title: {
    fontSize: "1.8rem",
  },
  subtitle: {
    fontSize: "1rem",
    marginBottom: "1rem",
  },
  gridWrapper: {
    display: "flex",
    justifyContent: "center",
    padding: "1rem",
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(70px, 1fr))",
    gap: "12px",
    width: "100%",
    maxWidth: "500px",
  },
  cardContainer: {
    perspective: "800px",
  },
  cardInner: {
    position: "relative",
    width: "80%",
    aspectRatio: "1 / 1",
    transformStyle: "preserve-3d",
    transition: "transform 0.6s ease",
  },
  cardFront: {
    position: "absolute",
    width: "100%",
    height: "100%",
    backgroundColor: "#bbb",
    borderRadius: "12px",
    backfaceVisibility: "hidden",
  },
  cardBack: {
    position: "absolute",
    width: "100%",
    height: "100%",
    fontSize: "2rem",
    color: "white",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: "12px",
    backfaceVisibility: "hidden",
    transform: "rotateY(180deg)",
    userSelect: "none",
    transition: "background-color 0.3s ease",
  },
  winMessage: {
    marginTop: "2rem",
    fontSize: "1.2rem",
    color: "#4caf50",
  },
  resetBtn: {
    marginTop: "1rem",
    padding: "0.6rem 1.2rem",
    fontSize: "1rem",
    borderRadius: "8px",
    border: "none",
    backgroundColor: "#2196f3",
    color: "white",
    cursor: "pointer",
  },
};

export default AlphabetMatchingGame;
