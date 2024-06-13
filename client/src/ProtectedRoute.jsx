import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const isAuthenticated = localStorage.getItem("test_user");

  if (!isAuthenticated) {
    return <Navigate to="/welcome" replace />;
  }

  return children;
};

export default ProtectedRoute;
