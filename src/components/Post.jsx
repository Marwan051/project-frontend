import { useState, useEffect, useRef } from "react";
import { RiFlowerLine, RiFlowerFill } from "react-icons/ri";
import { FiEdit } from "react-icons/fi";
import { RiDeleteBin4Line } from "react-icons/ri";
import noPhoto from "../assets/images/no-photo.jpg";
import nouserphoto from "../assets/images/default_profile.svg";
import { useNavigate } from "react-router";
import useAuth from "../components/AuthContext";
import AddPost from "./AddPost";
import { addLike, removeLike } from "../services/postActions";
import { getIsLiked } from "../services/getFeed";
const Post = ({
  userImage,
  username,
  postImage,
  postText,
  postId,
  likeCount: initialLikeCount,
  userid,
}) => {
  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(initialLikeCount);
  const [showEditDialog, setShowEditDialog] = useState(false);
  const { userId } = useAuth();
  const navigate = useNavigate();
  const dialogRef = useRef(null);
  const isOwner = userid === userId;

  useEffect(() => {
    const checkLikeStatus = async () => {
      try {
        const likeStatus = await getIsLiked(postId);
        setIsLiked(likeStatus);
      } catch (error) {
        console.error("Error checking like status:", error);
      }
    };
    checkLikeStatus();
  }, [postId]);

  const handleLike = async () => {
    try {
      if (isLiked) {
        await removeLike(postId);
        setLikeCount((prev) => prev - 1);
      } else {
        await addLike(postId);
        setLikeCount((prev) => prev + 1);
      }
      setIsLiked(!isLiked);
    } catch (error) {
      console.error("Error handling like:", error);
    }
  };

  const handleEditClick = () => {
    setShowEditDialog(true);
  };

  const handleDeleteClick = async () => {
    try {
      const confirmed = window.confirm(
        "Are you sure you want to delete this post?"
      );
      if (!confirmed) return;

      const success = await deletePost(postId);
      if (success) {
        window.location.reload();
      } else {
        throw new Error("Failed to delete post");
      }
    } catch (error) {
      console.error("Delete error:", error);
      alert("Failed to delete post. Please try again.");
    }
  };

  return (
    <div className="post-container">
      <div
        className="post-header"
        onClick={() => navigate(`/profile/${userid}/${username}`)}
      >
        <img
          src={userImage ?? nouserphoto}
          alt={username}
          className="user-avatar"
        />
        <span className="username">{username}</span>
        {isOwner && (
          <>
            <button className="edit-button" onClick={handleEditClick}>
              <FiEdit />
            </button>
            <button className="delete-button" onClick={handleDeleteClick}>
              <RiDeleteBin4Line />
            </button>
          </>
        )}
      </div>

      <div className="post-image-container">
        <img
          src={postImage ?? noPhoto}
          alt="Post content"
          className="post-image"
        />
      </div>

      {postText && <div className="post-text">{postText}</div>}

      <button
        className={`like-button ${isLiked ? "liked" : ""}`}
        onClick={handleLike}
      >
        <div className="like-content">
          {isLiked ? (
            <RiFlowerLine className="fill" />
          ) : (
            <RiFlowerFill className="nofill" />
          )}
          <span className="like-count">{likeCount}</span>
        </div>
      </button>

      {showEditDialog && (
        <AddPost
          ref={dialogRef}
          onClose={() => setShowEditDialog(false)}
          editMode={true}
          initialPost={{
            postId,
            text: postText,
            image: postImage,
          }}
        />
      )}
    </div>
  );
};

export default Post;
