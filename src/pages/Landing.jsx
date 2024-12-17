import React from "react";
import { Link } from "react-router";
import "../assets/styles/landing.css";

function Landing() {
  return (
    <div className="background">
      <div className="card1">
        <h1>Welcome to the Flower Garden of posts</h1>
        <div className="buttons">
          <Link to="/login">
            <button type="submit">Login</button>
          </Link>

          <Link to="/signup">
            <button type="submit">Sign up</button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Landing;
