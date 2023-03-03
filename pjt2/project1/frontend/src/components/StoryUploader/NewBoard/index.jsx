import React, { useEffect, useState } from "react";
import axios from "axios";
import "./NewBoard.scss";

const NewBoard = (props) => {
  const [board, setBoard] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [id, setId] = useState(0);

  useEffect(() => {
    setId(props.id);
    // console.log(id);
    const getBoard = async () => {
      try {
        // console.log(props.id);
        const data = { id: props.id };
        const response = await axios.get("/get/board", { params: data });

        setBoard(response.data); // 데이터는 response.data 안에 들어있습니다.
      } catch (e) {
        setError(e);
      }
      setLoading(false);
    };

    getBoard();
  }, []);
  return (
    <div className="newboard-uploader-wrapper">
      <div className="newboard-body">
        <div className="board-image">
          <img src={`http://i8c201.p.ssafy.io:3000/${board.imageUrl}`} alt="" />
        </div>
        <div className="board-title-content">
          <h2>{board.title}</h2>
          <h4>Content : {board.content}</h4>
          <h4>퍼스널 컬러 : {board.personalcolor}</h4>
        </div>
      </div>
    </div>
  );
};
export default NewBoard;
