import React, { useState } from "react";
import { RiFlowerFill, RiFlowerLine } from "react-icons/ri";
import "../assets/styles/post.css";

function Post({ userImage, username, postImage, postText }) {
  const [liked, setLiked] = useState(false);

  const handleLike = () => {
    setLiked(!liked);
  };

  return (
    <div className="post-container">
      <div className="post-header">
        <img src={userImage} alt={username} className="user-avatar" />
        <span className="username">{username}</span>
      </div>

      <div className="post-image-container">
        <img src={postImage} alt="Post content" className="post-image" />
      </div>

      {postText && <div className="post-text">{postText}</div>}

      <button
        className={`like-button ${liked ? "liked" : ""}`}
        onClick={handleLike}
      >
        {liked ? (
          <RiFlowerFill className="nofill" />
        ) : (
          <RiFlowerLine className="fill" />
        )}
      </button>
    </div>
  );
}

export default Post;
