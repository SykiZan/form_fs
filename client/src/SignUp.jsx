import React, { useState } from "react";

import "./app.css";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [emailConfirm, setEmailConfirm] = useState("");
  const [password, setPassword] = useState("");

  const [emailError, setEmailError] = useState(false);
  const [emailConfirmError, setEmailConfirmError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);

  const navigate = useNavigate();

  const handleEmail = (e) => {
    setEmail(e.target.value);
  };
  const handleEmailConfirm = (e) => {
    setEmailConfirm(e.target.value);
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
    const res = await fetch("http://localhost:3000/api/auth/register", {
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
  };

  const handleSignUp = (e) => {
    e.preventDefault();

    const isEmailValid = validateEmail(email);
    const isPasswordError = validatePassword(password);
    const isEmaiConfirmlValid = email === emailConfirm;
    setEmailError(!isEmailValid);

    setEmailConfirmError(!isEmaiConfirmlValid);

    setPasswordError(!isPasswordError);

    if (isEmailValid && isPasswordError && isEmaiConfirmlValid) {
      try {
        postForm();
      } catch (e) {
        console.log(e);
      }
    }
  };

  return (
    <div className="page">
      <h1>Sign Up</h1>

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
            <div className="error">Invalid email or email already exists</div>
          )}
        </div>
        <div className="inputBlock">
          <label htmlFor="emailConfirm">Email Confirmation</label>
          <input
            type="text"
            id="emailConfirm"
            value={emailConfirm}
            onChange={handleEmailConfirm}
            onFocus={() => setEmailConfirmError(false)}
          />
          {emailConfirmError && <div className="error">Emails don't match</div>}
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
          {passwordError && (
            <div className="error">
              Password must be atleast 6 characters long
            </div>
          )}
        </div>
        <button onClick={handleSignUp}>Sign Up</button>
      </form>
    </div>
  );
};

export default SignUp;
