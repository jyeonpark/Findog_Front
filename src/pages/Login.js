import React, {Component} from "react";
import styles from "../styles/Login.module.css";

export const Login = () => {
    return (
            <div className={styles.container}>
                <div className={styles.header}>
                    로그인
                </div>
                <div className={styles.boxContainer}>
                    <div>
                        <input className={styles.box} placeholder="아이디"/>
                    </div>
                    <div>
                        <input className={styles.box} placeholder="비밀번호"/>
                    </div>
                </div>
                <button className={styles.loginBtn}>로그인</button>
                <div className={styles.one}>
                    <span className={styles.two}>회원가입</span>
                    <div>
                        <span className={styles.three}>아이디 찾기</span>
                        <span>|</span>
                        <span className={styles.four}>비밀번호 찾기</span>
                    </div>
                </div>
            </div>
    );
}

export default Login;
