import "./ProfileCard.scss";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

export const ProfileCard = ({
  item_id,
  title,
  content,
  img_url,
  username,
  date,
}) => {
  const navigate = useNavigate();
  const [itemid, setItemId] = useState("");
  useEffect(() => {
    setItemId(item_id);
  }, [item_id]);
  return (
    <div
      className="myprofile-card-wrapper"
      onClick={() => {
        navigate(`/board/${itemid}`);
      }}
    >
      <div className="myprofile-card-body-img">
        <img src={img_url} />
      </div>
    </div>
  );
};

export default ProfileCard;
