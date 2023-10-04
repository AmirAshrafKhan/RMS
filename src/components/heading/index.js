import React from "react";
import "./title.scss";

const Heading = ({ title, description }) => {
  return (
    <div className="items">
      <h1 className="title">{title}</h1>
      <h5 className="desc">{description}</h5>
    </div>
  );
};

export default Heading;
