import { Navigate, Outlet } from "react-router";
import useAuth from "./AuthContext";

function ProtectedRoutes() {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? <Outlet /> : <Navigate to="/login" />;
}

export default ProtectedRoutes;
