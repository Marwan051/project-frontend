import React from "react";
import "../assets/styles/login.css";
import { useNavigate } from "react-router";
import { useState } from "react";
import useAuth from "../components/AuthContext";
import Loading from "../components/Loading";
function Login() {
  const { login } = useAuth();
  const [isLoading, setIsLoading] = useState(false);

  const [loginData, setLoginData] = useState({
    username: "",
    password: "",
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const togglePassword = () => {
    const password = document.getElementById("password");
    const toggleIcon = document.getElementById("toggle-icon");

    if (password.type === "password") {
      password.type = "text";
      toggleIcon.classList.remove("fa-eye-slash");
      toggleIcon.classList.add("fa-eye");
    } else {
      password.type = "password";
      toggleIcon.classList.remove("fa-eye");
      toggleIcon.classList.add("fa-eye-slash");
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setLoginData({
      ...loginData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    if (!loginData.username || !loginData.password) {
      setError("Username and password are required.");
      return;
    }
    const response = await login(loginData.username, loginData.password);
    if (response) {
      setError("");
      setIsLoading(false);
      navigate("/home");
    }
  };
  if (isLoading) {
    return <Loading />;
  }
  return (
    <div className="background">
      <div className="card">
        <h1>Welcome to the Flower Garden of posts</h1>
        <div className="box">
          <h2>Login</h2>
          <form method="post" onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="username"
              name="username"
              value={loginData.username}
              onChange={handleInputChange}
              required
            ></input>

            <div className="relative">
              <input
                id="password"
                type="password"
                placeholder="password"
                name="password"
                value={loginData.password}
                onChange={handleInputChange}
                required
              ></input>
              <button
                type="button"
                className="toggle-button"
                onClick={togglePassword}
              >
                <i id="toggle-icon" className="fa-regular fa-eye-slash"></i>
              </button>
            </div>

            <button className="submit" type="submit">
              Enter
            </button>
          </form>
          <p>
            Create an account?{" "}
            <a
              title="signup"
              onClick={() => navigate("/signup")}
              style={{ color: "blue", textDecoration: "underline" }}
            >
              Sign-up
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;
