import React, { Component, useState, useEffect } from "react";
import { Fragment } from "react";
import OptionTab from "../components/OptionTab";
import { Link } from "react-router-dom";
import { BoardBox } from "../components/BoardBox";
import styled from "styled-components";
import API from "../utils/api";
import Pagination from "./../components/Pagination";

const BoardContainer = styled.div`
  padding-bottom: 100px;
`;

const BoardBody = styled.div`
  margin-top: 50px;
`;

export const Board = () => {
  const postId = 92;
  var size = 5;
  const [postCount, setPostCount] = useState(0);
  const [page, setPage] = useState(1);

  useEffect(() => {
    API.get("/boards/count").then((response) => {
      if (response.data.isSuccess) {
        console.log(response.data.result);
        setPostCount(response.data.result);
      } else {
        alert("인터넷 연결에 실패했습니다.");
      }
    });
  }, []);

  console.log("현재 페이지",page);

  return (
    <div>
      <BoardContainer>
        <Fragment>
          <OptionTab
            FilterVisibility
            WriteVisibility
            InterestText="관심 목록 보기"
          ></OptionTab>
        </Fragment>
        <BoardBody>
          <Link
            to={"/board/detail/" + postId}
            style={{ textDecoration: "none", color: "black" }}
          >
            <BoardBox />
          </Link>
        </BoardBody>
      </BoardContainer>

      <footer>
        <Pagination
          total={postCount}
          page={page}
          setPage={setPage}
        />
      </footer>
    </div>
  );
};

export default Board;
