
import {tab} from "@testing-library/user-event/dist/tab";
import React, { Component, useEffect, useState } from "react";
import "../styles/Tab.css";
import AbandonedAnimal from "../pages/AbandonedAnimal";
import Board from "../pages/Board";
import CenterMap from "../pages/CenterMap";
import MyPage from "../pages/MyPage";
import classNames from "classnames";
import SignUp from "../pages/SignUp";
import {Link} from "react-router-dom";


function Tab(props) {

  const [menu, setMenu] = useState(0);

  useEffect(() => {
    console.log("useeffect", props.tabMenu);
    setMenu(props.tabMenu);
  }, [props.tabMenu]);

  const setTabMenu = (menu) => {
    props.tabMenuChange(menu);
  };

  return (
    <div className="Tab-Wrap">
      <div className="Tab-Bar">
        <ul className="Tab">
          <Link to="/">
            <li
              className={classNames(Tab, `${menu === 1 ? "active" : ""}`)}
              onClick={() => {
                setMenu(() => 1);
                setTabMenu(1);
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
                setTabMenu(2);
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
                setTabMenu(3);
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
                setTabMenu(4);
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
