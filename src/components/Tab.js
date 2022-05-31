import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const TabBar = styled.div`
  width: fit-content;
  margin-left: auto;
  margin-right: auto;
  white-space: nowrap;
`;

const TabUl = styled.ul`
  `;

const TabLi = styled.div`
  font-size: 1.2vw;
  display: inline-block;
  color: black;
  margin-right: 2.5vw;
  width: fit-content;

  @media screen and (max-width: 650px) {
    font-size: 2vw;
  }


  &.active {
    color: rgb(255, 164, 91);
    font-weight: bold;
  }
`;

function Tab(props) {
  const [menu, setMenu] = useState(props.tabMenu);

  useEffect(() => {
    setMenu(props.tabMenu);
  }, [props.tabMenu]);

  const setTabMenu = (menu) => {
    props.tabMenuChange(menu);
  };

  return (
    <div className="Tab-Wrap">
      <TabBar>
        <TabUl>
          <Link to="/">
            <TabLi
              className={menu === 1 ? "active" : ""}
              onClick={() => {
                setMenu(() => 1);
                setTabMenu(1);
              }}
            >
              유기동물
            </TabLi>
          </Link>
          <Link to="/board">
            <TabLi
              className={menu === 2 ? "active" : ""}
              onClick={() => {
                setMenu(() => 2);
                setTabMenu(2);
              }}
            >
              게시판
            </TabLi>
          </Link>
          <Link to="/centermap">
            <TabLi
              className={menu === 3 ? "active" : ""}
              onClick={() => {
                setMenu(() => 3);
                setTabMenu(3);
              }}
            >
              유기센터
            </TabLi>
          </Link>
          <Link to="/mypage">
            <TabLi
              className={menu === 4 ? "active" : ""}
              onClick={() => {
                setMenu(() => 4);
                setTabMenu(4);
              }}
            >
              마이페이지
            </TabLi>
          </Link>
        </TabUl>
      </TabBar>
    </div>
  );
}

export default Tab;
