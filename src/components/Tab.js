import {tab} from "@testing-library/user-event/dist/tab";
import React, {Component, useState} from "react";
import "../styles/Tab.css";
import AbandonedAnimal from "../pages/AbandonedAnimal";
import Board from "../pages/Board";
import CenterMap from "../pages/CenterMap";
import MyPage from "../pages/MyPage";
import classNames from "classnames";
import SignUp from "../pages/SignUp";
import {Link} from "react-router-dom";


// const tabMenuList = {
//   0: <AbandonedAnimal />,
//   1: <Board />,
//   2: <CenterMap />,
//   3: <MyPage />,
// };

function Tab(props) {
    const [menu, setMenu] = useState(0);
    // const [tabVisible, setTabVisibility] = useState(props.name === "회원가입" ? false
    // : true);

  return (
    <div className="Tab-Wrap">
      <div className="Tab-Bar">
        <ul className="Tab">
          <Link to="/">
            <li
              className={classNames(Tab, `${menu === 0 ? "active" : ""}`)}
              onClick={() => {
                setMenu(0);
              }}
            >
              유기동물
            </li>
          </Link>
          <Link to="/login">
            <li
              className={classNames(Tab, `${menu === 1 ? "active" : ""}`)}
              onClick={() => setMenu(1)}
            >
              게시판
            </li>
          </Link>
          <Link to="/signUp">
            <li
              className={classNames(Tab, `${menu === 2 ? "active" : ""}`)}
              onClick={() => setMenu(2)}
            >
              유기센터
            </li>
          </Link>
          <li
            className={classNames(Tab, `${menu === 3 ? "active" : ""}`)}
            onClick={() => setMenu(3)}
          >
            마이페이지
          </li>
        </ul>
      </div>
      {/* <div className="Tab-Content">{tabMenuList[menu]}</div> */}
    </div>
  );
}

export default Tab;
