import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const { user } = useSelector((state) => state.user);
  const isAuthenticated = user !== null;
  return isAuthenticated ? children : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
