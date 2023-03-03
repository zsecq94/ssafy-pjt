import "./imageUploader.scss";

const ImageUploader = ({ preview_URL, setImage }) => {
  let inputRef;

  const saveImage = (e) => {
    e.preventDefault();
    const fileReader = new FileReader();
    if (e.target.files[0]) {
      fileReader.readAsDataURL(e.target.files[0]);
    }
    fileReader.onload = () => {
      // console.log(e.target.files[0]);
      setImage({
        image_file: e.target.files[0],
        preview_URL: fileReader.result,
      });
    };
  };

  return (
    <div className="image-uploader-wrapper">
      <input
        type="file"
        accept="image/*"
        onChange={saveImage}
        ref={(refParam) => (inputRef = refParam)}
        style={{ display: "none" }}
      />
      <div className="img-wrapper">
        <img src={preview_URL} onClick={() => inputRef.click()} alt="" />
      </div>
    </div>
  );
};

export default ImageUploader;
