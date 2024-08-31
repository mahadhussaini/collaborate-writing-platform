import React, { useState, useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { auth } from "../../firebaseConfig";
import "./Settings.css";

const Settings = () => {
  const { currentUser } = useContext(AuthContext);
  const [email, setEmail] = useState(currentUser?.email || "");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleEmailChange = async () => {
    setError("");
    setMessage("");
    try {
      if (auth.currentUser) {
        // @ts-ignore
        await auth.currentUser.updateEmail(email);
        setMessage("Email updated successfully.");
      }
    } catch (err) {
      setError("Error updating email: " + err.message);
    }
  };

  const handlePasswordChange = async () => {
    setError("");
    setMessage("");
    try {
      if (auth.currentUser) {
        // @ts-ignore
        await auth.currentUser.updatePassword(password);
        setMessage("Password updated successfully.");
      }
    } catch (err) {
      setError("Error updating password: " + err.message);
    }
  };

  return (
    <div className="settings-container">
      <h2>Settings</h2>
      {message && <p className="success-message">{message}</p>}
      {error && <p className="error-message">{error}</p>}

      <div className="settings-section">
        <h3>Update Email</h3>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <button onClick={handleEmailChange}>Update Email</button>
      </div>

      <div className="settings-section">
        <h3>Change Password</h3>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button onClick={handlePasswordChange}>Change Password</button>
      </div>
    </div>
  );
};

export default Settings;
