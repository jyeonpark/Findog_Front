import React, { Component } from "react";
import {BoardTab} from "../components/BoardTab";
import {BoardBox} from "../components/BoardBox";

export const Board = () => {
  return (
    <div>
      <BoardTab />
      <BoardBox />
    </div>
    
  );
}

export default Board;
