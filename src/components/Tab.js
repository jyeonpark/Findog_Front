import React, { Component, useEffect, useState } from "react";
import classNames from "classnames";
import { Link } from "react-router-dom";
import styled from "styled-components";

const TabBar = styled.div`
  background: transparent;
  width: 100%;
  margin-bottom: 1rem;
  text-align: center;
  white-space: nowrap;
  margin-top: 80px;
`;

const TabUl = styled.ul``;

const TabLi = styled.div`
  font-size: 1rem;
  font-weight: 300;
  display: inline-block;
  color: black;
  padding: 1rem;
  margin-left: 50px;
  margin-right: 50px;
  border-top: 5px;
  border-top-style: solid;
  border-top-color: rgba(243, 156, 18, 0.22);

  &.active {
    width: fit-content;
    height: 100%;
    border-top: 5px;
    border-top-style: solid;
    border-top-color: rgb(243, 156, 18);
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
