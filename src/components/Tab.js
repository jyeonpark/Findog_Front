import React, { Component, useEffect, useState } from "react";
import "../styles/Tab.css";
import AbandonedAnimal from "../pages/AbandonedAnimal";
import Board from "../pages/Board";
import CenterMap from "../pages/CenterMap";
import MyPage from "../pages/MyPage";
import classNames from "classnames";

import { Link } from "react-router-dom";

function Tab(props) {
  const [menu, setMenu] = useState(0);

  useEffect(() => {
    if (props.tabMenu == 0){
      console.log("useeffect");
      console.log(props.tabMenu);
      console.log("\n");
      setMenu(props.tabMenu);
    }
  }, [props.tabMenu]);

  function setTabMenu() {
    console.log("tabmenuset");
    props.tabMenuChange(menu);
  }

  return (
    <div className="Tab-Wrap">
      <div className="Tab-Bar">
        <ul className="Tab">
          <Link to="/">
            <li
              className={classNames(Tab, `${menu === 1 ? "active" : ""}`)}
              onClick={() => {
                setMenu(() => 1);
                setTabMenu();
              }}
            >
              유기동물
            </li>
          </Link>
          <Link to="/board">
            <li
              className={classNames(Tab, `${menu === 2 ? "active" : ""}`)}
              onClick={() => {
                setMenu(() => 2);
                setTabMenu();
              }}
            >
              게시판
            </li>
          </Link>
          <Link to="*">
            <li
              className={classNames(Tab, `${menu === 3 ? "active" : ""}`)}
              onClick={() => {
                setMenu(() => 3);
                setTabMenu();
              }}
            >
              유기센터
            </li>
          </Link>
          <Link to="/mypage">
            <li
              className={classNames(Tab, `${menu === 4 ? "active" : ""}`)}
              onClick={() => {
                setMenu(() => 4);
                setTabMenu();
              }}
            >
              마이페이지
            </li>
          </Link>
        </ul>
      </div>
    </div>
  );
}

export default Tab;
