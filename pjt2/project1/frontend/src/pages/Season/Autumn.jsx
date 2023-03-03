import { useState, useEffect } from "react";
import axios from "axios";
import { Card } from "../../components/Card";
import moment from "moment";
import Season from "../../components/SeasonSelector";
import { Typography } from "@mui/material";
import "./season.scss";

const Board = () => {
  //console.log(state);
  const [boards, setBoard] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getBoard = async () => {
      try {
        const data = { personalcolor: "autumn" };
        // console.log(data);
        const response = await axios.get("/get/season", { params: data });

        setBoard(response.data); // 데이터는 response.data 안에 들어있습니다.
        // console.log(response)
      } catch (e) {
        setError(e);
      }
      setLoading(false);
    };

    getBoard();
  }, []);

  const bestcode = [
    "#e26e0e",
    "#f6a09d",
    "#e1a16d",
    "#a14051",
    "#f3cc8b",
    "#a9d171",
    "#0090d4",
    "#2a52be",
    "#7a624d",
    "#00a78b",
  ];

  const worstcode = [
    "#ebe3eb",
    "#f7f5eb",
    "#f5e7e4",
    "#f7e8ec",
    "#cac1b1",
    "#ecd3a9",
    "#b2b9a5",
    "#cbecb5",
    "#fce903",
    "#ffb700",
  ];

  var bestcolor = [];
  var worstcolor = [];

  while (bestcode.length > 6) {
    var movenum = bestcode.splice(
      Math.floor(Math.random() * bestcode.length),
      1
    )[0];
    bestcolor.push(movenum);
  }
  while (worstcode.length > 6) {
    var movenum2 = worstcode.splice(
      Math.floor(Math.random() * worstcode.length),
      1
    )[0];
    worstcolor.push(movenum2);
  }

  return (
    <div className="season-wrapper">
      <div>
        <Typography className="font-family" variant="h2" align="center">
          <div>Warm Autumn</div>
        </Typography>
        <br />
        <Typography className="font-family" variant="h6" align="center">
          <div>
            클래식하고 성숙한 이미지를 연상시키는 것은 가을 웜톤이에요🎈
          </div>
          <div>
            명도와 채도 모두 낮은 노란 기 있는 어두운색이 주로 잘 어울리고,
            푸른색 계열은 잘 어울리지 않습니다😎
          </div>
        </Typography>
        <hr />
        <br />
        <div className="season-color">
          <div style={{ width: "50%", marginRight: "5%" }}>
            <Typography className="font-family" variant="h4" align="center">
              Best Color
            </Typography>
            <div
              style={{
                display: "flex",
                textAlign: "center",
              }}
            >
              <div
                className="season-border"
                style={{ backgroundColor: bestcolor[0] }}
              ></div>
              <div
                className="season-border"
                style={{ backgroundColor: bestcolor[1] }}
              ></div>
              <div
                className="season-border"
                style={{ backgroundColor: bestcolor[2] }}
              ></div>
              <div
                className="season-border"
                style={{ backgroundColor: bestcolor[3] }}
              ></div>
            </div>
          </div>
          <div style={{ width: "50%", marginLeft: "5%" }}>
            <Typography className="font-family" variant="h4" align="center">
              Worst Color
            </Typography>
            <div
              style={{
                display: "flex",
                textAlign: "center",
              }}
            >
              <div
                className="season-border"
                style={{ backgroundColor: worstcolor[0] }}
              ></div>
              <div
                className="season-border"
                style={{ backgroundColor: worstcolor[1] }}
              ></div>
              <div
                className="season-border"
                style={{ backgroundColor: worstcolor[2] }}
              ></div>
              <div
                className="season-border"
                style={{ backgroundColor: worstcolor[3] }}
              ></div>
            </div>
          </div>
        </div>
      </div>
      <hr />
      <br />
      <div className="season-body">
        {boards &&
          boards.map((board, index) => (
            <Card
              key={board.id}
              date={moment(board.created_at).format("YYYY-MM-DD")}
              title={board.title}
              content={board.content}
              user_id={board.user_id}
              board_id={board.id}
              img_url={`http://i8c201.p.ssafy.io:3000/${board.imageUrl}`}
            />
          ))}
      </div>
      <div className="seasonselector">
        <Season />
      </div>
    </div>
  );
};

export default Board;
