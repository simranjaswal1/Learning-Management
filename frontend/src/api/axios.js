// src/api/axios.js
import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:8000/api", // 👈 backend base URL
  withCredentials: true, // if you plan to handle cookies/sessions
});

export default instance;
