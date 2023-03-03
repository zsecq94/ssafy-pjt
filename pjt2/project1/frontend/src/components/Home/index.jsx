import "./Home.scss";
import { jwtUtils } from "../../utils/jwtUtils";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const Home = () => {
  const token = useSelector((state) => state.Auth.token);
  const [isAuth, setIsAuth] = useState(false);

  useEffect(() => {
    if (jwtUtils.isAuth(token)) {
      setIsAuth(true);
    } else {
      setIsAuth(false);
    }
  }, [token]);

  return (
    <>
      <div className="home-main-wrapper">
        <p></p>
        <p></p>
        <div className="home-main-title">
          <span>Personal Color</span>
        </div>
        <img className="question-mark" src="../questionmark.png" alt="" />
        <h2>퍼스널 컬러란?</h2>
        <div className="home-main-contents">
          사람의 피부톤과 가장 어울리는 색상을 찾는 색채학 이론입니다.
        </div>
        <div className="home-about-project">
          싸피 개발자가 직접 제작한 퍼스널컬러 진단 사이트! <br />
          머신러닝 학습 모델을 통해 퍼스널컬러를 진단해드립니다!
          <br />
        </div>
        <div className="home-my-website">
          <div className="home-my-website-title">Our Projects</div>
          <a href="https://lab.ssafy.com/s08-webmobile3-sub2/S08P12C201">
            🏴GitLab
          </a>
          <br />
          <br />
        </div>
        <br />

        {isAuth ? null : (
          <div>
            <p>
              화장품 추천, 패션 추천 등 다양한 정보를 얻고싶다면 로그인을
              해주세요!
            </p>
            <div className="home-go-login">
              <a href="/login">
                <span>로그인</span>
              </a>
            </div>
          </div>
        )}

        <p></p>
        <p></p>
        <p></p>
        <p></p>
        <p></p>
        <p></p>
        <p></p>
        <p></p>
        <p></p>
        <p></p>
      </div>
    </>
  );
};
export default Home;
