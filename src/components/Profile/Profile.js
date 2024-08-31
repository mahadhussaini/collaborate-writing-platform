import React, { useContext, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import { auth } from "../../firebaseConfig";
import "./Profile.css";

const Profile = () => {
  const { currentUser } = useContext(AuthContext);
  const [isEditing, setIsEditing] = useState(false);
  const [newEmail, setNewEmail] = useState(currentUser?.email || "");

  const handleLogout = async () => {
    try {
      await auth.signOut();
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  const handleEdit = () => {
    setIsEditing(!isEditing);
  };

  const handleSave = () => {
    setIsEditing(false);
  };

  return (
    <div className="profile-container">
      <h2>Profile</h2>
      <div className="profile-details">
        <label>Email:</label>
        {isEditing ? (
          <input
            type="email"
            value={newEmail}
            onChange={(e) => setNewEmail(e.target.value)}
          />
        ) : (
          <p>{currentUser?.email}</p>
        )}
      </div>

      <div className="profile-actions">
        {isEditing ? (
          <>
            <button onClick={handleSave}>Save</button>
            <button onClick={handleEdit}>Cancel</button>
          </>
        ) : (
          <button onClick={handleEdit}>Edit Profile</button>
        )}
        <button onClick={handleLogout}>Logout</button>
      </div>
    </div>
  );
};

export default Profile;
