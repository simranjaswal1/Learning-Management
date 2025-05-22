import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './quiz.css';

const QuizResults = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // Expecting state passed via navigation: { score, totalQuestions, percentage, answers, quizTitle, submittedAt }
  const result = location.state;

  if (!result) {
    return (
      <div>
        <p>No quiz results available.</p>
        <button onClick={() => navigate('/quiz')}>Back to Quizzes</button>
      </div>
    );
  }

  const { score, totalQuestions, percentage, submittedAt, quizTitle } = result;

  return (
    <div className="quiz-results-container">
      <h2>Quiz Results: {quizTitle || 'Quiz'}</h2>
      <p>
        Score: {score} / {totalQuestions}
      </p>
      <p>Percentage: {percentage.toFixed(2)}%</p>
      {submittedAt && <p>Submitted on: {new Date(submittedAt).toLocaleString()}</p>}
      <button onClick={() => navigate('/quiz')}>Back to Quizzes</button>
    </div>
  );
};

export default QuizResults;
