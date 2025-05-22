import React, { useEffect, useState } from "react";
import axios from "axios";
import './quiz.css';
const QuizList = () => {
  const [token] = useState(() => localStorage.getItem("token"));
  const [quizzes, setQuizzes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!token) {
      setError("No auth token found. Please login.");
      setLoading(false);
      return;
    }

    const fetchQuizzes = async () => {
      try {
        const res = await axios.get("http://localhost:8000/api/quizresult/user-quizzes", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setQuizzes(res.data.quizzes || []);
        setError(null);
      } catch (err) {
        setError("Failed to load quizzes. " + (err.response?.data?.message || err.message));
      } finally {
        setLoading(false);
      }
    };

    fetchQuizzes();
  }, [token]);

  if (loading) return <p className="error-message">Loading quizzes...</p>;
  if (error) return <p className="error-message">{error}</p>;
  if (quizzes.length === 0) return <p>No quizzes found.</p>;

  return (
    <div className="quiz-containers">
      <h1>Your Quizzes</h1>
      {quizzes.map((quiz) => (
        <div key={quiz._id} className="quiz-card">
          <h3>{quiz.title}</h3>
          {quiz.userResult ? (
            <p>
              Your Score: {quiz.userResult.score} / {quiz.questions.length} (
              {quiz.userResult.percentage.toFixed(2)}%)
            </p>
          ) : (
            <p>You haven't attempted this quiz yet.</p>
          )}
        </div>
      ))}
    </div>
  );
};

export default QuizList;
