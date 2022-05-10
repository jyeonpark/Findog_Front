import React, { Component } from "react";
import OptionTab from "../components/OptionTab";
import { Fragment } from "react";
import { Link } from "react-router-dom";
import { BoardBox } from "../components/BoardBox";
import styled from "styled-components";

const BoardContainer = styled.div`
  padding-bottom: 100px;
`;

const BoardBody = styled.div`
  margin-top: 50px;
`;

export const Board = () => {
  const postId = 0;
  return (
    <BoardContainer>
      <Fragment>
        <OptionTab
          FilterVisibility
          WriteVisibility
          InterestText="관심 목록 보기"
        ></OptionTab>
      </Fragment>
      <BoardBody>
        <Link to={"/board/detail/" + postId} style={{ textDecoration: 'none', color:"black"}}>
          <BoardBox />
        </Link>
        <BoardBox />
        <BoardBox />
        <BoardBox />
        <BoardBox />
      </BoardBody>
    </BoardContainer>
  );
};

export default Board;
