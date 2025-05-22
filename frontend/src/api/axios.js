import axios from "axios";

// Use Render backend if available, otherwise fallback to localhost
const baseURL =
  "https://learning-management-pblg.onrender.com/api" || "http://localhost:8000/api";

const instance = axios.create({
  baseURL,
  withCredentials: true, // optional: use only if handling cookies/auth
});

export default instance;
