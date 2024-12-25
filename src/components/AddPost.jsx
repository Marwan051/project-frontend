import { forwardRef, useState, useRef } from "react";
import noPhotoImage from "../assets/images/no-photo.jpg";
import { GoPlus } from "react-icons/go";
import { FiEdit } from "react-icons/fi";
import { createPost } from "../services/postActions";

const AddPost = forwardRef(({ onClose }, ref) => {
  const [image, setImage] = useState(null);
  const [text, setText] = useState("");
  const [showPopup, setShowPopup] = useState(false);
  const fileInputRef = useRef(null);

  const handleClosing = (e) => {
    setImage(null);
    setText("");
    fileInputRef.current.value = "";
    ref.current.close();
    if (onClose) {
      onClose();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!image) {
      alert("Please select an image");
      return;
    }

    const response = await createPost(text, image);
    if (!response) {
      alert("Failed to create post");
      return;
    }

    setShowPopup(true);
    setTimeout(() => {
      setShowPopup(false);
      handleClosing(e);
    }, 3000);
  };

  const handleImageClick = () => {
    fileInputRef.current.click();
  };

  return (
    <dialog ref={ref} className="custom-dialog">
      <div className="dialog-content">
        <header className="dialog-header">
          <h2>Create Post</h2>
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
              onChange={(e) => setImage(URL.createObjectURL(e.target.files[0]))}
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
              <button className="dialog-submit-button" onClick={handleSubmit}>
                Post
              </button>
            </div>
          </div>
        </main>
      </div>
      {showPopup && <div className="popup">Post created successfully!</div>}
    </dialog>
  );
});

export default AddPost;
