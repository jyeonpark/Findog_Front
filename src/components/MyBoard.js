import React, {useState} from "react";
import { Board } from "./../pages/Board";
import styled from "styled-components";

const Title = styled.div`
  margin-top: 50px;
  font-weight: 700;
  margin-bottom: 30px;
`;

const Divider = styled.div`
  width: 100%;
  height: 1px;
  background-color: rgba(255, 164, 91, 0.1);
  margin-top: 50px;
  margin-bottom: 50px;
`;

function MyBoard() {
  const [isEmpty, setIsEmpty]= useState(false);
  const Notice = () => {
    setIsEmpty(true);
  }
  return (
    <div style={{ marginLeft: "5vw" }}>
      <Title> 내가 작성한 글</Title>
      <Divider></Divider>
      <Board myBoard={true} Notice={Notice}></Board>
      {isEmpty && 
      <div style={{fontSize:"5px"}}>내가 작성한 글이 없습니다.</div>}
    </div>
  );
}

export default MyBoard;
