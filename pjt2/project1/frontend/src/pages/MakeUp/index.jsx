import { useSelector } from "react-redux";
import { useNavigate, useResolvedPath } from "react-router-dom";
import { useCallback, useEffect, useState } from "react";
import ImageUploader from "../../components/ImageUploader";
import api from "../../utils/api";
import { jwtUtils } from "../../utils/jwtUtils";
import { Button } from "@mui/material";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import SpringMakeUp from "../../components/MakeUp/SpringMakeUp";
import SummerMakeUp from "../../components/MakeUp/SummerMakeUp";
import AutumnMakeUp from "../../components/MakeUp/AutumnMakeUp";
import WinterMakeUp from "../../components/MakeUp/WinterMakeUp";
import OutputImg from "../../components/OutputImg";
import "./makeup.scss";
import axios from "axios";

const MakeUp = () => {
  const token = useSelector((state) => state.Auth.token);
  const navigate = useNavigate();
  const [user, setUser] = useState([]);

  const user_id = jwtUtils.getId(token);
  useEffect(() => {
    const data = { id: user_id };
    axios
      .get("/get/user", { params: data })
      .then((V) => {
        setUser(V.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [user_id]);

  // console.log(user);

  // my face image
  const [image, setImage] = useState({
    image_file: "",
    preview_URL: "../images/default_image.png",
  });

  // makeup image
  const [makeupimage, setMakeupimage] = useState({
    image_file: "",
    preview_URL: "../images/default_image.png",
  });

  // output image
  const [outputimage, setOutputimage] = useState("/images/Logo2.png");

  const canSubmit = useCallback(() => {
    return image.image_file !== "" && makeupimage.image_file !== "";
  }, [image, makeupimage]);

  const handleSubmit = useCallback(async () => {
    setCheck(true);
    setSimilar([]);
    setOutputimage(
      "https://blog.kakaocdn.net/dn/c3Rwqs/btqVugu1Dvv/SWkENtL39bcQ7fTrWNBxu0/img.gif"
    );
    try {
      const formData = new FormData();
      formData.append("images", image.image_file);
      formData.append("images", makeupimage.image_file);
      formData.append("user_id", user_id);

      const res = await api.post("/api/makeup", formData);

      if (res.data.message === 0) {
        setOutputimage(res.data.imageUrl);
        window.alert("화장 시뮬레이션 완료😎");
      } else {
        window.alert("얼굴을 인식하지 못했습니다!😭");
      }
    } catch (e) {
      // 서버에서 받은 에러 메시지 출력
      toast.error(
        "오류발생! 이모지를 사용하면 오류가 발생할 수 있습니다" + "😭",
        {
          position: "top-center",
        }
      );
    }
  }, [canSubmit]);

  const goChangePc = () => {
    navigate("/changepc");
  };

  const goAlert = () => {
    return alert("사진을 모두 등록해주세요!!");
  };

  const [similar, setSimilar] = useState([]);
  const [check, setCheck] = useState(true);
  const [str, setStr] = useState("");

  const go = async (V) => {
    setCheck(!check);
    if (V === "1") {
      setStr("결과와 유사한");
    } else {
      setStr("결과와 상반된");
    }
    if (outputimage) {
      const data = { output_img: outputimage, check: V };
      const res = await axios.get("/api/dist", { params: data });

      if (res.data.message === 0) {
        setSimilar(res.data.data);
      } else {
        window.alert("다시 시도해주세요!😭");
      }
    }
  };

  return (
    <div className="makeup-wrapper">
      <div className="makeup-header">화장 시뮬레이션✨</div>
      <div className="makeup-submitButton">
        <Button
          className="makeup-disable-button"
          variant="outlined"
          size="large"
        >
          첫 번째에 내 사진 두 번째에 화장된 사진을 등록 해주세요🤞
        </Button>
      </div>
      <div className="makeup-body">
        <ImageUploader setImage={setImage} preview_URL={image.preview_URL} />
        <ImageUploader
          setImage={setMakeupimage}
          preview_URL={makeupimage.preview_URL}
        />
        <OutputImg
          outputimage={outputimage}
          canSubmit={canSubmit}
          handleSubmit={handleSubmit}
        />
      </div>
      <div className="makeup-submitButton">
        {canSubmit() ? (
          <Button
            onClick={handleSubmit}
            className="makeup-success-button"
            variant="outlined"
          >
            화장하기😃
          </Button>
        ) : (
          <Button
            className="makeup-disable-button"
            variant="outlined"
            size="large"
            onClick={goAlert}
          >
            화장하기😃
          </Button>
        )}
      </div>
      <hr />
      <br />
      {outputimage !==
        "https://blog.kakaocdn.net/dn/c3Rwqs/btqVugu1Dvv/SWkENtL39bcQ7fTrWNBxu0/img.gif" &&
      outputimage !== "/images/Logo2.png" &&
      check ? (
        <div>
          <h2>결과에 만족하시나요?</h2>
          <h4>
            결과에 만족하시면 결과와 유사한 메이크업 사진을, 불만족하시면 결과와
            상반된 메이크업 사진을 추천해드립니다!!
          </h4>
          <Button
            className="makeup-success-button"
            variant="outlined"
            style={{ marginRight: "2%" }}
            onClick={() => {
              go("1");
            }}
          >
            만족👍
          </Button>
          <Button
            className="makeup-success-button"
            variant="outlined"
            style={{ marginLeft: "2%" }}
            onClick={() => {
              go("2");
            }}
          >
            불만족😒
          </Button>
          <br />
          <br />
          <hr />
          <br />
        </div>
      ) : null}

      {similar.length > 0 ? (
        <div className="similar-img">
          <h2>{str} 연예인 사진 추천 5😍</h2>
          <img
            onClick={() => {
              setMakeupimage({
                image_file: similar[0] + 100,
                preview_URL: `../img/${similar[0]}.jpg`,
              });
            }}
            src={`../img/${similar[0]}.jpg`}
            alt=""
          />
          <img
            onClick={() => {
              setMakeupimage({
                image_file: similar[1] + 100,
                preview_URL: `../img/${similar[1]}.jpg`,
              });
            }}
            src={`../img/${similar[1]}.jpg`}
            alt=""
          />
          <img
            onClick={() => {
              setMakeupimage({
                image_file: similar[2] + 100,
                preview_URL: `../img/${similar[2]}.jpg`,
              });
            }}
            src={`../img/${similar[2]}.jpg`}
            alt=""
          />
          <img
            onClick={() => {
              setMakeupimage({
                image_file: similar[3] + 100,
                preview_URL: `../img/${similar[3]}.jpg`,
              });
            }}
            src={`../img/${similar[3]}.jpg`}
            alt=""
          />
          <img
            onClick={() => {
              setMakeupimage({
                image_file: similar[4] + 100,
                preview_URL: `../img/${similar[4]}.jpg`,
              });
            }}
            src={`../img/${similar[4]}.jpg`}
            alt=""
          />
          <br />
          <hr />
          <br />
        </div>
      ) : null}
      {!check && similar.length === 0 ? (
        <div>
          <img
            src="https://blog.kakaocdn.net/dn/c3Rwqs/btqVugu1Dvv/SWkENtL39bcQ7fTrWNBxu0/img.gif"
            alt=""
            style={{ width: "100px", height: "100px" }}
          />
          <br />
          <hr />
          <br />
        </div>
      ) : null}

      <Button
        onClick={goChangePc}
        className="change-pc"
        variant="outlined"
        size="large"
      >
        내 PC 변경하기
      </Button>
      <div className="makeup-footer">
        {user.personalcolor === "spring" ? (
          <SpringMakeUp user={user} setMakeupimage={setMakeupimage} />
        ) : null}
        {user.personalcolor === "summer" ? (
          <SummerMakeUp user={user} setMakeupimage={setMakeupimage} />
        ) : null}
        {user.personalcolor === "autumn" ? (
          <AutumnMakeUp user={user} setMakeupimage={setMakeupimage} />
        ) : null}
        {user.personalcolor === "winter" ? (
          <WinterMakeUp user={user} setMakeupimage={setMakeupimage} />
        ) : null}
        {user.personalcolor === "none" ? (
          <h2>My PC 변경하기를 통해 유명 연예인의 화장사진을 이용해보세요!</h2>
        ) : null}
        <br />
        <br />
        <br />
      </div>
    </div>
  );
};

export default MakeUp;
