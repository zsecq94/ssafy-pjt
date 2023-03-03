import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useCallback, useState, useEffect } from "react";
import ImageUploader from "../../ImageUploader";
import api from "../../../utils/api";
import axios from "axios";
import { jwtUtils } from "../../../utils/jwtUtils";
import ShopInfo from "../ShopInfo";
import { Button, Grid, Typography } from "@mui/material";
import "./StoryUploader.scss";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import StoryImgUploader from "../StoryImgUploader/index";

const StoryUploader = (props) => {
  const board_id = props.board_id;
  const token = useSelector((state) => state.Auth.token);
  const navigate = useNavigate();
  // console.log(board_id)
  const [user, setUser] = useState([]);

  const [content, setContent] = useState("");
  const [image, setImage] = useState({
    image_file: "",
    preview_URL: "../images/default_image.png",
  });
  const [membership, setCheck] = useState(false);
  const [address, setAddress] = useState("");
  const [shopname, setShop] = useState("");
  const [stylename, setStyle] = useState("");
  const [styleinfo, setStyleInfo] = useState("");

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

  const onChange = ({ target }) => {
    target.checked ? setCheck(true) : setCheck(false);
    // console.log(ischecked)
  };

  const canSubmit = useCallback(() => {
    return image.image_file !== "" && shopname !== "";
  }, [image, content, shopname, stylename, styleinfo, address, membership]);

  const handleSubmit = useCallback(async () => {
    try {
      // console.log("shopname: ", shopname);
      if (shopname !== "" && shopname !== null) {
        const formData = new FormData();
        formData.append("content", content);
        formData.append("file", image.image_file);
        formData.append("shopname", shopname);
        formData.append("stylename", stylename);
        formData.append("styleinfo", styleinfo);
        formData.append("address", address);
        formData.append("membership", membership);
        formData.append("board_id", board_id);

        const res = await api.post("/api/story", formData);
        // console.log(res);
      }

      // console.log(res)

      window.alert("😎등록이 완료되었습니다😎");
      window.location.reload();
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

  return (
    <div className="story-wrapper">
      <div className="story-textarea-wrapper">
        <Grid container>
          <Grid item xs={12} md={2}>
            <StoryImgUploader
              setImage={setImage}
              preview_URL={image.preview_URL}
            />
          </Grid>
          <Grid item xs={"none"} md={2}></Grid>
          <Grid item xs={12} md={8}>
            <div className="item-textArea-wrapper">
              <ShopInfo
                setAddress={setAddress}
                setShop={setShop}
                setStyle={setStyle}
                setStyleInfo={setStyleInfo}
                address={address}
                shopname={shopname}
                stylename={stylename}
                styleinfo={styleinfo}
              />
              <div className="story-radio-wrapper">
                <Typography variant="" align="right">
                  My-Pc 맴버스와 관련된 상품일 경우, 체크해주세요
                  <input type="checkbox" onClick={onChange}></input>
                </Typography>
              </div>
            </div>
          </Grid>
        </Grid>
      </div>
      <div className="submitButton" style={{ marginTop: "20px" }}>
        {canSubmit() ? (
          <Button
            onClick={handleSubmit}
            className="success-button"
            variant="outlined"
          >
            스타일 등록하기😃
          </Button>
        ) : (
          <Button className="disable-button" variant="outlined" size="large">
            사진과 내용을 모두 입력하세요😭
          </Button>
        )}
        <div className="submitButton"></div>
      </div>
    </div>
  );
};

export default StoryUploader;
