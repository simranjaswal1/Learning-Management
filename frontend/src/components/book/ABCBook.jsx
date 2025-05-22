import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // ✅ Import navigation
import abcData from './abcData';

function ABCBook() {
  const [currentPage, setCurrentPage] = useState(0);
  const navigate = useNavigate(); // ✅ Initialize navigation
  const current = abcData[currentPage];

  const handleNext = () => {
    if (currentPage < abcData.length - 1) {
      setCurrentPage(prev => prev + 1);
    }
  };

  const handlePrev = () => {
    if (currentPage > 0) {
      setCurrentPage(prev => prev - 1);
    }
  };

  return (
    <div style={{
      padding: '2rem',
      backgroundColor: '#E8DCD2',
      minHeight: '100vh',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      flexDirection: 'column'
    }}>

     

      <div style={{
        backgroundColor: '#fff',
        padding: '3rem',
        borderRadius: '1.5rem',
        boxShadow: '0 6px 20px rgba(0,0,0,0.15)',
        textAlign: 'center',
        width: '1400px',
        maxWidth: '80%',
        transition: 'all 0.3s ease-in-out'
      }}>
         <button
        onClick={() => navigate('/home')}
 style={{ fontSize: '1rem', padding: '0.75rem 1.5rem' }}
      >
        ⬅ Back to Home
      </button>
        <h2 style={{ fontSize: '5rem', marginBottom: '2rem' }}>{current.letter}</h2>
        <img
          src={current.image}
          alt={current.word}
          style={{
            width: '100%',
            height: '350px',
            objectFit: 'contain',
            marginBottom: '2rem'
          }}
        />
        <p style={{ fontSize: '2rem', fontWeight: 'bold' }}>{current.word}</p>
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          marginTop: '2rem'
        }}>
          <button
            onClick={handlePrev}
            disabled={currentPage === 0}
            style={{ fontSize: '1rem', padding: '0.75rem 1.5rem' }}
          >
            Previous
          </button>
          <button
            onClick={handleNext}
            disabled={currentPage === abcData.length - 1}
            style={{ fontSize: '1rem', padding: '0.75rem 1.5rem' }}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}

export default ABCBook;
