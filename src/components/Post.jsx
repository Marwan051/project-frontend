import { useEffect, useState } from "react";
import { RiFlowerFill, RiFlowerLine } from "react-icons/ri";
import "../assets/styles/post.css";
import { addLike, deletePost, removeLike } from "../services/postActions";
import noPhoto from "../assets/images/no-photo.jpg";
import { getIsLiked } from "../services/getFeed";
import useAuth from "./AuthContext";
import nouserphoto from "../assets/images/default_profile.svg";
import { useNavigate } from "react-router";
import { useRef } from "react";
import { FiEdit } from "react-icons/fi";
import AddPost from "./AddPost";
import { RiDeleteBin4Line } from "react-icons/ri";
function Post({
  userImage,
  username,
  postImage,
  postText,
  postId,
  likeCount,
  userid,
}) {
  const [likeid, setLikeid] = useState("");
  const [ActualLikedCount, setActualLikedCount] = useState(likeCount);
  const { userId } = useAuth();
  const [showEditDialog, setShowEditDialog] = useState(false);
  const dialogRef = useRef(null);
  const isOwner = userid === userId;
  const navigate = useNavigate();
  console.log("postText", postText);
  const handleEditClick = () => {
    setShowEditDialog(true);
    dialogRef.current?.showModal();
  };

  const handleDeleteClick = async () => {
    try {
      const deleteResponse = await deletePost(postId);
      if (deleteResponse) {
        alert("Post deleted successfully");
      } else {
        alert("Error deleting post");
      }
    } catch {
      alert("Error deleting post");
    }
  };

  useEffect(() => {
    const getLikeStat = async () => {
      const response = await getIsLiked(postId, userId);
      console.log(response);
      setActualLikedCount(likeCount - 1);
      setLikeid(response);
    };
    getLikeStat();
  }, []);

  console.log(postImage);
  const { user } = { user: "test_user" };
  const handleLike = async () => {
    try {
      if (likeid.length !== 0) {
        const likedResponse = await removeLike(postId);
        setLikeid(likedResponse);
      } else {
        const likedResponse = await addLike(postId);
        setLikeid(likedResponse);
      }
    } catch (error) {
      console.error("Error liking post:", error);
      alert("Error liking post");
    }
  };

  return (
    <div className="post-container">
      <div
        className="post-header"
        onClick={() => {
          console.log(`/profile/${userid}/${username}`);
          navigate(`/profile/${userid}/${username}`);
        }}
      >
        <img
          src={userImage ?? nouserphoto}
          alt={username}
          className="user-avatar"
        />
        <span className="username">{username}</span>
        {isOwner && (
          <div>
            <button className="edit-button" onClick={handleEditClick}>
              <FiEdit />
            </button>
            <button className="delete-button" onClick={handleDeleteClick}>
              <RiDeleteBin4Line />
            </button>
          </div>
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
        className={`like-button ${likeid.length !== 0 ? "liked" : ""}`}
        onClick={handleLike}
      >
        <div className="like-content">
          {likeid.length === 0 ? (
            <RiFlowerFill className="nofill" />
          ) : (
            <RiFlowerLine className="fill" />
          )}
          <span className="like-count">
            {likeid.length !== 0 ? ActualLikedCount + 1 : ActualLikedCount}
          </span>
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
}

export default Post;
