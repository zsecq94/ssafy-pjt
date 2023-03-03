import React from "react";
import a from "../images/0_13.jpg";
import b from "../images/0_14.jpg";
import c from "../images/0_15.jpg";
import d from "../images/0_16.jpg";
import e from "../images/0_17.jpg";
import f from "../images/0_18.jpg";
import "./autumnmakeup.scss";

const AutumnMakeUp = ({ user, setMakeupimage }) => {
  const go = (num, img) => {
    setMakeupimage({
      image_file: num,
      preview_URL: img,
    });
  };
  return (
    <div className="autumn">
      <h2>{user.username}님의 PC는 Warm Autumn입니다.</h2>
      <br />
      <h4> Warm Autumn톤의 대표 연예인은 이성경과 제니 입니다.</h4>
      <br />
      <h4>해보고 싶은 화장 스타일을 선택해주세요!!</h4>
      <br />
      <br />
      <img
        onClick={() => {
          go("13", a);
        }}
        src={a}
        alt=""
      />
      <img
        onClick={() => {
          go("14", b);
        }}
        src={b}
        alt=""
      />
      <img
        onClick={() => {
          go("15", c);
        }}
        src={c}
        alt=""
      />
      <img
        onClick={() => {
          go("16", d);
        }}
        src={d}
        alt=""
      />
      <img
        onClick={() => {
          go("17", e);
        }}
        src={e}
        alt=""
      />
      <img
        onClick={() => {
          go("18", f);
        }}
        src={f}
        alt=""
      />
      <h4>이미지 출처 : 핀터레스트</h4>
    </div>
  );
};

export default AutumnMakeUp;
<h2>Autumn</h2>;
