import { createContext, useContext, useState, ReactNode } from "react";
import { useEffect } from "react";
import { Login, Signup } from "../services/Authorization";
const AuthContext = createContext(undefined);

const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return localStorage.getItem("token") !== null;
  });
  const [token, setToken] = useState(() => {
    return localStorage.getItem("token");
  });
  const [user, setUser] = useState(() => {
    return localStorage.getItem("user");
  });
  const [userId, setUserId] = useState(() => {
    return localStorage.getItem("userId");
  });
  useEffect(() => {
    if (token) {
      localStorage.setItem("token", token);
      setIsAuthenticated(true);
    } else {
      localStorage.removeItem("token");
      localStorage.removeItem("userId");
      localStorage.removeItem("user");
      setIsAuthenticated(false);
      setUserId(null);
    }
  }, [token]);
  const login = async (username, password) => {
    const response = await Login(username, password);
    if (response.error) {
      alert(response.error);
      return false;
    }

    localStorage.setItem("token", response.token);
    localStorage.setItem("user", username);
    localStorage.setItem("userId", response.user.userid);

    setToken(response.token);
    setUser(username);
    setUserId(response.user.userid);
    setIsAuthenticated(true);

    return true;
  };

  const logout = () => {
    setUser(null);
    setUserId(null);
    localStorage.removeItem("userId");
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    setToken(null);
    setIsAuthenticated(false);
  };

  const signup = async (username, password, bio, avatar) => {
    const response = await Signup(username, password, bio, avatar);
    console.log(response);
    if (response.user.username !== username) {
      alert("Error signing up");
      return false;
    }
    localStorage.setItem("token", response.token);
    localStorage.setItem("user", username);
    localStorage.setItem("userId", response.user.userid);

    setToken(response.token);
    setUser(username);
    setUserId(response.user.userid);
    setIsAuthenticated(true);
    return true;
  };

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, login, logout, signup, token, user, userId }}
    >
      {children}
    </AuthContext.Provider>
  );
};

const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export { AuthProvider };
export default useAuth;
