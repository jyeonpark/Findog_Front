import React, { Component } from "react";
import { Link } from "react-router-dom";
import "../styles/Header.css";


function Header() {
  return (
    <div className="Header">
      <div className="Container">
        <Link to="/signUp">
          <div className="Container-Text">회원가입</div>
        </Link>
        <Link to="/login">
          <div className="Container-Text">로그인</div>
        </Link>
      </div>
      <div className="Header-Text">Findog</div>
    </div>
  );
}

export default Header;
