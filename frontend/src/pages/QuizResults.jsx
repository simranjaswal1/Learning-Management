import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './quiz.css';
const QuizResults = () => {
  const { state } = useLocation();
  const navigate = useNavigate();

  if (!state) {
    return <p>No quiz result data available.</p>;
  }

  const { score, totalQuestions, percentage } = state;

  return (
    <div className="quiz-results-container">
  <h2>Quiz Result</h2>
  <p><strong>Score:</strong> {score ?? 'N/A'}</p>
  <p><strong>Total Questions:</strong> {totalQuestions ?? 'N/A'}</p>
  <p>
    <strong>Percentage:</strong>{' '}
    {typeof percentage === 'number' ? percentage.toFixed(2) : 'N/A'}%
  </p>
  <button
    onClick={() => navigate('/courses')}
    className="quiz-results-button"
  >
    Back to Quizzes
  </button>
</div>

  );
};

export default QuizResults;
