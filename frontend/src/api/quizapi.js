import axios from 'axios';

// Dynamically choose base URL based on environment
const BASE_URL =
  window.location.hostname === 'localhost'
    ? 'http://localhost:8000/api/quiz'
    : 'https://learning-management-pblg.onrender.com/api/quiz';

const QUIZ_RESULT_URL =
  window.location.hostname === 'localhost'
    ? 'http://localhost:8000/api/quizresult/user-quizzes'
    : 'https://learning-management-pblg.onrender.com/api/quizresult/user-quizzes';

const getToken = () => localStorage.getItem('token');

const getAuthHeaders = () => ({
  headers: {
    Authorization: `Bearer ${getToken()}`,
  },
  withCredentials: true,
});

// Create a new quiz
export const createQuiz = (data) =>
  axios.post(`${BASE_URL}/`, data, getAuthHeaders());

// Get all quizzes
export const getAllQuizzes = () =>
  axios.get(`${BASE_URL}/`, getAuthHeaders());

// Get quiz by ID
export const getQuizById = (quizId) =>
  axios.get(`${BASE_URL}/${quizId}`, getAuthHeaders());

// Delete a quiz by ID
export const deleteQuiz = (quizId) =>
  axios.delete(`${BASE_URL}/${quizId}`, getAuthHeaders());

// Get all quizzes with user scores
export const getAllQuizzesWithUserScores = () =>
  axios.get(QUIZ_RESULT_URL, getAuthHeaders());
