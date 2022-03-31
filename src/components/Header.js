import React, { Component } from "react";
import { Link } from "react-router-dom";
import "../styles/Header.css";

function Header(props) {
  function setTabMenu(menu) {
    console.log("settabmenu");
    console.log(menu);
    props.tabMenuChange(menu);
  }

  return (
    <div className="Header">
      <div className="Container">
        <Link to="/login">
          <div
            className="Container-Text"
            onClick={() => {
              setTabMenu(0);
            }}
          >
            {" "}
            로그인
          </div>
        </Link>
      </div>
      <Link to="/">
        <div
          className="Header-Text"
          onClick={() => {
            setTabMenu(1);
          }}
        >
          {" "}
          Findog
        </div>
      </Link>
    </div>
  );
}

export default Header;
