import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useCallback, useState, useEffect } from "react";
import ImageUploader from "../ImageUploader";
import api from "../../utils/api";
import axios from "axios";
import { jwtUtils } from "../../utils/jwtUtils";
import ShopInfo from "../StoryUploader/ShopInfo";
import { Button, Grid, Typography } from "@mui/material";
import "./StoryEdit.scss";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const StoryEditor = ({
  story_id,
  st_shopname,
  st_content,
  st_address,
  st_stylename,
  st_styleinfo,
  st_board_id,
  st_imageUrl,
}) => {
  // const story_id = props.story_id

  const [content, setContent] = useState("");
  const [image, setImage] = useState({
    image_file: "",
    preview_URL: "../images/default_image.png",
  });
  const [ischecked, setCheck] = useState(false);
  const [isstyle, setIsStyle] = useState(false);
  const [address, setAddress] = useState("");
  const [shopname, setShop] = useState("");
  const [stylename, setStyle] = useState("");
  const [styleinfo, setStyleInfo] = useState("");

  useEffect(() => {
    const getStory = async () => {
      const data = { id: story_id };
      // console.log(data);
      const response = await axios.get("/get/story/", { params: data });
      return response;
    };
    getStory().then((result) => {
      // console.log(result.data.imageUrl);
      setContent(result.data.content);
      setCheck(result.data.membership);
      setIsStyle(result.data.isstyle);
      setAddress(result.data.address);
      setShop(result.data.shopname);
      setStyle(result.data.stylename);
      setStyleInfo(result.data.styleinfo);

      // 이미지는 파일을 불러올 필요가 없이 미리보기 url만 가져온다.
      // 이미지를 선택하지 않고 올리면 db에 저장되어 있는 이미지를 그대로 사용!
      setImage({ ...image, preview_URL: `http://i8c201.p.ssafy.io:3000/${result.data.imageUrl}` });
    });
  }, []);

  const onChange = ({ target }) => {
    target.checked ? setCheck(true) : setCheck(false);
    // console.log(ischecked)
  };

  // const onStyle = ({ target }) => {
  //   target.checked ? setIsStyle(true) : setIsStyle(false);
  // };

  const canSubmit = useCallback(() => {
    return shopname !== "";
  }, [image, content, shopname, stylename, styleinfo, address]);

  const handleSubmit = useCallback(async () => {
    try {
      const formData = new FormData();
      formData.append("content", content);
      formData.append("file", image.image_file);
      formData.append("shopname", shopname);
      formData.append("stylename", stylename);
      formData.append("styleinfo", styleinfo);
      formData.append("address", address);
      formData.append("membership", ischecked);
      formData.append("id", story_id);

      const res = await api.post("/update/story", formData);

      // console.log(res);

      window.alert("수정이 완료되었습니다😎");
      window.location.reload();
      // navigate("/");
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
    <div
      className="story-wrapper"
      style={{ textAlign: "center", justifyContent: "center" }}
    >
      <div className="story-header">
        <h2>아이템 수정하기 🖊️</h2>
      </div>
      <div className="story-textarea-wrapper">
        <Grid container>
          <Grid item xs={12} md={4}>
            <ImageUploader
              setImage={setImage}
              preview_URL={image.preview_URL}
            />
          </Grid>
          <Grid item xs={"none"} md={1}></Grid>
          <Grid item xs={12} md={7}>
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
                <Typography variant="outlined" align="right">
                  My-Pc 맴버스와 관련된 상품일 경우, 체크해주세요
                  <input type="checkbox" onClick={onChange} />
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
            스토리 수정하기😃
          </Button>
        ) : (
          <Button className="disable-button" variant="outlined" size="large">
            사진과 내용을 모두 입력하세요😭
          </Button>
        )}
      </div>
    </div>
  );
};

export default StoryEditor;
