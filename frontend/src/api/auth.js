// src/api/auth.js
import axios from "./axios";

// Login Function
export const loginUser = async (email, password) => {
  try {
    const res = await axios.post("/user/login", { email, password });
    console.log("📥 Login Response:", res.data); // Log full response data
    return res.data; // { message, token, userId, role }
  } catch (error) {
    console.error("❌ Login Error:", error.response?.data || error.message);
    throw error.response?.data || { message: "Login failed" };
  }
};

// Register Function
export const registerUser = async (name, email, password, role) => {
  try {
    const res = await axios.post("/user/signup", {
      name,
      email,
      password,
      role
    });
    console.log("📥 Register Response:", res.data); // Log full response data
    return res.data; // { message, token, userId }
  } catch (error) {
    console.error("❌ Registration Error:", error.response?.data || error.message);
    throw error.response?.data || { message: "Registration failed" };
  }
};
