import { useParams } from 'react-router-dom';
import { fetchCourseById } from '../../api/courseapi';
import { useEffect, useState } from 'react';
import './CourseDetails.css'; // Make sure this matches your actual CSS file path

const CourseDetails = () => {
  const { courseId } = useParams();
  const [course, setCourse] = useState(null);

  useEffect(() => {
    fetchCourseById(courseId)
      .then(res => setCourse(res.data.course))
      .catch(err => console.error('Error fetching course:', err));
  }, [courseId]);

  if (!course) return <p className="course-description">Loading course details...</p>;

  return (
    <div className="course-container">
      <h2 className="course-title">{course.title}</h2>
      <p className="course-description">{course.description}</p>
     
      {course.modules.length > 0 ? (
        course.modules.map((module, mIndex) => (
          <div key={mIndex} className="module-card">
            <h3 className="module-title">Module: {module.moduleTitle}</h3>
            <p className="module-description">{module.moduleDescription}</p>

            {module.lessons.length > 0 ? (
              module.lessons.map((lesson, lIndex) => (
                <div key={lIndex} className="lesson-card">
                  <h4 className="lesson-title">Lesson: {lesson.lessonTitle}</h4>
                  <p className="lesson-description">{lesson.lessonDescription}</p>
                  <a href={lesson.videoUrl} target="_blank" rel="noopener noreferrer" className="lesson-link">
                    Watch Video
                  </a>
                </div>
              ))
            ) : (
              <p>No lessons in this module.</p>
            )}
          </div>
        ))
      ) : (
        <p>No modules added yet.</p>
      )}
    </div>
  );
};

export default CourseDetails;
