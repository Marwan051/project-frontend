import { createContext, useContext, useState, ReactNode } from "react";

const AuthContext = createContext(undefined);

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const login = () => {
    // To be implemented Login logic
    setIsAuthenticated(true);
  };
  const logout = () => {
    // To be implemented Logout logic
    setIsAuthenticated(false);
  };

  const signup = () => {
    // To be implemented Signup logic
    setIsAuthenticated(true);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout, signup }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
