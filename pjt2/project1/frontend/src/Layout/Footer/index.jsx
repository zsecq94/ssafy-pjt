import "./footer.scss";
import * as React from "react";

const Footer = () => {
  return (
    <>
      <div className="footer-wrapper">
        <div className="footer-title">
          <span>My PC</span>
        </div>
        <div className="footer-contents">
          이 프로젝트는 Duckgugong의 서비스를 모티브로 작성했습니다.
        </div>
        <div className="my-website">
          <div className="my-website-title">Our Projects</div>
          <a href="https://lab.ssafy.com/s08-webmobile3-sub2/S08P12C201">
            🏴GitLab
          </a>
          <br />
        </div>
        <br />
      </div>
    </>
  );
};
export default Footer;
