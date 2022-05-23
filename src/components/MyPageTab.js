import React, { useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const TabBar = styled.div`
  background: transparent;
  width: max-content;
  margin-bottom: 1rem;
  white-space: nowrap;
  margin-top: 80px;
  padding-right: 50px;
`;

const TabUl = styled.ul``;

const TabLi = styled.div`
  font-size: 1rem;
  font-weight: 300;
  white-space: nowrap;
  color: black;
  padding-top: 1rem;
  padding-left: 10px;
  padding-right: 10px;
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

const TabLink = styled(Link)`
  text-decoration: none;

  &:focus,
  &:hover,
  &:visited,
  &:link,
  &:active {
    text-decoration: none;
  }
`;

function MyPageTab() {
  const currentTab = () => {
    let path = window.location.pathname;

    if (path === "/mypage/my_comment") return 2;
    else if (path === "/mypage/my_interested_animal") return 3;
    else if (path === "/mypage/my_interested_board") return 4;
    else if (path === "/mypage/edit_info") return 5;
    else if (path.includes("/mypage")) return 1;
  };

  const [menu, setMenu] = useState(currentTab);

  return (
    <TabBar>
      <TabUl>
        <TabLink to="">
          <TabLi
            className={menu === 1 ? "active" : ""}
            onClick={() => {
              setMenu(() => 1);
            }}
          >
            내가 작성한 글
          </TabLi>
        </TabLink>
        <TabLink to="my_comment">
          <TabLi
            className={menu === 2 ? "active" : ""}
            onClick={() => {
              setMenu(() => 2);
            }}
          >
            내가 작성한 댓글
          </TabLi>
        </TabLink>
        <TabLink to="my_interested_animal">
          <TabLi
            className={menu === 3 ? "active" : ""}
            onClick={() => {
              setMenu(() => 3);
            }}
          >
            관심있는 동물
          </TabLi>
        </TabLink>
        <TabLink to="my_interested_board">
          <TabLi
            className={menu === 4 ? "active" : ""}
            onClick={() => {
              setMenu(() => 4);
            }}
          >
            관심있는 글
          </TabLi>
        </TabLink>
        <TabLink to="edit_info">
          <TabLi
            className={menu === 5 ? "active" : ""}
            onClick={() => {
              setMenu(() => 5);
            }}
          >
            내 정보 수정
          </TabLi>
        </TabLink>
      </TabUl>
    </TabBar>
  );
}

export default MyPageTab;
