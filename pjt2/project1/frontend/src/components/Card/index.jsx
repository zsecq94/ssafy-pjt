import "./Card.scss";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

export const Card = ({ board_id, img_url, user_id }) => {
  const [users, setUser] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getUser = async () => {
      try {
        const data = { id: user_id };
        const response = await axios.get("/get/user", { params: data });
        setUser(response.data); // 데이터는 response.data 안에 들어있습니다.
      } catch (e) {
        setUser(e);
      }
      setLoading(false);
    };

    getUser();
  }, []);

  const navigate = useNavigate();
  return (
    <div className="card-wrapper">
      <div className="card-body-img">
        <img
          src={img_url}
          onClick={() => {
            navigate(`/board/${board_id}`, { state: board_id });
          }}
        />
      </div>
      <div
        className="card-footer"
        onClick={() => {
          navigate(`/user/${user_id}`, { state: user_id });
        }}
      >
        <div className="card-footer-img">
          <img src={
                    users.userimgurl === "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png" ? (
                      users.userimgurl
                    ) : `http://i8c201.p.ssafy.io:3000/${users.userimgurl}`} />
        </div>
        <div className="card-footer-data">
          <h4>{users.username}</h4>
        </div>
      </div>
    </div>
  );
};
