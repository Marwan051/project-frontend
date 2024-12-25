import { Navigate, Outlet } from "react-router";
import useAuth from "./AuthContext";

function BlockLogin() {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? <Navigate to="/home" /> : <Outlet />;
}

export default BlockLogin;
