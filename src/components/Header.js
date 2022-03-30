import React, { Component } from "react";
import { Link } from "react-router-dom";
import "../styles/Header.css";

function Header(props) {
  function setTabMenu() {
    props.tabMenuChange(0);
  }

  return  (
    <div className="Header">
      <div className="Container">
        {/* <Link to="/signup">
          <div
            className="Container-Text"
            onClick={() => {
              setTabMenu();
            }}
          >
            회원가입
          </div>
        </Link> */}
        <Link to="/login">
          <div
            className="Container-Text"
            onClick={() => {
              setTabMenu(0);
            }}
          >
            로그인
          </div>
        </Link>
      </div>
      <Link to="/">
        <div className="Header-Text"> Findog</div>
      </Link>
    </div>
  );
}

export default Header;
