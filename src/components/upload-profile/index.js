import React, { useRef, useState } from "react";
import "./uploadprofile.scss";
import { iconFeatured, iconUpload } from "assets/images";
// import { Link } from "react-router-dom";

const UploadProfile = ({ icon, title, description, text, onChange }) => {
  const fileInputRef = useRef(null);
  const [fileName, setFileName] = useState("");

  const handleUploadClick = (e) => {
    e.preventDefault();
    fileInputRef.current && fileInputRef.current.click();
  };
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setFileName(file.name);
    onChange(event);
  };
  return (
    <div className="upload-box">
      <div className="upload-image">
        <img src={icon} alt="" />
      </div>
      <div className="upload">
        <form action="/action_page.php">
          <input
            ref={fileInputRef}
            type="file"
            id="myFile"
            name="filename"
            style={{ display: "none" }}
            onChange={handleFileChange}
          />
        </form>
        <div className="upload-icon">
          <img src={iconFeatured} alt="" />
        </div>
      </div>
      <div className="text">
        <h5>{title}</h5>
        <h6>{description}</h6>
      </div>

      <div className="upload-btn">
        {/* <Link to="/" className="btn">
          <img src={iconUpload} alt="" /> {text}
        </Link> */}
        <button className="btn" onClick={handleUploadClick}>
          <img src={iconUpload} alt="" /> {text}
        </button>
      </div>
      {fileName && <p>Selected file: {fileName}</p>}
    </div>
  );
};

export default UploadProfile;
