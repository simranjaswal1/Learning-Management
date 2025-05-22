import React from 'react';
import { Link } from 'react-router-dom'; // Assuming you're using React Router for navigation
import './index.css'; // Ensure to import the index.css file

function GamePage() {
  return (
    <div className="flex flex-col h-screen">  {/* Ensures the container takes full screen */}
      
      {/* Navbar */}
      <nav className="bg-blue-600 p-4 shadow-md">
        <div className="container mx-auto flex justify-between items-center">
          <div className="text-white text-2xl font-semibold">
            <Link to="/" className="hover:text-gray-200">Home</Link>
          </div>
          <div className="space-x-6">
            <Link to="/story" className="text-white hover:text-gray-200">Stories</Link>
            <Link to="/game" className="text-white hover:text-gray-200">Games</Link>
          </div>
        </div>
      </nav>

      {/* Game Section */}
      <div className="flex-1"> {/* Ensures this section takes up the remaining screen space */}
        <iframe
          src="/games/index.html"
          title="Game"
          width="100%"
          height="100%"
          style={{ border: 'none' }}
        ></iframe>
      </div>
    </div>
  );
}

export default GamePage;
