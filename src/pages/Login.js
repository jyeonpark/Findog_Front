import React, { Component } from "react";
import styles from "../styles/Login.module.css";
import { Link } from "react-router-dom";

function Login() {
  return (
    <div className={styles.container}>
      <div className={styles.header}>로그인</div>
      <div className={styles.boxContainer}>
        <div>
          <input className={styles.box} placeholder="아이디" />
        </div>
        <div>
          <input className={styles.box} placeholder="비밀번호" />
        </div>
      </div>
      <button className={styles.loginBtn}>로그인</button>
      <div className={styles.bottom}>
        <Link to="/signup">
          <span className={styles.signup} >회원가입</span>
        </Link>
        <div className={styles.bottomRight} >
          <div className={styles.idSearch}>아이디 찾기</div>
          <div>&nbsp;&nbsp;|&nbsp;&nbsp;</div>
          <div className={styles.pwSearch}>비밀번호 찾기</div>
        </div>
      </div>
    </div>
  );
}

export default Login;
