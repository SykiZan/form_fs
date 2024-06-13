import React from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  const email = localStorage.getItem("test_user");

  const handleLogOut = () => {
    localStorage.removeItem("test_user");
    navigate("/");
  };

  return (
    <div className="page">
      <h1>Home</h1>

      <main className="homeContent">
        <h2>Logged in as</h2>
        <div className="userEmail">{email}</div>
        <button onClick={handleLogOut}>Log Out</button>
      </main>
    </div>
  );
};

export default Home;
