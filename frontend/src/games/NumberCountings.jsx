import React, { useState, useEffect } from 'react';

const fruits = [
  {
    name: 'apple',
    url: 'https://tse4.mm.bing.net/th?id=OIP.Gw8UJWeWkMxTZp4v96X9KAHaE5&pid=Api&P=0&h=180',
  },
  {
    name: 'orange',
    url: 'https://upload.wikimedia.org/wikipedia/commons/c/c4/Orange-Fruit-Pieces.jpg',
  },
  {
    name: 'mango',
    url: 'https://upload.wikimedia.org/wikipedia/commons/9/90/Hapus_Mango.jpg',
  },
];

const getRandomNumber = (max) => Math.floor(Math.random() * max) + 1;
const getRandomFruit = () => fruits[Math.floor(Math.random() * fruits.length)];

const NumberCountingGame = () => {
  const [count, setCount] = useState(getRandomNumber(5));
  const [fruit, setFruit] = useState(getRandomFruit());
  const [selected, setSelected] = useState(null);
  const [isCorrect, setIsCorrect] = useState(null);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const options = [1, 2, 3, 4, 5];

  const handleOptionClick = (num) => {
    setSelected(num);
    setIsCorrect(num === count);
  };

  const handleNext = () => {
    setCount(getRandomNumber(5));
    setFruit(getRandomFruit());
    setSelected(null);
    setIsCorrect(null);
  };

  const fruitSize = windowWidth < 480 ? 50 : windowWidth < 768 ? 65 : 80;
  const headingFontSize = windowWidth < 480 ? '1.5rem' : windowWidth < 768 ? '2rem' : '2.5rem';

  // iPhone SE specific smaller sizes under 360px width
  const optionButtonFontSize =
    windowWidth < 360 ? '0.9rem' : windowWidth < 480 ? '1.1rem' : '1.5rem';
  const optionButtonPadding =
    windowWidth < 360 ? '0.4rem 0.6rem' : windowWidth < 480 ? '0.7rem 1rem' : '1rem 1.5rem';
  const optionButtonMinWidth = windowWidth < 360 ? 30 : 40;

  return (
    <div
      style={{
        ...styles.container,
        padding: windowWidth < 480 ? '1rem' : '2rem',
        maxWidth: '480px',
        width: '90%',
      }}
    >
      <h2 style={{ fontSize: headingFontSize }}>
        How many {fruit.name}s do you see?
      </h2>
      <div
        style={{
          ...styles.fruitsContainer,
          gap: windowWidth < 480 ? 6 : 10,
        }}
      >
        {Array.from({ length: count }).map((_, i) => (
          <img
            key={i}
            src={fruit.url}
            alt={fruit.name}
            style={{
              width: fruitSize,
              height: fruitSize,
              margin: 5,
              borderRadius: 8,
              objectFit: 'cover',
            }}
          />
        ))}
      </div>

      <div
        style={{
          ...styles.optionsContainer,
          maxWidth: '100%',
          justifyContent: 'center',
          gap: '0.5rem',
        }}
      >
        {options.map((num) => (
          <button
            key={num}
            onClick={() => handleOptionClick(num)}
            disabled={selected !== null}
            style={{
              ...styles.optionButton,
              fontSize: optionButtonFontSize,
              padding: optionButtonPadding,
              backgroundColor:
                selected === num
                  ? isCorrect
                    ? '#4caf50'
                    : '#f44336'
                  : '#2196f3',
              cursor: selected === null ? 'pointer' : 'default',
              flex: `1 1 ${optionButtonMinWidth}px`,
              minWidth: optionButtonMinWidth,
              maxWidth: 'calc(20% - 8px)',
              boxSizing: 'border-box',
            }}
          >
            {num}
          </button>
        ))}
      </div>

      {selected !== null && (
        <div style={styles.feedback}>
          {isCorrect ? (
            <p style={{ color: '#4caf50' }}>Correct! 🎉</p>
          ) : (
            <p style={{ color: '#f44336' }}>
              Oops! The correct answer is {count}.
            </p>
          )}
          <button onClick={handleNext} style={styles.nextButton}>
            Next
          </button>
        </div>
      )}
    </div>
  );
};

const styles = {
  container: {
    fontFamily: "'Poppins', sans-serif",
    textAlign: 'center',
    margin: 'auto',
  },
  fruitsContainer: {
    margin: '1.5rem 0',
    display: 'flex',
    justifyContent: 'center',
    flexWrap: 'wrap',
  },
  optionsContainer: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  optionButton: {
    borderRadius: '12px',
    border: 'none',
    color: 'white',
    transition: 'background-color 0.3s ease',
    userSelect: 'none',
  },
  feedback: {
    marginTop: '1.5rem',
    fontSize: '1.25rem',
  },
  nextButton: {
    marginTop: '1rem',
    padding: '0.7rem 1.4rem',
    fontSize: '1rem',
    borderRadius: '12px',
    border: 'none',
    backgroundColor: '#ff6f61',
    color: 'white',
    cursor: 'pointer',
  },
};

export default NumberCountingGame;
