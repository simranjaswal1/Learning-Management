import axios from "axios";

// Dynamically choose the base URL
const baseURL =
  window.location.hostname === "localhost"
    ? "http://localhost:8000/api/course"
    : "https://learning-management-pblg.onrender.com/api/course";

const api = axios.create({
  baseURL,
  withCredentials: true, // Allow credentials for cookies, sessions
});

// Attach JWT token to every request if available
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// API endpoints
export const fetchAllCourses = () => api.get("/");
export const fetchCourseById = (id) => api.get(`/${id}`);
export const createCourse = (courseData) => api.post("/create", courseData);
export const enrollInCourse = (courseId) => api.post("/enroll", { courseId });

export default api;
