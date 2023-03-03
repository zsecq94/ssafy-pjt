import React from "react";
import Button from "@mui/material/Button";
import "./myprofileimg.scss";
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import CheckBoxIcon from "@mui/icons-material/CheckBox";

const MyProfileImageUploader = ({
  preview_URL,
  setImage,
  img,
  user_id,
  login_id,
  changeimg,
  userImgSubmit,
}) => {
  let inputRef;

  const saveImage = (e) => {
    e.preventDefault();
    const fileReader = new FileReader();
    if (e.target.files[0]) {
      fileReader.readAsDataURL(e.target.files[0]);
    }
    fileReader.onload = () => {
      setImage({
        image_file: e.target.files[0],
        preview_URL: fileReader.result,
      });
    };
  };

  return (
    <div className="my-imguploader-main">
      <img
        className="profile-img"
        src={preview_URL ? preview_URL : img}
        alt="#"
      />
      <input
        type="file"
        accept="image/*"
        onChange={saveImage}
        ref={(refParam) => (inputRef = refParam)}
        style={{ display: "none" }}
      />
      <br />
      <hr />
      {Number(user_id) === Number(login_id) ? (
        <Button
          variant="outlined"
          color="primary"
          onClick={() => inputRef.click()}
          style={{ border: "none" }}
        >
          <CameraAltIcon style={{ color: "black" }} fontSize="large" />
        </Button>
      ) : null}
      {img !== changeimg ? (
        <Button
          onClick={userImgSubmit}
          variant="outlined"
          color="primary"
          style={{ border: "none" }}
        >
          <CheckBoxIcon style={{ color: "black" }} fontSize="large" />
        </Button>
      ) : null}
    </div>
  );
};

export default MyProfileImageUploader;
