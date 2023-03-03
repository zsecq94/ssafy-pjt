import { useCallback, useState, useEffect } from "react";
import ImageUploader from "../ImageUploader";
import api from "../../utils/api";
import axios from "axios";
import { Button, Grid, Typography } from "@mui/material";
import "./StoryEdit.scss";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const StoryEditor = ({ story_id }) => {
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
      // console.log(data)
      const { response } = await axios.get("/get/story/", { params: data });
      return response;
    };
    getStory().then((result) => {
      setContent(result.content);
      setCheck(result.membership);
      setIsStyle(result.isstyle);
      setAddress(result.address);
      setShop(result.shopname);
      setStyle(result.stylename);
      setStyleInfo(result.styleinfo);

      // 이미지는 파일을 불러올 필요가 없이 미리보기 url만 가져온다.
      // 이미지를 선택하지 않고 올리면 db에 저장되어 있는 이미지를 그대로 사용!
      setImage({ ...image, preview_URL: `${result.imageUrl}` });
    });
  }, []);

  const onChange = ({ target }) => {
    target.checked ? setCheck(true) : setCheck(false);
    // console.log(ischecked)
  };

  const onStyle = ({ target }) => {
    target.checked ? setIsStyle(true) : setIsStyle(false);
  };

  const canSubmit = useCallback(() => {
    return image.image_file !== "" && content !== "";
  }, [image, content]);

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

      // console.log(res)

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
    <div className="story-wrapper">
      <div className="story-header">게시물 수정하기 🖊️</div>
      <div className="story-textarea-wrapper">
        <Grid container>
          <Grid item xs={1}>
            <ImageUploader
              setImage={setImage}
              preview_URL={image.preview_URL}
            />
          </Grid>
          <Grid item xs={2}></Grid>
          <Grid item xs={9}>
            <div className="story-header">{/* {user.username}'s Story */}</div>
            <textarea
              onChange={(e) => {
                setContent(e.target.value);
              }}
              className="textarea"
              placeholder="당신만의 이야기를 들려주세요"
              value={content}
            />
            <div className="story-radio-wrapper">
              <Typography variant="" align="right">
                추천하고 싶은 스타일이 있으신가요??
                <input type="checkbox" onClick={onStyle}></input>
              </Typography>
            </div>
            {isstyle === true ? (
              <div className="item-textArea-wrapper">
                <div className="story-textarea-wrapper">
                  <h4>여러분의 아이템에 대한 정보를 알려주세요</h4>
                  업체 :{" "}
                  <input
                    onChange={(e) => {
                      setShop(e.target.value);
                    }}
                    className="info"
                    placeholder="업체명을 입력하세요"
                    value={shopname}
                  />
                  <input
                    onChange={(e) => {
                      setAddress(e.target.value);
                    }}
                    className="info"
                    placeholder="주소를 입력하세요"
                    value={address}
                  />
                  <input
                    onChange={(e) => {
                      setStyle(e.target.value);
                    }}
                    className="info"
                    placeholder="제품명을 입력해주세요"
                    value={stylename}
                  />
                  <textarea
                    onChange={(e) => {
                      setStyleInfo(e.target.value);
                    }}
                    className="textarea"
                    placeholder="내용을 입력하세요"
                    value={styleinfo}
                  />
                </div>
                <div className="story-radio-wrapper">
                  <Typography variant="outlined" align="right">
                    My-Pc 맴버스와 관련된 상품일 경우, 체크해주세요
                    <input type="checkbox" onClick={onChange}>
                      {ischecked}
                    </input>
                  </Typography>
                </div>
              </div>
            ) : null}
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
        <div className="submitButton"></div>
      </div>
    </div>
  );
};

export default StoryEditor;
