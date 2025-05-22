import axios from 'axios';

const BASE_URL = 'http://localhost:8000/api/quiz';

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
// quizapi.js
export const getAllQuizzes = () =>
  axios.get(`${BASE_URL}/`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
    withCredentials: true,
  });


// Get quiz by ID
export const getQuizById = (quizId) =>
  axios.get(`${BASE_URL}/${quizId}`, getAuthHeaders());

// Delete a quiz by ID
export const deleteQuiz = (quizId) =>
  axios.delete(`${BASE_URL}/${quizId}`, getAuthHeaders());

// Get all quizzes with user scores
export const getAllQuizzesWithUserScores = () =>
  axios.get('http://localhost:8000/api/quizresult/user-quizzes', {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
    withCredentials: true,
  });
