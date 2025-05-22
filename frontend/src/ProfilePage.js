import React, { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "./context/AuthContext";

function ProfilePage() {
  const { user, token } = useAuth();
  const [profileData, setProfileData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!user) return;

    const fetchProfile = async () => {
      try {
        const res = await axios.get("http://localhost:8000/api/profile/me", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setProfileData(res.data);
      } catch (err) {
        setError(err.response?.data?.message || "Failed to load profile");
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [user, token]);

  if (!user) return <p>Please log in</p>;
  if (loading) return <p>Loading...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;
  if (!profileData) return <p>No profile data found.</p>;

  return (
    <div style={{ maxWidth: 600, margin: "auto", padding: "1rem" }}>
      <h1>{profileData.name}'s Profile</h1>
      <p><strong>Email:</strong> {profileData.email}</p>
      <p><strong>Role:</strong> {profileData.role}</p>
      <p><strong>Joined:</strong> {new Date(profileData.createdAt).toLocaleDateString()}</p>

      {/* Render quizzes if present */}
      {profileData.quizzes && profileData.quizzes.length > 0 && (
        <>
          <h2>Quizzes Created</h2>
          <ul>
            {profileData.quizzes.map((quiz) => (
              <li key={quiz._id}>
                <strong>{quiz.title}</strong> — {quiz.description || "No description"} —{" "}
                Created: {new Date(quiz.createdAt).toLocaleDateString()}
              </li>
            ))}
          </ul>
        </>
      )}

      {/* Render performances if present */}
      {profileData.performances && profileData.performances.length > 0 && (
        <>
          <h2>Quiz Performance</h2>
          <ul>
            {profileData.performances.map((perf) => (
              <li key={perf._id}>
                <strong>{perf.quizId?.title || "Untitled Quiz"}</strong> — Score: {perf.score} —{" "}
                Completed: {new Date(perf.completedAt).toLocaleDateString()}
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
}

export default ProfilePage;
