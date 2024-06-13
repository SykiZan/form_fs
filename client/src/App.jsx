import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import Welcome from "./Welcome";
import SignUp from "./SignUp";
import SignIn from "./SignIn";
import Home from "./Home";
import ProtectedRoute from "./ProtectedRoute";
import { useEffect } from "react";

const isAuthenticated = () => {
  return localStorage.getItem("test_user") !== null;
};

function App() {
  let isAuth = isAuthenticated();

  const location = useLocation();

  useEffect(() => {}, [location.pathname]);

  return (
    <>
      <Routes>
        <Route
          path="/"
          element={
            isAuth ? (
              <Navigate replace to="/home" />
            ) : (
              <Navigate replace to="/welcome" />
            )
          }
        />
        <Route
          path="/welcome"
          element={isAuth ? <Navigate replace to="/home" /> : <Welcome />}
        />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/sign-in" element={<SignIn />} />
        <Route
          path="/home"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />
        <Route
          path="/*"
          element={<Navigate replace to={isAuth ? "/home" : "/welcome"} />}
        />
      </Routes>
    </>
  );
}

export default App;
