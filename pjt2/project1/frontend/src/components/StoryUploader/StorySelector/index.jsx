import React, { useContext } from "react";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import StoryResult from "../StoryResult";
import StoryUploader from "../StoryUploader";
import CreateIcon from "@mui/icons-material/Create";
import "./ItemSelector.scss";

const StorySelector = (props) => {
  const board_id = props.id;
  const navigate = useNavigate();

  return (
    <div className="story-board-wrapper">
      <div className="story-result">
        <StoryResult key={board_id} board_id={board_id} />
      </div>
      <hr />
      <div>
        <StoryUploader key={board_id} board_id={board_id} />
      </div>
      <Button
        variant="outlined"
        color="primary"
        endIcon={<CreateIcon />}
        className="upload-button"
        style={{ marginTop: "15px" }}
        onClick={() => {
          navigate("/boardlist");
        }}
      >
        작성 완료
      </Button>
    </div>
  );
};
export default StorySelector;
