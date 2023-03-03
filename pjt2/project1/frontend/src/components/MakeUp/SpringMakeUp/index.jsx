import React from "react";
import a from "../images/0_1.jpg";
import b from "../images/0_2.jpg";
import c from "../images/0_3.jpg";
import d from "../images/0_4.jpg";
import e from "../images/0_5.jpg";
import f from "../images/0_6.jpg";
import "./springmakeup.scss";

const SpringMakeUp = ({ user, setMakeupimage }) => {
  const go = (num, img) => {
    setMakeupimage({
      image_file: num,
      preview_URL: img,
    });
  };

  return (
    <div className="spring">
      <h2>{user.username}님의 PC는 Warm Spring입니다.</h2>
      <br />
      <h4> Warm Spring톤의 대표 연예인은 아이유와 수지 입니다.</h4>
      <br />
      <h4>해보고 싶은 화장 스타일을 선택해주세요!!</h4>
      <br />
      <br />
      <img
        onClick={() => {
          go("1", a);
        }}
        src={a}
        alt=""
      />
      <img
        onClick={() => {
          go("2", b);
        }}
        src={b}
        alt=""
      />
      <img
        onClick={() => {
          go("3", c);
        }}
        src={c}
        alt=""
      />
      <img
        onClick={() => {
          go("4", d);
        }}
        src={d}
        alt=""
      />
      <img
        onClick={() => {
          go("5", e);
        }}
        src={e}
        alt=""
      />
      <img
        onClick={() => {
          go("6", f);
        }}
        src={f}
        alt=""
      />
      <h4>이미지 출처 : 핀터레스트</h4>
    </div>
  );
};

export default SpringMakeUp;
