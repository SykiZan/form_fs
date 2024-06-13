import React from "react";

import "./app.css";
import { useNavigate } from "react-router-dom";

const Welcome = () => {
  const navigate = useNavigate();

  return (
    <div className="page">
      <h1>Welcome</h1>

      <main className="welcomeContent">
        <button
          onClick={() => {
            navigate("/sign-in");
          }}
        >
          Sign In
        </button>
        <button
          onClick={() => {
            navigate("/sign-up");
          }}
        >
          Sign up
        </button>
      </main>
    </div>
  );
};

export default Welcome;
