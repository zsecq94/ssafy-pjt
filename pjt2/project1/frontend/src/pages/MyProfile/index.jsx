import React, { useEffect, useState } from "react";
import "./myprofile.scss";
import axios from "axios";
import ProfileCard from "../../components/ProfileCard/index";
import moment from "moment";
import MyProfileImageUploader from "../../components/MyProfileImageUploader";
import { Button } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import CancelIcon from "@mui/icons-material/Cancel";

const MyProfile = () => {
  const user_id = JSON.parse(localStorage.getItem("userid"));
  const login_id = user_id;
  const [BoardList, setBoardList] = useState([]);
  const [user, setUser] = useState([]);
  const [changeimg, setChangeImg] = useState("");
  const [changemyself, setChangeMySelf] = useState("");
  const [followcnt, setFollowCnt] = useState(0);
  const [image, setImage] = useState({
    image_file: "",
    preview_URL:
      "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png",
  });
  useEffect(() => {
    axios
      .get("/all/board")
      .then((V) => {
        setBoardList(V.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [setBoardList]);

  useEffect(() => {
    const data = { id: user_id };
    axios
      .get("/get/user", { params: data })
      .then((V) => {
        setUser(V.data);
        setImage({
          image_file: V.data.userimgurl,
        });
        setChangeImg(V.data.userimgurl);
        if (V.data.follower) {
          const cnt = V.data.follower.split(",");
          setFollowCnt(cnt.length);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, [user_id]);

  const userImgSubmit = async () => {
    try {
      const formData = new FormData();
      formData.append("id", user_id);
      formData.append("file", image.image_file);
      await axios.post("/update/userimgurl", formData);
      window.location.reload();
      alert("등록 성공👍");
      setChangeImg("");
    } catch (error) {
      console.log(error);
      alert("등록 실패🤢");
    }
  };

  const [state, setState] = useState(false);
  const mySelfInputOn = () => {
    setState(!state);
  };

  const MySelf = (e) => {
    setChangeMySelf(e.target.value);
  };

  const MySelfSubmit = async () => {
    try {
      const formData = new FormData();
      formData.append("id", user_id);
      formData.append("myself", changemyself);
      await axios.post("/update/usermyself", formData);
      window.location.reload();
      alert("등록 성공👍");
    } catch (error) {
      console.log(error);
      alert("등록 실패🤢");
      window.location.reload();
    }
  };

  return (
    <div className="myprofile-wrapper">
      <div className="myprofile-header">
        <div className="header-img">
          <MyProfileImageUploader
            setImage={setImage}
            preview_URL={image.preview_URL}
            img={image.image_file}
            user_id={user_id}
            login_id={login_id}
            changeimg={changeimg}
            userImgSubmit={userImgSubmit}
          />
          <span className="my-user-follow">
            {followcnt}명의 팔로워 보유중...
          </span>
        </div>
        <div className="myprofile-myself-1">
          <h3>안녕하세요!</h3>
          <h6>
            퍼스널 컬러가 {user.personalcolor}인 {user.username}님의 페이지
            입니다!
          </h6>
          <hr />
          {!state ? (
            <Button onClick={mySelfInputOn}>
              <EditIcon style={{ color: "black" }} />
            </Button>
          ) : null}
          {state ? (
            <div>
              <textarea
                className="text-area"
                placeholder="간단한 자기소개를 작성해주세요!"
                onChange={MySelf}
                cols="30"
                rows="10"
              ></textarea>
              <Button onClick={MySelfSubmit}>
                <AddCircleIcon style={{ color: "black" }} />
              </Button>
              <Button onClick={mySelfInputOn}>
                <CancelIcon style={{ color: "black" }} />
              </Button>
            </div>
          ) : null}
          {!state ? (
            <h6 className="myprofile-myself-2">
              {user.usermyself ? user.usermyself : "자기소개를 작성해 주세요!"}
            </h6>
          ) : null}
        </div>
      </div>
      <br />
      <br />
      <br />
      <h3>{user.username}'s Gallery</h3>
      <hr />
      <div className="myprofile-boardList-body">
        {BoardList.map((item) =>
          item.user_id === user.id ? (
            <ProfileCard
              key={item.id}
              date={moment(item.created_at).add(9, "hour").format("YYYY-MM-DD")}
              title={item.title}
              content={item.content}
              item_id={item.id}
              img_url={`http://i8c201.p.ssafy.io:3000/${item.imageUrl}`}
            />
          ) : null
        )}
      </div>
    </div>
  );
};

export default MyProfile;
