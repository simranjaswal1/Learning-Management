import React, { useState, useEffect } from 'react';

const generateSequence = (start = 1, length = 7) => {
  return Array.from({ length }, (_, i) => start + i);
};

const getMissingIndices = (length, count = 2) => {
  const indices = new Set();
  while (indices.size < count) {
    const idx = Math.floor(Math.random() * length);
    indices.add(idx);
  }
  return Array.from(indices);
};

const NumberSequenceGame = () => {
  const [sequence, setSequence] = useState([]);
  const [missingIndices, setMissingIndices] = useState([]);
  const [inputs, setInputs] = useState({});
  const [isComplete, setIsComplete] = useState(false);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const seq = generateSequence(1, 7);
    const missing = getMissingIndices(seq.length, 2);
    setSequence(seq);
    setMissingIndices(missing);
    setInputs({});
    setIsComplete(false);
  }, []);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleChange = (e, idx) => {
    const val = e.target.value;
    if (!/^\d*$/.test(val)) return;
    setInputs(prev => ({ ...prev, [idx]: val }));
  };

  const checkCompletion = () => {
    for (const idx of missingIndices) {
      if (parseInt(inputs[idx], 10) !== sequence[idx]) {
        return false;
      }
    }
    return true;
  };

  const handleSubmit = () => {
    if (checkCompletion()) {
      setIsComplete(true);
    } else {
      alert('Some answers are incorrect, try again!');
    }
  };

  const handleReset = () => {
    const missing = getMissingIndices(sequence.length, 2);
    setMissingIndices(missing);
    setInputs({});
    setIsComplete(false);
  };

  // Responsive styles based on window width
  const isSmall = windowWidth < 360;
  const isMedium = windowWidth >= 360 && windowWidth < 768;

  const containerPadding = isSmall ? '1rem' : isMedium ? '1.5rem' : '2rem';
  const fontSizeHeading = isSmall ? '1.25rem' : isMedium ? '1.5rem' : '2rem';
  const numberBoxSize = isSmall ? 40 : isMedium ? 45 : 50;
  const numberFontSize = isSmall ? '1.2rem' : isMedium ? '1.5rem' : '1.8rem';
  const inputFontSize = isSmall ? '1.1rem' : isMedium ? '1.3rem' : '1.5rem';
  const inputPadding = isSmall ? '0.5rem 0.7rem' : isMedium ? '0.6rem 0.8rem' : '0.8rem 1rem';
  const gapSize = isSmall ? 6 : isMedium ? 8 : 10;
  const buttonFontSize = isSmall ? '1rem' : isMedium ? '1.05rem' : '1.1rem';
  const buttonPadding = isSmall ? '0.6rem 1.2rem' : isMedium ? '0.7rem 1.5rem' : '0.8rem 2rem';
  const buttonBorderRadius = isSmall ? 10 : 12;

  return (
    <div style={{ ...styles.container, padding: containerPadding }}>
      <h2 style={{ fontSize: fontSizeHeading }}>Fill in the missing numbers!</h2>
      <div style={{ ...styles.sequenceContainer, gap: gapSize }}>
        {sequence.map((num, idx) =>
          missingIndices.includes(idx) ? (
            <input
              key={idx}
              type="text"
              maxLength={2}
              value={inputs[idx] || ''}
              onChange={(e) => handleChange(e, idx)}
              disabled={isComplete}
              style={{
                ...styles.inputBox,
                width: numberBoxSize,
                fontSize: inputFontSize,
                padding: inputPadding,
              }}
              aria-label={`Input for number position ${idx + 1}`}
            />
          ) : (
            <span
              key={idx}
              style={{
                ...styles.numberBox,
                width: numberBoxSize,
                fontSize: numberFontSize,
                lineHeight: `${numberBoxSize}px`,
              }}
            >
              {num}
            </span>
          )
        )}
      </div>

      {!isComplete && (
        <button
          onClick={handleSubmit}
          style={{
            ...styles.button,
            fontSize: buttonFontSize,
            padding: buttonPadding,
            borderRadius: buttonBorderRadius,
          }}
        >
          Check Answers
        </button>
      )}

      {isComplete && (
        <>
          <p
            style={{
              color: 'green',
              fontSize: '1.25rem',
              marginTop: '1rem',
              userSelect: 'none',
            }}
          >
            🎉 Great job! You completed the sequence!
          </p>
          <button
            onClick={handleReset}
            style={{
              ...styles.button,
              fontSize: buttonFontSize,
              padding: buttonPadding,
              borderRadius: buttonBorderRadius,
            }}
          >
            Play Again
          </button>
        </>
      )}
    </div>
  );
};

const styles = {
  container: {
    fontFamily: "'Poppins', sans-serif",
    textAlign: 'center',
    maxWidth: 400,
    margin: 'auto',
  },
  sequenceContainer: {
    display: 'flex',
    justifyContent: 'center',
    margin: '1.5rem 0',
  },
  numberBox: {
    border: '2px solid #2196f3',
    borderRadius: '10px',
    textAlign: 'center',
    userSelect: 'none',
    display: 'inline-block',
  },
  inputBox: {
    borderRadius: '10px',
    border: '2px solid #2196f3',
    textAlign: 'center',
    outline: 'none',
  },
  button: {
    marginTop: '1rem',
    border: 'none',
    backgroundColor: '#2196f3',
    color: 'white',
    cursor: 'pointer',
    userSelect: 'none',
    transition: 'background-color 0.3s ease',
  },
};

export default NumberSequenceGame;
