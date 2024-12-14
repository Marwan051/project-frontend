import { forwardRef, useState, useRef } from "react";
import noPhotoImage from "../assets/images/no-photo.jpg"; // Adjust path as needed
import { GoPlus } from "react-icons/go"; // Using react-icons
import { FiEdit } from "react-icons/fi";

const AddPost = forwardRef(({ onClose }, ref) => {
  const [image, setImage] = useState(null);
  const [text, setText] = useState("");
  const fileInputRef = useRef(null);

  const handleClosing = (e) => {
    if (e.target === e.currentTarget) {
      setImage((prev) => null);
      setText((prev) => "");
      fileInputRef.current.value = "";
      ref.current.close();
      if (onClose) {
        onClose();
      }
    }
  };
  const handleSubmit = (e) => {
    if (!image) {
      alert("Please select an image");
      return;
    }

    // handle post submission
    console.log({ image, text });
    handleClosing(e);
    return;
  };

  const handleImageClick = () => {
    fileInputRef.current.click();
  };

  const handleImageChange = (e) => {
    if (e.target.files[0]) {
      setImage(URL.createObjectURL(e.target.files[0]));
    }
  };
  const handleTextChange = (e) => {
    setText(e.target.value);
  };

  return (
    <dialog ref={ref} className="custom-dialog" onClick={handleClosing}>
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
              onChange={handleImageChange}
              style={{ display: "none" }}
            />
          </div>
          <div className="post-text-section">
            <div className="post-input-container">
              <textarea
                value={text}
                onChange={handleTextChange}
                placeholder="Caption"
                className="post-input"
              />
            </div>
            <div className="dialog-submit-button-container">
              <button
                className="dialog-submit-button"
                onClick={(e) => handleSubmit(e)}
              >
                Post
              </button>
            </div>
          </div>
        </main>
      </div>
    </dialog>
  );
});

export default AddPost;
