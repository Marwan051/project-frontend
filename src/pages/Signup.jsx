import React, { useState } from "react";
import "../assets/styles/login.css";
import { useNavigate } from "react-router";

function Signup() {

  const [registerData,setRegisterData] = useState({
    username:"",
    email:"",
    password:"",
    bio:""
  })
  const [file,setFile] = useState(null)
  const [error,setError] = useState("")
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
    const { name, value  } = e.target;
    setRegisterData({
      ...registerData,
      [name]: value,
    });
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile && !selectedFile.type.startsWith("image/")) {
      alert("Please upload a valid image file.");
      setFile(null);
      e.target.value = "";
      return;
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!registerData.username || !registerData.email || !registerData.password) {
      setError("The first 3 fields are required.");
      return;
    }


    // Simulate form submission
    console.log("Register Data:", registerData);
    console.log("Image:", file);

    // Clear error and navigate to login
    setError("");
    navigate("/login");
  };

  return (
    <div className="background">
      <div className="card">
        <h1>Welcome to the Flower Garden of posts</h1>
        <div className="box">
          <h2>Sign up</h2>

          <form method="post" onSubmit={handleSubmit}>
            <input type="text" placeholder="username" name="username" value={registerData.username} onChange={handleInputChange} required></input>
            <input type="email" placeholder="email" name="email" value={registerData.email} onChange={handleInputChange} required></input>

            <div className="relative">
              <input
                id="password"
                type="password"
                name="password"
                value={registerData.password} 
                onChange={handleInputChange}
                placeholder="password"
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

            <label htmlFor="bio" className="block text-gray-700">Bio</label>
            <textarea 
              id="bio" 
              rows="3" 
              cols="40" 
              placeholder="Write your bio..." 
              className="w-full border border-gray-300 rounded-md px-4 py-2"
              name="bio"
              value={registerData.bio}
              onChange={handleInputChange}
            ></textarea>

            <div>
              <label htmlFor="submit-image" className="block text-gray-700 mb-2">Click to Submit</label>
              <input
                id="submit-image"
                type="file"
                src="https://via.placeholder.com/100" 
                alt="Submit"
                className="block"
                name="image"
                onChange={handleFileChange}
              />
            </div>

            <button className="submit" type="submit">
              Enter
            </button>
          </form>
          <p>Aleardy have an account? <a title="login" href="/login" style={{ color: "blue", textDecoration: "underline" }}>Login</a></p>
        </div>
      </div>
    </div>
  );
}

export default Signup;
