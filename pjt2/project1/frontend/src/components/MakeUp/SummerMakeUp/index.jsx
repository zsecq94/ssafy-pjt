import React from "react";
import a from "../images/0_7.jpg";
import b from "../images/0_8.jpg";
import c from "../images/0_9.jpg";
import d from "../images/0_10.jpg";
import e from "../images/0_11.jpg";
import f from "../images/0_12.jpg";
import "./summermakeup.scss";

const SummerMakeUp = ({ user, setMakeupimage }) => {
  const go = (num, img) => {
    setMakeupimage({
      image_file: num,
      preview_URL: img,
    });
  };
  return (
    <div className="summer">
      <h2>{user.username}님의 PC는 Cool Summer입니다.</h2>
      <br />
      <h4> Cool Summer톤의 대표 연예인은 김태리와 손예진 입니다.</h4>
      <br />
      <h4>해보고 싶은 화장 스타일을 선택해주세요!!</h4>
      <br />
      <br />
      <img
        onClick={() => {
          go("7", a);
        }}
        src={a}
        alt=""
      />
      <img
        onClick={() => {
          go("8", b);
        }}
        src={b}
        alt=""
      />
      <img
        onClick={() => {
          go("9", c);
        }}
        src={c}
        alt=""
      />
      <img
        onClick={() => {
          go("10", d);
        }}
        src={d}
        alt=""
      />
      <img
        onClick={() => {
          go("11", e);
        }}
        src={e}
        alt=""
      />
      <img
        onClick={() => {
          go("12", f);
        }}
        src={f}
        alt=""
      />
      <h4>이미지 출처 : 핀터레스트</h4>
    </div>
  );
};

export default SummerMakeUp;
