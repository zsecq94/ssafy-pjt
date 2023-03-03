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
        const data = { personalcolor: "summer" };
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
    "#db9fbf",
    "#e1697c",
    "#b5decf",
    "#01796f",
    "#87cefa",
    "#052c49",
    "#a89bca",
    "#dfe0db",
    "#59473f",
    "#cfcac7",
  ];

  const worstcode = [
    "#305e51",
    "#205258",
    "#d26b33",
    "#494c59",
    "#69566a",
    "#56130f",
    "#009e82",
    "#4e9aa6",
    "#4d406b",
    "#8e3155",
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
          <div>Cool Summer</div>
        </Typography>
        <br />
        <Typography className="font-family" variant="h6" align="center">
          <div>
            맑고, 깨끗하고, 고요하고, 우아한 분위기를 가지면 여름 쿨톤일
            가능성이 높습니다🎈
          </div>
          <div>명도는 높고 채도는 낮은 푸른색의 옷이 주로 잘 어울립니다😁</div>
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
