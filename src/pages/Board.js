import React, { Component, useState, useEffect } from "react";
import { Fragment } from "react";
import OptionTab from "../components/OptionTab";
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
  const [pageCount, setPageCount] = useState(0);
  const [page, setPage] = useState(1);
  const [data, setData] = useState([]);

  useEffect(() => {
    API.get("/boards/count").then((response) => {
      if (response.data.isSuccess) {
        console.log(response.data.result);
        setPostCount(response.data.result);
        const lastPage = Math.ceil(response.data.result / size);
        setPageCount(lastPage ? lastPage : 1);
        console.log("페이지개수", lastPage);
      } else {
        alert("인터넷 연결에 실패했습니다.");
      }
    });
  }, []);

  useEffect(() => {
    console.log("useeffect 페이지바뀜", page);
    API.get("/boards", { params: { page: page, size: size } }).then(
      (response) => {
        if (response.data.isSuccess) {
          console.log(response.data.result);
          setData(response.data.result);
        } else {
          alert("인터넷 연결에 실패했습니다.");
        }
      }
    );
  }, [page]);

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
          {data.map((item) => {
            return (
              <div>
                <BoardBox item={item}></BoardBox>
              </div>
            );
          })}
        </BoardBody>
      </BoardContainer>

      <footer>
        <Pagination total={pageCount} page={page} setPage={setPage} />
      </footer>
    </div>
  );
};

export default Board;
