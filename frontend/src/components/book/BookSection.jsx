import React from 'react';
import { useNavigate } from 'react-router-dom';
import Myabc from '../../assets/ABC/Myabc.png';
import Myhindi from '../../assets/hindi/title.png';
import Mymath from '../../assets/math/title.png'; // Ensure this image exists

function BookSection() {
  const navigate = useNavigate();

  const handleGoToABC = () => {
    navigate('/abc');
  };

  const handleGoToHindi = () => {
    navigate('/hindi');
  };

  const handleGoToMath = () => {
    navigate('/math');
  };

  return (
    <div style={{ padding: '1.5rem'}}>
      <div style={{ textAlign: 'center', marginBottom: '1rem' }}>
        <h2 style={{ fontSize: '1.8rem' }}>Your Favorite Books</h2>
      </div>

      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          gap: '1.5rem',
          flexWrap: 'wrap',
        }}
      >
        <div
          style={cardStyle}
          onClick={handleGoToABC}
          onMouseEnter={(e) => (e.currentTarget.querySelector('img').style.transform = 'scale(1.05)')}
          onMouseLeave={(e) => (e.currentTarget.querySelector('img').style.transform = 'scale(1)')}
        >
          <img src={Myabc} alt="ABC Book" style={imageStyle} />
          <h3 style={titleStyle}>ABC Book</h3>
        </div>

        <div
          style={cardStyle}
          onClick={handleGoToHindi}
          onMouseEnter={(e) => (e.currentTarget.querySelector('img').style.transform = 'scale(1.05)')}
          onMouseLeave={(e) => (e.currentTarget.querySelector('img').style.transform = 'scale(1)')}
        >
          <img src={Myhindi} alt="Hindi Book" style={imageStyle} />
          <h3 style={titleStyle}>Hindi Varnmala</h3>
        </div>

        <div
          style={cardStyle}
          onClick={handleGoToMath}
          onMouseEnter={(e) => (e.currentTarget.querySelector('img').style.transform = 'scale(1.05)')}
          onMouseLeave={(e) => (e.currentTarget.querySelector('img').style.transform = 'scale(1)')}
        >
          <img src={Mymath} alt="Math Book" style={imageStyle} />
          <h3 style={titleStyle}>Math Numbers</h3>
        </div>
      </div>
    </div>
  );
}

const cardStyle = {
  backgroundColor: ' #5ebec4',
  borderRadius: '1rem',
  padding: '1rem',
  width: '250px',
  boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
  textAlign: 'center',
  cursor: 'pointer',
  transition: 'transform 0.3s ease',
};

const imageStyle = {
  width: '100%',
  height: '220px',
  objectFit: 'cover',
  borderRadius: '0.5rem',
  marginBottom: '0.5rem',
  transition: 'transform 0.3s ease',
};

const titleStyle = {
  fontSize: '1rem',
  color: '#333',
};

export default BookSection;
