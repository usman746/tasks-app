import { Navigate } from "react-router-dom";
import { useAuth } from "./hooks/AuthContext";

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useAuth(); // This should return true if the user is authenticated

  if (!isAuthenticated) {
    // Redirect to login if not authenticated
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;
