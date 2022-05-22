import React, { Component } from "react";
import styled from "styled-components";
import { BoardBox } from "../components/BoardBox";
import { Board } from './../pages/Board';


function MyBoard() {
  return (
    <div style={{marginTop:"100px", marginLeft:"100px"}}>
      <Board myBoard={true}></Board>
    </div>
  );
}

export default MyBoard;
