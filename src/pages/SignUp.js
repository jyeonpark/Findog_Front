import React, { Component } from "react";
import styles from "../styles/SignUp.scss";
import classNames from "classnames";
import { Link } from "react-router-dom";


function SignUp() {
  return (
    <div className="container">
      <div className="SignUp-header">회원가입</div>
      <div className="SignUp-boxContainer">
        <div>
          <div className="SignUp-box">
            <div className="SignUp-boxText">아이디(이메일)</div>
            <input className="SignUp-boxInput" />
            <div className="SignUp-duplicateBtn">중복확인</div>
          </div>
        </div>
        <div>
          <div className="SignUp-box">
            <div className="SignUp-boxText">닉네임</div>
            <input className="SignUp-boxInput" />
            <div className="SignUp-duplicateBtn">중복확인</div>
          </div>
        </div>
        <div>
          <div className="SignUp-box">
            <div className="SignUp-boxText">비밀번호</div>
            <input className="SignUp-boxInput" />
          </div>
        </div>
        <div>
          <div className="SignUp-box">
            <div className="SignUp-boxText">비밀번호 확인</div>
            <input className="SignUp-boxInput" />
          </div>
        </div>
        <div>
          <div className="SignUp-box">
            <div className="SignUp-boxText">연락처</div>
            <input className="SignUp-boxInput" />
          </div>
        </div>
        <div>
          <div className="SignUp-profile">
            <div className="SignUp-profileText">프로필사진</div>
            <div className="SignUp-profileImageWrap">
              <img
                className="SignUp-profileImage"
                src="/public/images/profileImage.png"
              ></img>
            </div>
          </div>
        </div>
      </div>

      <div className="SignUp-Btn-Wrap">
        <Link to="/login">
          <span className="SignUp-Btn">
            <button className={classNames("SignUp-Btn", "cancel")}>취소</button>
          </span>
        </Link>

        <span className="SignUp-Btn">
          <button className={classNames("SignUp-Btn", "signUp")}>
            회원가입
          </button>
        </span>
      </div>
    </div>
  );
}

export default SignUp;
