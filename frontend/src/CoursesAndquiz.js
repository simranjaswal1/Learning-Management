// src/pages/CoursesAndQuiz.jsx
import React from 'react';
import AllCourses from './components/courses/AllCourses';// Adjust path if needed
import StudentQuizzes from './pages/StudentQuizzes';

const CoursesAndquiz = () => {
  return (
    <div className="course-quiz-page">
      <AllCourses/>
      <StudentQuizzes/>
    </div>
  );
};

export default CoursesAndquiz;
