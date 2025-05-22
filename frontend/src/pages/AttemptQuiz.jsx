import React, { useEffect, useState } from 'react';
import { getQuizById } from '../api/quizapi';           // fetch quiz details
import { submitQuiz } from '../api/performanceapi';     // submit answers
import { useParams, useNavigate } from 'react-router-dom';
import './quiz.css';

const AttemptQuiz = () => {
  const { quizId } = useParams();
  const [quiz, setQuiz] = useState(null);
  const [answers, setAnswers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchQuiz = async () => {
      try {
        const res = await getQuizById(quizId);
        const quizData = res.data.quiz;
        setQuiz(quizData);
        setAnswers(Array(quizData?.questions?.length || 0).fill(null));
      } catch (err) {
        setError('Failed to load quiz.');
      } finally {
        setLoading(false);
      }
    };
    fetchQuiz();
  }, [quizId]);

  const handleSubmit = async () => {
    if (answers.includes(null)) {
      alert('Please answer all questions before submitting.');
      return;
    }
    setSubmitting(true);
    setError(null);
    try {
      // Submit answers to performance API
      const res = await submitQuiz({ quizId, answers });
      
      // You can adjust this depending on your backend response
      const resultFromBackend = res.data;
      
      if (
        resultFromBackend &&
        typeof resultFromBackend.score === 'number' &&
        typeof resultFromBackend.totalQuestions === 'number'
      ) {
        navigate('/quiz/result', { state: resultFromBackend });
      } else {
        // fallback local calculation (optional)
        const score = answers.reduce((acc, answer, idx) => {
          return answer === quiz.questions[idx].correctOption ? acc + 1 : acc;
        }, 0);
        const totalQuestions = quiz.questions.length;
        const percentage = (score / totalQuestions) * 100;

        navigate('/quiz/result', {
          state: { score, totalQuestions, percentage },
        });
      }
    } catch (err) {
      setError('Failed to submit quiz. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) return <p>Loading quiz...</p>;
  if (error) return <p style={{ color: 'red' }}>{error}</p>;
  if (!quiz || !quiz.questions) return <p>No quiz data available.</p>;

  return (
    <div className="attempt-quiz-container">
      <div className="quiz-header">
        <h2>{quiz.title}</h2>
        <button
          onClick={() => navigate('/courses')}
          className="back-button"
        >
          ← Back to Courses
        </button>
      </div>

      {quiz.questions.map((q, i) => (
        <div key={i} className="question-block">
          <p className="question-text">{q.questionText}</p>
          <div className="options">
            {q.options.map((opt, j) => (
              <label key={j}>
                <input
                  type="radio"
                  name={`q${i}`}
                  value={j}
                  checked={answers[i] === j}
                  onChange={() => {
                    const updated = [...answers];
                    updated[i] = j;
                    setAnswers(updated);
                  }}
                  disabled={submitting}
                  aria-checked={answers[i] === j}
                />
                {opt}
              </label>
            ))}
          </div>
        </div>
      ))}

      <button
        onClick={handleSubmit}
        disabled={submitting || loading}
        className="submit-button"
      >
        {submitting ? 'Submitting...' : 'Submit Quiz'}
      </button>

      {error && <p className="error-message">{error}</p>}
    </div>
  );
};

export default AttemptQuiz;
