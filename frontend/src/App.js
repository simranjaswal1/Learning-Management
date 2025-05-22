// App.js
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Login from "./Auth/Login";
import Register from "./Auth/Register";
import CustomNavbar from "./components/Navbar";
import Home from "./components/Home";

import ABCBook from "./components/book/ABCBook";
import HindiBook from "./components/book/HindiBook";
import MathBook from "./components/book/MathBook";

import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./ProtectedRoute";

import CourseDetails from "./components/courses/CourseDetails";
import StoryPage from "./pages/StoryPage";
import CoursesAndquiz from "./CoursesAndquiz";
import AttemptQuiz from "./pages/AttemptQuiz";
import QuizResults from "./pages/QuizResults";
import Riddle from "./Riddles/Riddle";
import Games from "./Games";
import Results from "./pages/Results";

function App() {
  return (
    <AuthProvider>
      <Router>
        <CustomNavbar />
        <Routes>
          {/* Public routes */}
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* Protected routes */}
          <Route
            path="/home"
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            }
          />
          <Route
            path="/abc"
            element={
              <ProtectedRoute>
                <ABCBook />
              </ProtectedRoute>
            }
          />
          <Route
            path="/hindi"
            element={
              <ProtectedRoute>
                <HindiBook />
              </ProtectedRoute>
            }
          />
          <Route
            path="/math"
            element={
              <ProtectedRoute>
                <MathBook />
              </ProtectedRoute>
            }
          />
          <Route
            path="/courses"
            element={
              <ProtectedRoute>
                <CoursesAndquiz />
              </ProtectedRoute>
            }
          />
          <Route
            path="/course/:courseId"
            element={
              <ProtectedRoute>
                <CourseDetails />
              </ProtectedRoute>
            }
          />
          <Route
            path="/story/stories"
            element={
              <ProtectedRoute>
                <StoryPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/quiz/attempt/:quizId"
            element={
              <ProtectedRoute>
                <AttemptQuiz />
              </ProtectedRoute>
            }
          />
          <Route
            path="/quiz/result"
            element={
              <ProtectedRoute>
                <QuizResults />
              </ProtectedRoute>
            }
          />
          <Route
            path="/riddle"
            element={
              <ProtectedRoute>
                <Riddle />
              </ProtectedRoute>
            }
          />
          <Route
            path="/games"
            element={
              <ProtectedRoute>
                <Games />
              </ProtectedRoute>
            }
          />
          <Route
            path="/result"
            element={
              <ProtectedRoute>
                <Results />
              </ProtectedRoute>
            }
          />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
