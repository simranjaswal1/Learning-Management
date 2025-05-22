import React, { useState } from 'react'
import './Pattern.css'

const patternData = [
  {
    pattern: ['🟠', '🔵', '🟠', '🔵'],
    options: ['🟠', '🟢', '🔵'],
    correct: '🟠',
  },
  {
    pattern: ['🟥', '🟩', '🟥', '🟩'],
    options: ['🟦', '🟥', '🟨'],
    correct: '🟥',
  },
  {
    pattern: ['🍎', '🍌', '🍎', '🍌'],
    options: ['🍌', '🍇', '🍎'],
    correct: '🍎',
  },
]

const PatternGame = () => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [selected, setSelected] = useState(null)
  const [feedback, setFeedback] = useState('')

  const current = patternData[currentIndex]

  const handleSelect = (option) => {
    setSelected(option)
    if (option === current.correct) {
      setFeedback('✅ Correct!')
    } else {
      setFeedback('❌ Try Again!')
    }
  }

  const handleNext = () => {
    setSelected(null)
    setFeedback('')
    setCurrentIndex((prev) => (prev + 1) % patternData.length)
  }

  return (
    <div className="outer-container">
      <div className="inner-container">
        <h2 className="title">🔁 Complete the Pattern</h2>

        <div className="pattern">
          {current.pattern.map((item, idx) => (
            <span key={idx}>{item} </span>
          ))}
          <span style={{ color: '#9ca3af' /* gray-400 */ }}>?</span>
        </div>

        <div className="options">
          {current.options.map((option, idx) => (
            <button
              key={idx}
              onClick={() => handleSelect(option)}
              disabled={!!feedback && selected !== option}
              className={`option-button ${
                selected === option
                  ? option === current.correct
                    ? 'selected correct'
                    : 'selected incorrect'
                  : ''
              }`}
            >
              {option}
            </button>
          ))}
        </div>

        <div className="feedback">{feedback}</div>

        {feedback && (
          <button onClick={handleNext} className="next-button">
            Next Pattern →
          </button>
        )}
      </div>
    </div>
  )
}

export default PatternGame
