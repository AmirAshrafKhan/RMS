import React from "react";
import "./checkbox.scss";
import { iconSmile } from "assets/images";
const CheckboxTitle = ({ title, rest, icon, onChange=null, name=null,currentIndex=null}) => {
  return (
      <div className="checkbox custom">
        <label htmlFor={title}>
          <input type="checkbox" {...rest} id={title ? title : icon} multiple={false} onChange={onChange} name={name}/>
          {title ? title : icon && <img src={iconSmile} alt="icon" />}
        </label>
      </div>
  );
};

export default CheckboxTitle;
