import React, { Component, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const TabBar = styled.div`
  background: transparent;
  width: 20%;
  margin-bottom: 1rem;
  white-space: nowrap;
  margin-top: 80px;
`;

const TabUl = styled.ul``;

const TabLi = styled.div`
  font-size: 1rem;
  font-weight: 300;
  color: black;
  width: 80%;
  padding-top: 1rem;
  padding-bottom: 1rem;
  border-width: 1px;
  border-style: solid;
  border-color: rgb(0, 0, 0, 0.1);
  cursor: pointer;
  text-align: center;

  &.active {
    background-color: rgb(243, 156, 18, 0.2);
  }
`;

function MyPageTab() {
  const [menu, setMenu] = useState(1);

  return (
    <TabBar>
      <TabUl>
        <Link to="my_board">
          <TabLi
            className={menu === 1 ? "active" : ""}
            onClick={() => {
              setMenu(() => 1);
            }}
          >
            내가 작성한 글
          </TabLi>
        </Link>
        <Link to="my_comment">
          <TabLi
            className={menu === 2 ? "active" : ""}
            onClick={() => {
              setMenu(() => 2);
            }}
          >
            내가 작성한 댓글
          </TabLi>
        </Link>
        <Link to="my_interested_animal">
          <TabLi
            className={menu === 3 ? "active" : ""}
            onClick={() => {
              setMenu(() => 3);
            }}
          >
            관심있는 동물
          </TabLi>
        </Link>
        <Link to="my_interested_board">
          <TabLi
            className={menu === 4 ? "active" : ""}
            onClick={() => {
              setMenu(() => 4);
            }}
          >
            관심있는 글
          </TabLi>
        </Link>
        <Link to="edit_info">
          <TabLi
            className={menu === 5 ? "active" : ""}
            onClick={() => {
              setMenu(() => 5);
            }}
          >
            내 정보 수정
          </TabLi>
        </Link>
      </TabUl>
    </TabBar>
  );
}

export default MyPageTab;
