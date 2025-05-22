import React, { useEffect, useState } from 'react';
import { fetchAllCourses } from '../../api/courseapi';
import { useNavigate } from 'react-router-dom';
//import './AllCourses.css';
import './Courses.css';
const AllCourses = () => {
  const [courses, setCourses] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const userId = localStorage.getItem('userId'); // Get the userId from localStorage

    fetchAllCourses()
      .then((res) => {
        console.log('Fetched Courses:', res.data.courses); // Log to check API response structure
        const updatedCourses = res.data.courses.map((course) => {
          const enrolled = course.assignedTo.includes(userId); // Check if the user is enrolled
          console.log(`Course: ${course.title}, Enrolled: ${enrolled}`); // Debug enrollment status
          return { ...course, enrolled }; // Store enrollment status in state
        });
        setCourses(updatedCourses);
      })
      .catch((err) => {
        console.error('Error fetching courses:', err);
      });
  }, []);

  const handleOpenCourse = (courseId) => {
    navigate(`/course/${courseId}`); // Navigate to course details page
  };

  return (
    <div className="courses-container">
      <h2>All Courses</h2>
      <div className="courses-list">
        {courses.map((course) => (
          <div className="course-card" key={course._id}>
            <h3>{course.title}</h3>
            <p>{course.description}</p>
           
            {course.enrolled ? (
              <button className="enrolled-btn" onClick={() => handleOpenCourse(course._id)}>
                Enrolled - Open Course
              </button>
            ) : (
              <button className="enroll-btn" onClick={() => handleOpenCourse(course._id)}>
                Open
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllCourses;
