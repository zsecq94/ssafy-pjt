import { useState, useEffect } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import {
  Button,
  Dialog,
  DialogContent,
  IconButton,
  Grid,
  Drawer,
} from "@mui/material";
import axios from "axios";
import "./StoryDetail.scss";
import BuildOutlinedIcon from "@mui/icons-material/BuildOutlined";
import DeleteForeverOutlinedIcon from "@mui/icons-material/DeleteForeverOutlined";
import DisabledByDefaultOutlinedIcon from "@mui/icons-material/DisabledByDefaultOutlined";
import StoryEdit from "../../StoryEdit";

const StoryDetail = ({ story_id, board_id }) => {
  const navigate = useNavigate();
  const user_id = JSON.parse(localStorage.getItem("userid"));
  const [story, setStory] = useState({});
  const [board, setBoard] = useState({});
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  // const [ ischecked, setCheck ] = useState(false)

  // const onChange = ({ target }) => {
  //   target.checked ? setCheck(true) : setCheck(false);
  // };

  useEffect(() => {
    const getStory = async () => {
      try {
        const data = { id: story_id };
        const response = await axios.get("/get/story", { params: data });
        // console.log(response.data);
        // console.log(data);
        setStory(response.data); // 데이터는 response.data 안에 들어있습니다.
      } catch (e) {
        setError(e);
      }
      setLoading(false);
    };

    getStory();
  }, []);

  useEffect(() => {
    const getBoard = async () => {
      try {
        const data = { id: board_id };
        const response = await axios.get("/get/board", { params: data });

        setBoard(response.data); // 데이터는 response.data 안에 들어있습니다.
      } catch (e) {
        setError(e);
      }
      setLoading(false);
    };

    getBoard();
  }, []);

  useEffect(() => {
    const getUser = async () => {
      try {
        const data = { id: user_id };
        const response = await axios.get("/get/user", { params: data });

        setUser(response.data); // 데이터는 response.data 안에 들어있습니다.
      } catch (e) {
        setError(e);
      }
      setLoading(false);
    };

    getUser();
  }, []);
  // console.log(board);
  // console.log(story);
  // console.log(user);
  // modal이 보이는 여부 상태

  const [show, setShow] = useState(false);
  const [openStyle, setStyle] = useState(false);
  const [edit, setEdit] = useState(false);

  return (
    <div className="story-detail-wrapper">
      <Grid container>
        <Grid xs={12} md={4}>
          <div className="story-image">
            <img src={`http://i8c201.p.ssafy.io:3000/${story.imageUrl}`} />
          </div>
        </Grid>
        <Grid xs={"none"} md={1}></Grid>
        <Grid xs={12} md={7}>
          <div className="story-content-board">
            <div className="story-edit-delete-button">
              {board.user_id === user_id ? (
                <div>
                  <DeleteForeverOutlinedIcon
                    variant="outlined"
                    color="error"
                    className="delete-button"
                    onClick={() => {
                      setShow(true);
                    }}
                  />
                  <BuildOutlinedIcon
                    variant="outlined"
                    color="primary"
                    onClick={() => {
                      setEdit(true);
                    }}
                  />
                </div>
              ) : null}
            </div>
            <div className="story-content-wrapper">
              <h2>Item 정보</h2>
              <div className="story-content">
                <h4>업체명 : {story.shopname}</h4>
                <h4>제품명 : {story.stylename}</h4>
                <h4>
                  주소 :{" "}
                  <a href={`https://${story.address}`}>{story.address}</a>
                </h4>
                <div>{story.styleinfo}</div>
              </div>
            </div>
          </div>
        </Grid>
      </Grid>

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
                  const response = await axios.post("/delete/story", {
                    id: story_id,
                  });
                  // console.log(response)
                  alert("게시물이 삭제되었습니다😎");
                  window.location.href = `/board/${board.id}`;
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

      <Dialog open={openStyle} fullWidth maxWidth="xs">
        <DialogContent style={{ position: "relative", textAlign: "start" }}>
          <IconButton
            style={{ position: "absolute", top: "0", right: "0" }}
            onClick={() => setStyle(false)}
          >
            <DisabledByDefaultOutlinedIcon />
          </IconButton>
        </DialogContent>
      </Dialog>

      <Dialog open={edit} fullWidth maxWidth="md">
        <DialogContent style={{ position: "relative", textAlign: "start" }}>
          <IconButton
            style={{ position: "absolute", top: "0", right: "0" }}
            onClick={() => setEdit(false)}
          >
            <DisabledByDefaultOutlinedIcon />
          </IconButton>
          <div>
            <StoryEdit
              key={story.id}
              story_id={story.id}
              st_shopname={story.shopname}
              st_content={story.content}
              st_address={story.address}
              st_stylename={story.stylename}
              st_styleinfo={story.styleinfo}
              st_board_id={story.board_id}
              st_imageUrl={story.imageUrl}
            />
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default StoryDetail;
