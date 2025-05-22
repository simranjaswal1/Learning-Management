import axios from "axios";

const BASE_URL = "http://localhost:8000/api/performance";

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

