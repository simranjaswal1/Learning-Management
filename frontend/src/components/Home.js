import React from 'react';
import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom'; // 👈 import useNavigate
import image from '../assets/image.png';
import BookSection from './book/BookSection';
import '../index.css';

function Home() {
  const navigate = useNavigate(); // 👈 create navigate function

  const handleExploreClick = () => {
    navigate('/courses'); // 👈 navigate to the courses page
  };

  return (
    <div style={{ width: '100%', minHeight: '100vh' }}>
      {/* Hero Section */}
      <div className="hero-section">
        <div className="hero-inner-wrapper">
          {/* Text Section */}
          <div className="hero-text-section">
            <h1>Welcome to our Kids Learning Platform</h1>
            <p>Let's explore our fun and interactive courses!</p>
            <Button
              variant="primary"
              className="hero-btn"
              onClick={handleExploreClick} // 👈 handle click
            >
              Explore Courses
            </Button>
          </div>

          {/* Image Section */}
          <div className="hero-image-section">
            <img
              src={image}
              alt="Kids learning"
              className="hero-image"
            />
          </div>
        </div>
      </div>

      {/* 📚 Book Card Section below Hero */}
      <div className="book-card-section">
        <div className="book-card-wrapper">
          <BookSection />
        </div>
      </div>
    </div>
  );
}

export default Home;
