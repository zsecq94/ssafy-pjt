import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useCallback, useState } from "react";
import ImageUploader from "../../components/ImageUploader";
import api from "../../utils/api";
import axios from "axios";
import { jwtUtils } from "../../utils/jwtUtils";
import TextArea from "../../components/TextArea";
import { Button, Dialog, DialogContent, IconButton } from "@mui/material";
import "./Addboard.scss";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AddBoard = () => {
  const token = useSelector((state) => state.Auth.token);
  const navigate = useNavigate();

  // 게시판 제목, 내용, 사진
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState({
    image_file: "",
    preview_URL: "../images/default_image.png",
  });
  const [personalcolor, setColor] = useState("");

  // modal이 보이는 여부 상태
  const [show, setShow] = useState(false);

  const canSubmit = useCallback(() => {
    return (
      image.image_file !== "" &&
      content !== "" &&
      title !== "" &&
      personalcolor !== ""
    );
  }, [image, title, content, personalcolor]);

  const handleSubmit = useCallback(async () => {
    // console.log(title);
    // console.log(content);
    // console.log(image);
    try {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("content", content);
      formData.append("file", image.image_file);
      formData.append("personalcolor", personalcolor);
      formData.append("user_id", jwtUtils.getId(token));

      // console.log(image.image_file);
      // console.log(formData);

      const res = await api.post("/api/board", formData);

      // console.log(res);

      if (res.data.message === 1) {
        toast.error("오류발생!" + "😭", {
          position: "top-center",
        });
      }

      setShow(true);
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
    <div className="addBoard-wrapper">
      <div style={{ fontFamily: "Gugi" }} className="addBoard-header">
        게시물 등록하기 🖊️
      </div>
      <div className="submitButton">
        {canSubmit() ? (
          <Button
            onClick={handleSubmit}
            className="success-button"
            variant="outlined"
          >
            등록하기😃
          </Button>
        ) : (
          <Button className="disable-button" variant="outlined" size="large">
            사진과 내용을 모두 입력하세요😭
          </Button>
        )}
      </div>
      <div className="addBoard-body">
        <ImageUploader setImage={setImage} preview_URL={image.preview_URL} />
        <TextArea
          setTitle={setTitle}
          setContent={setContent}
          setColor={setColor}
          title={title}
          content={content}
          personalcolor={personalcolor}
        />
      </div>

      <Dialog open={show}>
        <DialogContent style={{ position: "relative" }}>
          <IconButton
            style={{ position: "absolute", top: "0", right: "0" }}
            onClick={() => setShow(false)}
          ></IconButton>
          <div className="modal">
            <div className="modal-title">추천하고 싶은 아이템이 있나요?</div>
            <div className="modal-button">
              <Button
                variant="outlined"
                style={{ marginRight: "5px" }}
                color="error"
                onClick={async () => {
                  setShow(false);
                  // 모달의 예 버튼 클릭시 스토리 추가로...
                  window.location.href = "/story";
                }}
              >
                예
              </Button>
              <Button
                variant="outlined"
                color="primary"
                onClick={() => {
                  setShow(false);
                  window.alert("😎등록이 완료되었습니다😎");
                  window.location.href = "/boardlist";
                }}
              >
                아니오
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AddBoard;
