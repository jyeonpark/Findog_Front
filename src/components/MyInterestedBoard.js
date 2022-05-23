import React from "react";
import styled from "styled-components";
import { Board } from './../pages/Board';

function MyInterestedBoard() {
  return (
    <div style={{marginTop:"100px", marginLeft:"100px"}}>
    <Board myInterestedBoard={true}></Board>
  </div>
  );
}

export default MyInterestedBoard;
