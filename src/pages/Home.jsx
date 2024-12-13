import React from "react";
import "../assets/styles/home.css";
import { FiHome } from "react-icons/fi";
import { GoPlusCircle } from "react-icons/go";
import { CiSearch } from "react-icons/ci";
function Home() {
  return (
    <div className="home">
      <div className="sidebar">
        <div className="top">
          <h1 className="title">Flower Garden</h1>
          <div className="icons">
            <FiHome />
            <GoPlusCircle />
            <CiSearch />
          </div>
        </div>
        <div className="bottom">
          <h2 className="notifications-title">Notifications</h2>
        </div>
      </div>
      <div className="infinite-scroll"></div>
    </div>
  );
}

export default Home;
