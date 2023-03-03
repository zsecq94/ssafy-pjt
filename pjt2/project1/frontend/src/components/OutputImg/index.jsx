import React from "react";

const OutputImg = ({ outputimage }) => {
  return (
    <div className="image-uploader-wrapper">
      <div className="img-wrapper">
        <img src={outputimage} alt="" />
      </div>
    </div>
  );
};

export default OutputImg;
