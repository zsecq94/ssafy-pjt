import React, { useState, useEffect } from "react";
import axios from "axios";
import moment from "moment";
import StoryUploader from "../StoryUploader";
import { Paper, Button, Dialog, DialogContent } from "@mui/material";
import "./storyresult.scss";
import { StoryCards } from "../StoryCards";
import Slider from "react-slick";

const ItemResult = (props) => {
  const [stories, setStory] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getStory = async () => {
      try {
        const data = { id: props.board_id };
        // console.log(data);
        const response = await axios.get("/get/stories", { params: data });
        // console.log(response);
        setStory(response.data); // 데이터는 response.data 안에 들어있습니다.
      } catch (e) {
        setError(e);
      }
      setLoading(false);
    };
    getStory();
  }, []);

  // modal이 보이는 여부 상태
  const [show, setShow] = useState(false);

  return (
    <div>
      <div className="item-result-wrapper">
        {stories.length === 0 ? (
          <div className="boardlist-body" display="flex">
            <h2>추천 아이템이 없습니다!</h2>
          </div>
        ) : (
          <div className="boardlist-body">
            {stories &&
              stories.map((story, index) => (
                <StoryCards
                  key={story.id}
                  date={moment(story.created_at).format("YYYY-MM-DD")}
                  content={story.content}
                  story_id={story.id}
                  img_url={story.imageUrl}
                  board_id={story.board_id}
                  membership={story.membership}
                />
              ))}
          </div>
        )}
      </div>

      <Dialog open={show} fullWidth maxWidth="md">
        <DialogContent style={{ position: "relative", textAlign: "center" }}>
          <StoryUploader />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ItemResult;
