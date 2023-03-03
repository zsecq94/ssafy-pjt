import React from "react";
import a from "../images/0_19.jpg";
import b from "../images/0_20.jpg";
import c from "../images/0_21.jpg";
import d from "../images/0_22.jpg";
import e from "../images/0_23.jpg";
import f from "../images/0_24.jpg";
import "./wintermakeup.scss";

const WinterMakeUp = ({ user, setMakeupimage }) => {
  const go = (num, img) => {
    setMakeupimage({
      image_file: num,
      preview_URL: img,
    });
  };
  return (
    <div className="winter">
      <div>
        <h2>{user.username}님의 PC는 Cool Winter입니다.</h2>
        <br />
        <h4> Cool Winter톤의 대표 연예인은 선미와 현아 입니다.</h4>
        <br />
        <h4>해보고 싶은 화장 스타일을 선택해주세요!!</h4>
        <br />
        <br />
        <img
          onClick={() => {
            go("19", a);
          }}
          src={a}
          alt=""
        />
        <img
          onClick={() => {
            go("20", b);
          }}
          src={b}
          alt=""
        />
        <img
          onClick={() => {
            go("21", c);
          }}
          src={c}
          alt=""
        />
        <img
          onClick={() => {
            go("22", d);
          }}
          src={d}
          alt=""
        />
        <img
          onClick={() => {
            go("23", e);
          }}
          src={e}
          alt=""
        />
        <img
          onClick={() => {
            go("24", f);
          }}
          src={f}
          alt=""
        />
        <h4>이미지 출처 : 핀터레스트</h4>
      </div>
    </div>
  );
};

export default WinterMakeUp;
