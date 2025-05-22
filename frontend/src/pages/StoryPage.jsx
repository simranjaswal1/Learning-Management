import React, { useState, useEffect } from 'react';
import '../index.css'; // Ensure to import the index.css file
import './story.css';
const StoryPage = () => {
  const [stories, setStories] = useState([]);

  useEffect(() => {
    const youtubeStories = [
      { id: 1, title: "Lion and the Mouse", videoId: "tUjOL_Nk6uo" },
      { id: 2, title: "Thirsty Crow", videoId: "uwzViw-T0-A" },
      { id: 3, title: "आलसी कौआ", videoId: "bGLc4mA9yHs" },  // Replaced with new video
      { id: 4, title: "Rabbit and  the Tortoise", videoId: "MXRWXXj4alk" },
      { id: 5, title: "सच्चे दोस्त-झूठे दोस्त", videoId: "2_t38oktRig" },
      { id: 6, title: "मैजिकल मोर", videoId: "zFPdaARkuuk" },
      { id: 7, title: "बाज और साँप", videoId: "5qqfpEtgTJk" },  // Replaced with new video
      { id: 8, title: "तीन जादुई चक्की", videoId: "gA64G651sA8" },
      { id: 9, title: "बंदर और मगरमच्छ", videoId: "vJxUDcEcUWU" },
      { id: 10, title: "Power of habit", videoId: "hgUnttJs1Vk" },
      { id: 11, title: "Clever Fish", videoId: "QUTYxwTsbiM" },
      { id: 12, title: "The Golden Egg", videoId: "Gtc8CalmCD0" }
    ];


    setStories(youtubeStories);
  }, []);

  if (stories.length === 0) return <div className="text-center text-xl py-4">Loading...</div>;

  return (
    <div className="story-grid">
      {stories.map((story) => (
        <div key={story.id} className="story-item">
          <div className="video-container">
            <iframe
              src={`https://www.youtube.com/embed/${story.videoId}`}
              title={story.title}
              allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
          <div className="story-title">
            <h3>{story.title}</h3>
          </div>
        </div>
      ))}
    </div>
  );
};

export default StoryPage;
