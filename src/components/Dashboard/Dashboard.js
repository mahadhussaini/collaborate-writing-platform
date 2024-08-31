import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import DocumentList from "../Document/DocumentList";
import "./Dashboard.css";

const Dashboard = () => {
  const { currentUser } = useContext(AuthContext);

  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <h2>Welcome, {currentUser?.email}</h2>
        <p>Your hub for managing and creating documents.</p>
        <Link to="/new-document" className="create-button">
          Create New Document
        </Link>
      </header>
      <main className="dashboard-content">
        <DocumentList />
      </main>
    </div>
  );
};

export default Dashboard;
