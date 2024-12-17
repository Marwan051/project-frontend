import React from "react";
import "../assets/styles/login.css";
import { useNavigate } from "react-router";

function Login() {
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

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate("/home");
  };

  return (
    <div className="background">
      <div className="card">
        <h1>Welcome to the Flower Garden of posts</h1>
        <div className="box">
          <h2>Login</h2>
          <form method="post" onSubmit={handleSubmit}>
            <input type="text" placeholder="username" required></input>

            <div class="relative">
              <input
                id="password"
                type="password"
                placeholder="password"
                required
              ></input>
              <button
                type="button"
                className="toggle-button"
                onClick={togglePassword}
              >
                <i id="toggle-icon" class="fa-regular fa-eye-slash"></i>
              </button>
            </div>

            <button className="submit" type="submit">
              Enter
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
