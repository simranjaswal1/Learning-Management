import React, { useEffect, useState } from 'react';
import { getAllQuizzes } from '../api/quizapi';
import { useNavigate } from 'react-router-dom';
import './quiz.css';

const StudentQuizzes = () => {
  const [quizzes, setQuizzes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchQuizzes() {
      try {
        const res = await getAllQuizzes();
        const quizzesData = Array.isArray(res.data.quizzes) ? res.data.quizzes : [];
        setQuizzes(quizzesData);
      } catch (err) {
        console.error('Error fetching quizzes:', err);
        setError('Failed to load quizzes. Please try again later.');
      } finally {
        setLoading(false);
      }
    }
    fetchQuizzes();
  }, []);

  if (loading) return <p>Loading quizzes...</p>;
  if (error) return <p className="error-message">{error}</p>;

  return (
    <div>
      <h2>Your Assigned Quizzes</h2>
      {quizzes.length === 0 ? (
        <p>No quizzes assigned yet.</p>
      ) : (
        quizzes.map(({ _id, title, description, userResult }) => (
          <div key={_id} className="quiz-card">
            <h3>{title || 'Untitled Quiz'}</h3>
            <p>{description || 'No description'}</p>
           
            <button onClick={() => navigate(`/quiz/attempt/${_id}`)}>
              Attempt Quiz
            </button>
          </div>
        ))
      )}
    </div>
  );
};

export default StudentQuizzes;
