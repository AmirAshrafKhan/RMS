import React from "react";
import "./commonbutton.scss";

const CommonButton = ({ title, onClick, type,addReqValues }) => {
  
  return (
    <div className="common-btn">
      <button className="btn" onClick={onClick} type={type}>
        {title}
      </button>
    </div>
  );
};

export default CommonButton;
