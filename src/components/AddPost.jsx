import { forwardRef, useState, useRef } from "react";
import noPhotoImage from "../assets/images/no-photo.jpg";
import { GoPlus } from "react-icons/go";
import { FiEdit } from "react-icons/fi";
import { createPost, editPost } from "../services/postActions";
import { useEffect } from "react";
const AddPost = forwardRef(
  ({ onClose, editMode = false, initialPost = null }, ref) => {
    const [image, setImage] = useState(editMode ? initialPost.image : null);
    const [text, setText] = useState(editMode ? initialPost.text : "");

    const [showPopup, setShowPopup] = useState(false);
    const fileInputRef = useRef(null);
    const [isDialogReady, setIsDialogReady] = useState(false);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
      if (ref.current && editMode) {
        setIsDialogReady(true);
        ref.current.showModal();
      }
    }, [editMode]);
    const handleClosing = (e) => {
      setImage(null);
      setText("");
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
      if (ref.current) {
        ref.current.close();
      }
      setIsDialogReady(false);
      if (onClose) {
        onClose();
      }
    };

    const handleSubmit = async (e) => {
      e.preventDefault();
      setLoading(true);

      if (!image) {
        alert("Please select an image");
        return;
      }

      try {
        const response = editMode
          ? await editPost(initialPost.postId, text, image)
          : await createPost(text, image);

        if (!response) {
          alert(`Failed to ${editMode ? "edit" : "create"} post`);
          return;
        }

        setShowPopup(true);
        setTimeout(() => {
          setShowPopup(false);
          handleClosing();
          location.reload();
        }, 3000);
      } catch (error) {
        console.error("Error submitting post:", error);
        alert(`Error ${editMode ? "editing" : "creating"} post`);
      } finally {
        setLoading(false);
      }
    };
    const handleImageClick = () => {
      fileInputRef.current.click();
    };

    return (
      <dialog ref={ref} className="custom-dialog">
        {loading && (
          <div className="loading-overlay">
            <span className="loading-text">Posting...</span>
          </div>
        )}
        <div className="dialog-content">
          <header className="dialog-header">
            <h2>{editMode ? "Edit Post" : "Create Post"}</h2>

            <button className="dialog-close-button" onClick={handleClosing}>
              &times;
            </button>
          </header>
          <main className="dialog-main">
            <div className="image-container" onClick={handleImageClick}>
              <img
                src={image || noPhotoImage}
                alt="Preview"
                className="image-preview"
              />
              <div className="image-overlay">
                {!image ? (
                  <GoPlus className="overlay-icon" />
                ) : (
                  <FiEdit className="overlay-icon" />
                )}
              </div>
              <input
                type="file"
                ref={fileInputRef}
                accept="image/*"
                onChange={(e) =>
                  setImage(URL.createObjectURL(e.target.files[0]))
                }
                style={{ display: "none" }}
              />
            </div>
            <div className="post-text-section">
              <div className="post-input-container">
                <textarea
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  placeholder="Caption"
                  className="post-input"
                />
              </div>
              <div className="dialog-submit-button-container">
                <button
                  className="dialog-submit-button"
                  onClick={handleSubmit}
                  disabled={loading}
                >
                  {loading ? "Posting..." : "Post"}
                </button>
              </div>
            </div>
          </main>
        </div>
        {showPopup && (
          <div className="popup">
            Post {!editMode ? "created" : "edited"} successfully!
          </div>
        )}
      </dialog>
    );
  }
);

export default AddPost;
