import React from "react";
import styled from "styled-components";
import { Board } from './../pages/Board';

function MyInterestedBoard() {
  return (
    <div style={{marginTop:"100px"}}>
    <Board myInterestedBoard={true} myBoard={true}></Board>
  </div>
  );
}

export default MyInterestedBoard;
