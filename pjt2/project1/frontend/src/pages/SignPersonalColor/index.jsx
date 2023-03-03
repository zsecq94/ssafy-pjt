import { useNavigate } from "react-router-dom";
import { useCallback, useState } from "react";
import ImageUploader from "../../components/ImageUploader";
import api from "../../utils/api";
import { Button } from "@mui/material";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./signpersonalcolor.scss";

const PersonalColor = () => {
  const navigate = useNavigate();

  // my face image
  const [image, setImage] = useState({
    image_file: "",
    preview_URL: "../images/default_image.png",
  });

  const [color, setColor] = useState("");

  const canSubmit = useCallback(() => {
    return image.image_file !== "";
  }, [image]);

  const handleSubmit = useCallback(async () => {
    setColor("");
    const saveimg = image.preview_URL;
    try {
      setImage({
        image_file: image.image_file,
        preview_URL:
          "https://blog.kakaocdn.net/dn/c3Rwqs/btqVugu1Dvv/SWkENtL39bcQ7fTrWNBxu0/img.gif",
      });
      const formData = new FormData();
      formData.append("file", image.image_file);

      const res = await api.post("/api/personal", formData);
      // console.log(res);
      // console.log(res.data);

      if (res.data.message === 0){

      if (res.data.data === '0') {
        setColor("Spring");
      } else if (res.data.data === '1') {
        setColor("Summer");
      } else if (res.data.data === '2') {
        setColor("Autumn");
      } else {
        setColor("Winter");
      }

      window.alert("진단 완료😎");
      setImage({
        image_file: image.image_file,
        preview_URL: saveimg,
      });
    } else {
      window.alert("얼굴을 인식하지 못했습니다!😭");
    }

    } catch (e) {
      // 서버에서 받은 에러 메시지 출력
      toast.error("진단 실패" + "😭", {
        position: "top-center",
      });
    }
  }, [canSubmit]);

  return (
    <div className="pc-wrapper">
      <div className="pc-header">✨ 내 PC 진단 ✨</div>
      <div className="pc-submitButton">
        {canSubmit() ? (
          <Button
            onClick={handleSubmit}
            className="success-button"
            variant="outlined"
          >
            진단하기😃
          </Button>
        ) : (
          <Button className="disable-button" variant="outlined" size="large">
            사진을 등록해주세요😭
          </Button>
        )}
      </div>
      <div>{color ? <h1>진단 결과 : {color}</h1> : null}</div>
      <div className="pc-body">
        <ImageUploader setImage={setImage} preview_URL={image.preview_URL} />
      </div>
    </div>
  );
};

export default PersonalColor;
