import React, { useState } from "react";

import "./app.css";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");

  const [emailError, setEmailError] = useState(false);

  const [passwordError, setPasswordError] = useState(false);

  const navigate = useNavigate();

  const handleEmail = (e) => {
    setEmail(e.target.value);
  };

  const handlePassword = (e) => {
    setPassword(e.target.value);
  };

  const validateEmail = (email) => {
    const re =
      /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

    return re.test(email);
  };

  const validatePassword = (password) => {
    return password.length >= 6;
  };

  const postForm = async () => {
    const res = await fetch("http://localhost:3000/api/auth/login", {
      method: "POST",
      body: JSON.stringify({
        email,
        password,
      }),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });
    const data = await res.json();
    console.log(data);
    if (data.message === "You have successfully signed up") {
      localStorage.setItem("test_user", email);
      navigate("/home");
    }
    if (data.message === "no user found") {
      setEmailError(true);
    }
    if (data.message === "you are logged in") {
      localStorage.setItem("test_user", email);
      navigate("/home");
    }
  };

  const handleSignUp = (e) => {
    e.preventDefault();

    const isEmailValid = validateEmail(email);
    const isPasswordError = validatePassword(password);

    setEmailError(!isEmailValid);

    setPasswordError(!isPasswordError);

    if (isEmailValid && isPasswordError) {
      try {
        postForm();
      } catch (e) {
        console.log(e);
      }
    }
  };

  return (
    <div className="page">
      <h1>Login</h1>

      <form className="form">
        <div className="inputBlock">
          <label htmlFor="email">Email</label>
          <input
            type="text"
            id="email"
            value={email}
            onChange={handleEmail}
            onFocus={() => setEmailError(false)}
          />
          {emailError && (
            <div className="error">Invalid email or no user found</div>
          )}
        </div>

        <div className="inputBlock">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={handlePassword}
            onFocus={() => setPasswordError(false)}
          />
          {passwordError && <div className="error">Invalid password</div>}
        </div>
        <button onClick={handleSignUp}>Sign Up</button>
      </form>
    </div>
  );
};

export default SignUp;
