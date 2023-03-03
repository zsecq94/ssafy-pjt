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
        const data = { personalcolor: "spring" };
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
    "#f8e3e8",
    "#e8a798",
    "#ff681f",
    "#ffe135",
    "#0047ab",
    "#f2e7bf",
    "#d3e9e2",
    "#fcd024",
    "#a27d56",
    "#ede4c4",
  ];

  const worstcode = [
    "#cc99cc",
    "#dbd4ab",
    "#86724a",
    "#4f4944",
    "#e2dcde",
    "#dcdad2",
    "#3f343a",
    "#4d406b",
    "#8e3155",
    "#0e4bef",
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
          <div>Warm Spring</div>
        </Typography>
        <br />
        <Typography className="font-family" variant="h6" align="center">
          <div>
            봄의 생동감, 화사함과 비슷한 이미지의 색들이 잘 어울리는 사람을 봄
            웜톤이라고 합니다🎈
          </div>
          <div>
            명도와 채도가 높은 색이 잘 어울리고, 한국인은 많은 이들이 이에
            속하는 편입니다😎
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
        <hr />
        <br />
      </div>
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
