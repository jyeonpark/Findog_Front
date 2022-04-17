import React, { Component } from "react";
import styled from "styled-components";
import { BoardBox } from "../components/BoardBox";

const Title = styled.div`
  margin-top: 100px;
  font-weight: 700;
  margin-bottom: 30px;
`;

const Divider = styled.div`
  width: 100%;
  height: 1px;
  background-color: rgb(0, 0, 0, 0.1);
  margin-bottom: 50px;
`;

const Container = styled.div`
  width: 900px;
  height: fit-content;
  padding-left: 50px;
  padding-right: 50px;
  margin-bottom: 100px;
`;

function MyBoard() {
  return (
    <div>
      <Title> 내가 작성한 글</Title>
      <Divider></Divider>
      <Container>
        <BoardBox />
        <BoardBox />
        <BoardBox />
        <BoardBox />
        <BoardBox />
      </Container>
    </div>
  );
}

export default MyBoard;