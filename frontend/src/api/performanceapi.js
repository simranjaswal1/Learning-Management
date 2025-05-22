import axios from "axios";

// Dynamically select base URL
const BASE_URL =
  window.location.hostname === "localhost"
    ? "http://localhost:8000/api/performance"
    : "https://learning-management-pblg.onrender.com/api/performance";

const getToken = () => localStorage.getItem("token");

export const submitQuiz = async ({ quizId, answers }) => {
  const token = getToken();
  try {
    const res = await axios.post(
      `${BASE_URL}/submit`,
      { quizId, answers },
      {
        headers: { Authorization: `Bearer ${token}` },
        withCredentials: true,
      }
    );
    return res.data;
  } catch (err) {
    console.error("Error submitting quiz:", err.response?.data || err.message);
    throw err;
  }
};
