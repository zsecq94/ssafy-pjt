import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import {
  Button,
  Dialog,
  DialogContent,
  IconButton,
  Divider,
} from "@mui/material";
import SpeakerNotesIcon from "@mui/icons-material/SpeakerNotes";
import Grid from "@mui/material/Grid";
import "./board.scss";
import BuildOutlinedIcon from "@mui/icons-material/BuildOutlined";
import DeleteForeverOutlinedIcon from "@mui/icons-material/DeleteForeverOutlined";
import DisabledByDefaultOutlinedIcon from "@mui/icons-material/DisabledByDefaultOutlined";
import StoryResult from "../../components/StoryUploader/StoryResult";

import { jwtUtils } from "../../utils/jwtUtils";
import { useSelector } from "react-redux";

const Board = () => {
  const user_id = JSON.parse(localStorage.getItem("userid"));
  const navigate = useNavigate();
  const { board_id } = useParams();
  // const token = useSelector(state => state.Auth.token);
  // const user_id = jwtUtils.getId(token)
  const [user, setUser] = useState({});
  const [board, setBoard] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getBoard = async () => {
      try {
        const data = { id: board_id };
        const response = await axios.get("/get/board", { params: data });
        setBoard(response.data); // 데이터는 response.data 안에 들어있습니다.
        const data2 = { id: response.data.user_id };
        const res = await axios.get("/get/user", { params: data2 });
        // console.log(res);
        setUser(res.data);
      } catch (e) {
        setError(e);
      }
      setLoading(false);
    };

    getBoard();
  }, []);

  // modal이 보이는 여부 상태
  const [show, setShow] = useState(false);
  const [openstory, setStory] = useState(false);

  return (
    <div className="board-wrapper">
      <div className="edit-delete-button">
        {board.user_id === user_id ? (
          <div>
            <Button
              style={{ fontFamily: "Gugi" }}
              variant="outlined"
              endIcon={<BuildOutlinedIcon />}
              onClick={() => {
                navigate(`/edit-board/${board_id}`, { state: board_id });
              }}
            >
              수정
            </Button>
            <Button
              style={{ fontFamily: "Gugi" }}
              variant="outlined"
              color="error"
              endIcon={<DeleteForeverOutlinedIcon />}
              className="delete-button"
              onClick={() => {
                setShow(true);
              }}
            >
              삭제
            </Button>
          </div>
        ) : null}
        <br />
        <br />
        <br />
      </div>
      <div className="board-body">
        <Grid container>
          <div className="board-image">
            <Grid xs={12} md={3}>
              <img src={`http://i8c201.p.ssafy.io:3000/${board.imageUrl}`} />
            </Grid>
          </div>
          <Grid xs={"none"} md={1}></Grid>
          <div className="board-title-content">
            <Grid xs={12} md={8}>
              <div className="board-title">{board.title}</div>
              <div className="board-user-info">
                <img
                  src={
                    user.userimgurl === "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png" ? (
                      user.userimgurl
                    ) : `http://i8c201.p.ssafy.io:3000/${user.userimgurl}`}
                  alt=""
                />
                <h1>{user.username}</h1>
              </div>
              <div className="board-content">{board.content}</div>
            </Grid>
          </div>
        </Grid>
      </div>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <h2>{user.username}'s Item</h2>
        {board.user_id === user_id ? (
          <Button
            style={{ fontFamily: "Gugi" }}
            color="warning"
            endIcon={<BuildOutlinedIcon />}
            onClick={() => {
              navigate(`/edit-story/${board_id}`, { state: board_id });
            }}
          >
            아이템 추천하기
          </Button>
        ) : null}
      </div>
      <hr />
      <div>
        <StoryResult key={board.id} board_id={board.id} />
      </div>
      {/*삭제모달*/}
      <Dialog open={show}>
        <DialogContent style={{ position: "relative" }}>
          <IconButton
            style={{ position: "absolute", top: "0", right: "0" }}
            onClick={() => setShow(false)}
          >
            <DisabledByDefaultOutlinedIcon />
          </IconButton>
          <div className="modal">
            <div className="modal-title"> 정말 삭제하시겠습니까 ?</div>
            <div className="modal-button">
              <Button
                variant="outlined"
                color="error"
                onClick={async () => {
                  setShow(false);
                  // 모달의 예 버튼 클릭시 게시물 삭제
                  const response = await axios.post("/delete/data", {
                    id: board_id,
                  });
                  // console.log(response)
                  alert("게시물이 삭제되었습니다😎");
                  window.location.href = "/boardlist";
                }}
              >
                예
              </Button>
              <Button
                variant="outlined"
                color="primary"
                onClick={() => {
                  setShow(false);
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

export default Board;
