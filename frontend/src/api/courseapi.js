import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8000/api/course",
  withCredentials: true, // Allow credentials for cookies, sessions
});

// Attach JWT token to every request if available
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token'); // Or pull from AuthContext if needed
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const fetchAllCourses = () => api.get('/');
export const fetchCourseById = (id) => api.get(`/${id}`);
export const createCourse = (courseData) => api.post('/create', courseData);
export const enrollInCourse = (courseId) => api.post('/enroll', { courseId });
