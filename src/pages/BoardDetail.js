import React, { Fragment } from "react";
import { useParams } from "react-router-dom";

import { BoardComment } from "../components/BoardComment";
import { BoardContent } from "../components/BoardContent";

import { useLocation } from "react-router-dom";

export const BoardDetail = () => {
  const location = useLocation();
  const myBoard = location.state.myBoard;
  let { postId } = useParams();

  return (
    <Fragment>
      <div>
        <BoardContent postId={postId} myBoard={myBoard} />
      </div>
      <div>
        <BoardComment postId={postId} />
      </div>
    </Fragment>
  );
};
