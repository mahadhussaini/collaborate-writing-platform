import React, { useEffect, useState } from "react";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { firestore } from "../../firebaseConfig";
import { useNavigate, useParams } from "react-router-dom";
import "./DocumentEditor.css";

const DocumentEditor = () => {
  const { id } = useParams();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDocument = async () => {
      try {
        // @ts-ignore
        const docRef = doc(firestore, "documents", id);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          const docData = docSnap.data();
          setTitle(docData.title);
          setContent(docData.content);
        } else {
          console.log("No such document!");
        }
      } catch (error) {
        console.error("Error fetching document:", error);
      }
    };

    fetchDocument();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // @ts-ignore
      const docRef = doc(firestore, "documents", id);
      await updateDoc(docRef, { title, content });
      navigate("/dashboard");
    } catch (error) {
      console.error("Error updating document:", error);
    }
  };

  return (
    <div className="document-editor">
      <h2>Edit Document</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Title:
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </label>
        <label>
          Content:
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
          ></textarea>
        </label>
        <button type="submit">Update Document</button>
      </form>
    </div>
  );
};

export default DocumentEditor;
