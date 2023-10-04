import CommonButton from "components/common-button";
import Heading from "components/heading";
import React from "react";
import "./setting-heading.scss";

const SettingHeading = ({ btnTitle, okClick }) => {
  console.log("abc");
  return (
    <div className="mb-4 mb-md-5">
      <div className="setting-head">
        <Heading
          title="Settings"
          description="Manage the RMS from the setting"
        />
        <CommonButton title={btnTitle} onClick={okClick} />
      </div>
    </div>
  );
};

export default SettingHeading;
