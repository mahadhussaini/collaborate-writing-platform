import React, { useEffect, useState } from "react";
import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";
import { firestore } from "../../firebaseConfig";
import { Link, useNavigate } from "react-router-dom";
import "./DocumentList.css";

const DocumentList = () => {
  const [documents, setDocuments] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDocuments = async () => {
      try {
        const docCollection = collection(firestore, "documents");
        const docSnap = await getDocs(docCollection);
        setDocuments(
          // @ts-ignore
          docSnap.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
        );
      } catch (error) {
        console.error("Error fetching documents:", error);
      }
    };

    fetchDocuments();
  }, []);

  const handleDelete = async (id) => {
    try {
      await deleteDoc(doc(firestore, "documents", id));
      // @ts-ignore
      setDocuments(documents.filter((document) => document.id !== id));
    } catch (error) {
      console.error("Error deleting document:", error);
    }
  };

  const handleUpdate = (id) => {
    navigate(`/editor/${id}`);
  };

  return (
    <div className="document-list">
      <h3>Your Documents</h3>
      {documents.length > 0 ? (
        documents.map((doc) => (
          <div
            key={
              // @ts-ignore
              doc.id
            }
            className="document-item"
          >
            <Link
              to={`/editor/${
                // @ts-ignore
                doc.id
              }`}
              className="document-link"
            >
              {
                // @ts-ignore
                doc.title
              }
            </Link>
            <button
              onClick={() =>
                handleUpdate(
                  // @ts-ignore
                  doc.id
                )
              }
              className="update-button"
            >
              Update
            </button>
            <button
              onClick={() =>
                handleDelete(
                  // @ts-ignore
                  doc.id
                )
              }
              className="delete-button"
            >
              Delete
            </button>
          </div>
        ))
      ) : (
        <p>No documents found.</p>
      )}
    </div>
  );
};

export default DocumentList;
