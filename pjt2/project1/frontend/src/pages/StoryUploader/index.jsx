import React, { useEffect, useState } from "react";
// import ItemSelector from "../../components/ItemUploader/ItemSelector";
import { Grid, Button } from "@mui/material";
import axios from "axios";
import NewBoard from "../../components/StoryUploader/NewBoard";
import StorySelector from "../../components/StoryUploader/StorySelector";
import { useNavigate } from "react-router-dom";
import "./storyuploader.scss";

const ItemUploader = () => {
  const navigate = useNavigate();

  const [id, setId] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getId = async () => {
      try {
        const response = await axios.get("/id/board");
        // console.log(response.data.data)
        // console.log(response.data)
        // console.log(id)

        setId(response.data.data);
      } catch (e) {
        setError(e);
      }
      setLoading(false);
    };
    getId();
  }, []);

  return (
    <div className="main-wrapper">
      <h1>추천하고싶은 아이템을 등록해주세요🎁</h1>
      <br />
      <Grid container>
        <Grid xs={12} md={4}>
          <div className="newboard">
            <NewBoard key={id} id={id} />
          </div>
        </Grid>
        <Grid xs={"none"} md={1}></Grid>
        <Grid xs={12} md={7}>
          <div className="storyselector">
            <StorySelector key={id} id={id} />
          </div>
        </Grid>
      </Grid>
    </div>
  );
};
export default ItemUploader;
