import { Card } from "../../components/Card";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./BoardList.scss";
import moment from "moment";
import SeasonSelector from "../../components/SeasonSelector";
function BoardList() {
  const [boardlist, setBoardlist] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        // 요청이 시작 할 때에는 error 와 users 를 초기화하고
        setError(null);
        setBoardlist(null);
        // loading 상태를 true 로 바꿉니다.
        setLoading(true);
        const response = await axios.get("all/board");

        setBoardlist(response.data); // 데이터는 response.data 안에 들어있습니다.
        // console.log(boardlist)
      } catch (e) {
        setError(e);
      }
      setLoading(false);
    };

    fetchUsers();
  }, []);

  if (loading) return <div>로딩중..</div>;
  if (error) return <div>에러가 발생했습니다</div>;
  if (!boardlist) return null;

  return (
    <div className="boardList-wrapper">
      <div className="boardList-header">전체 게시물 📝</div>
      <br />
      <hr />
      <br />
      <br />
      <div className="boardList-body">
        {boardlist.length > 0 ? (
          boardlist.map((board, index) => (
            <Card
              key={board.id}
              date={moment(board.created_at).format("YYYY-MM-DD")}
              title={board.title}
              content={board.content}
              user_id={board.user_id}
              board_id={board.id}
              img_url={board.imageUrl}
            />
          ))
        ) : (
          <div>
            <br />
            <br />
            <br />
            <br />
            <h1>게시글이 없습니다.</h1>
            <br />
            <br />
            <br />
            <br />
          </div>
        )}
        <div className="seasonselector">
          <SeasonSelector />
        </div>
      </div>
      <br />
      <br />
      <div className="seasonselector"></div>
    </div>
  );
}
export default BoardList;
