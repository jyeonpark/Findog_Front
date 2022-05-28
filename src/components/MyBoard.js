import React from "react";
import { Board } from './../pages/Board';


function MyBoard() {
  return (
    <div style={{marginTop:"100px"}}>
      <Board myBoard={true}></Board>
    </div>
  );
}

export default MyBoard;
