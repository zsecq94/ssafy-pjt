import { useState } from "react";
import { useNavigate } from "react-router-dom";
import PaidIcon from "@mui/icons-material/Paid";
import StoryDetail from "../StoryDetail";
import DisabledByDefaultOutlinedIcon from "@mui/icons-material/DisabledByDefaultOutlined";
import {
  Button,
  Dialog,
  DialogContent,
  IconButton,
  Drawer,
} from "@mui/material";
import "./StoryCard.scss";

export const StoryCards = ({ story_id, img_url, board_id, membership }) => {
  // modal이 보이는 여부 상태
  const [show, setShow] = useState(false);

  const navigate = useNavigate();
  return (
    <div className="story-card-wrapper">
      {membership === true ? (
        <div
          className="story-body-img"
          onClick={() => {
            setShow(true);
          }}
        >
          <img src={`http://i8c201.p.ssafy.io:3000/${img_url}`} />
          <PaidIcon className="membership" />
        </div>
      ) : (
        <div
          className="story-body-img"
          onClick={() => {
            setShow(true);
          }}
        >
          <img src={`http://i8c201.p.ssafy.io:3000/${img_url}`} />
        </div>
      )}
      <Dialog open={show} fullWidth maxWidth="md">
        <DialogContent style={{ position: "relative", textAlign: "center" }}>
          <DisabledByDefaultOutlinedIcon onClick={() => setShow(false)} />
          <StoryDetail key={story_id} story_id={story_id} board_id={board_id} />
        </DialogContent>
      </Dialog>
    </div>
  );
};
