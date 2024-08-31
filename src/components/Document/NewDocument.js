import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { collection, addDoc } from "firebase/firestore";
import { firestore } from "../../firebaseConfig";
import "./NewDocument.css";

const NewDocument = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!title.trim() || !content.trim()) {
      setError("Both title and content are required.");
      return;
    }

    try {
      const docRef = await addDoc(collection(firestore, "documents"), {
        title,
        content,
        createdAt: new Date(),
      });
      console.log("Document created with ID: ", docRef.id);
      setSuccess("Document created successfully!");
      setTitle("");
      setContent("");
      navigate(`/editor/${docRef.id}`);
    } catch (err) {
      console.error("Error creating document:", err);
      setError("Error creating document: " + err.message);
    }
  };

  return (
    <div className="new-document">
      <h2>Create a New Document</h2>
      {error && <p className="error-message">{error}</p>}
      {success && <p className="success-message">{success}</p>}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Document Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <textarea
          placeholder="Document Content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
        />
        <button type="submit">Create Document</button>
      </form>
    </div>
  );
};

export default NewDocument;
