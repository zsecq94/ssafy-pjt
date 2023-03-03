import React, { useEffect, useState } from "react";
import "./userprofile.scss";
import axios from "axios";
import ProfileCard from "../../components/ProfileCard/index";
import moment from "moment";
import { useParams } from "react-router-dom";
import MyProfileImageUploader from "../../components/MyProfileImageUploader";
import { Button } from "@mui/material";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import EditIcon from "@mui/icons-material/Edit";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import CancelIcon from "@mui/icons-material/Cancel";

const MyProfile = () => {
  const { user_id } = useParams();
  const login_id = JSON.parse(localStorage.getItem("userid"));
  const [BoardList, setBoardList] = useState([]);
  const [user, setUser] = useState({});
  const [changemyself, setChangeMySelf] = useState("");
  const [changeimg, setChangeImg] = useState("");
  const [image, setImage] = useState({
    image_file: "",
    preview_URL:
      "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png",
  });

  useEffect(() => {
    axios
      .get("/all/board")
      .then((V) => {
        // console.log(V.data);
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

        if (V.data.userimgurl === "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png") {
        setImage({
          image_file: V.data.userimgurl,
        });
        setChangeImg(V.data.userimgurl);
        } else {
          setImage({
            image_file: `http://i8c201.p.ssafy.io:3000/${V.data.userimgurl}`,
          });
          setChangeImg(`http://i8c201.p.ssafy.io:3000/${V.data.userimgurl}`);
        }
        
        if (V.data.follower) {
          const data = V.data.follower.split(",");
          setFollowCnt(data.length);
          setFollowLst(data);
          data.forEach((V) => {
            if (Number(V) === login_id) {
              setFollowCheck(true);
            }
          });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, [login_id, user_id]);

  const userImgSubmit = async () => {
    try {
      const formData = new FormData();
      formData.append("id", user_id);
      formData.append("file", image.image_file);
      await axios.post("/update/userimgurl", formData);
      window.location.reload();
      alert("등록 성공👍");
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
    // console.log(changemyself);
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

  const [followcnt, setFollowCnt] = useState(0);
  const [followlst, setFollowLst] = useState([]);
  const [followcheck, setFollowCheck] = useState(false);

  const FollowHandle = () => {
    if (!followcheck) {
      setFollowCnt(followcnt + 1);
      setFollowCheck(true);
      if (followlst.includes(login_id) === false) {
        followlst.push(String(login_id));
        // console.log(followlst);
      }
      const result = followlst.toString();
      const formData = new FormData();
      formData.append("id", user_id);
      formData.append("follower", result);
      axios.post("/update/follower", formData);
    } else {
      setFollowCnt(followcnt - 1);
      setFollowCheck(false);
      const arr = [];
      followlst.map((V) => {
        if (V !== String(login_id)) {
          arr.push(V);
        }
      });
      // console.log(arr);
      setFollowLst(arr);
      const result1 = arr.toString();
      const formData = new FormData();
      formData.append("id", user_id);
      formData.append("follower", result1);
      axios.post("/update/follower", formData);
    }
  };

  return (
    <div className="user-profile-wrapper">
      <div className="user-profile-header">
        <div className="user-header-img">
          <MyProfileImageUploader
            setImage={setImage}
            preview_URL={image.preview_URL}
            img={image.image_file}
            user_id={user_id}
            login_id={login_id}
            changeimg={changeimg}
            userImgSubmit={userImgSubmit}
          />
          {login_id === Number(user_id) ? null : !followcheck ? (
            <div className="user-follow">
              <Button onClick={FollowHandle}>
                <FavoriteBorderIcon fontSize="large" />
              </Button>
            </div>
          ) : (
            <div>
              <Button onClick={FollowHandle}>
                <FavoriteIcon fontSize="large" />
              </Button>
            </div>
          )}
          <span className="user-follow">+{followcnt} 명이 팔로우 중...</span>
        </div>
        <div className="user-profile-myself">
          <h3>안녕하세요!</h3>
          <h6 className="user-profile-myself-1">
            퍼스널 컬러가 {user.personalcolor}인 {user.username}님의 페이지
            입니다!
          </h6>
          <hr />
          {!state && Number(login_id) === Number(user_id) ? (
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
              <br />
              <Button onClick={MySelfSubmit}>
                <AddCircleIcon style={{ color: "black" }} />
              </Button>
              <Button onClick={mySelfInputOn}>
                <CancelIcon style={{ color: "black" }} />
              </Button>
            </div>
          ) : null}
          {!state ? (
            <h6 className="user-profile-myself-2">
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
      <div className="user-profile-boardList-body">
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
