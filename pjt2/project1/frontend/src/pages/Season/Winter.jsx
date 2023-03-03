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
        const data = { personalcolor: "winter" };
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
    "#da77a8",
    "#ff0090",
    "#b11226",
    "#fce903",
    "#8db600",
    "#01796f",
    "#c6f5ff",
    "#363f63",
    "#83837d",
    "#b0d12a",
  ];

  const worstcode = [
    "#eff1cd",
    "#f3e6e5",
    "#d3f0e4",
    "#cc99cc",
    "#dbd4ab",
    "#4f4944",
    "#7d705f",
    "#ecd3a9",
    "#b2b9a5",
    "#cbecb5",
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
          <div>Cool Winter</div>
        </Typography>
        <br />
        <Typography className="font-family" variant="h6" align="center">
          <div>
            모던하고, 고상한 이미지의 겨울 쿨톤은 대조가 강한 색들을 사용하여
            코디하는 것이 잘 어울려요🎈
          </div>
          <div>
            특히 검정과 흰색의 조합은 시크한 이미지를 극대화해줄 수 있어요😝
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
