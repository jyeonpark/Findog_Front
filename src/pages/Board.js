import React, { Component, useState, useEffect } from "react";
import { Fragment } from "react";
import OptionTab from "../components/OptionTab";
import { BoardBox } from "../components/BoardBox";
import styled from "styled-components";
import API from "../utils/api";
import Pagination from "./../components/Pagination";

const BoardContainer = styled.div``;

const BoardBody = styled.div`
  margin-top: 50px;
`;

export const Board = ({ myBoard, myInterestedBoard }) => {
  const size = 5;
  const [pageCount, setPageCount] = useState(0);
  const [page, setPage] = useState(1);
  const [data, setData] = useState([]);

  useEffect(() => {
    var url = "";
    if (myBoard === true) {
      url = "/mypage/board/count";
    } else if (myInterestedBoard === true) {
      url = "/mypage/like/count";
    } else {
      url = "/boards/count";
    }
    API.get(url, {
      headers: {
        "X-ACCESS-TOKEN": sessionStorage.getItem("userJWT"),
      },
    }).then((response) => {
      if (response.data.isSuccess) {
        console.log(response.data.result);
        const lastPage = Math.ceil(response.data.result / size);
        setPageCount(lastPage ? lastPage : 1);
        console.log("페이지개수", lastPage);
      } else {
        console.log("페이지 개수 받아오기 실패");
        console.log(response.data);
      }
    });
  }, []);

  useEffect(() => {
    console.log("useeffect 페이지바뀜", page);
    var url = "";
    if (myBoard === true) {
      url = "/mypage/board";
    } else if (myInterestedBoard === true) {
      url = "/mypage/like";
    } else {
      url = "/boards";
    }
    API.get(url, {
      params: { page: page, size: size },
      headers: {
        "X-ACCESS-TOKEN": sessionStorage.getItem("userJWT"),
      },
    }).then((response) => {
      if (response.data.isSuccess) {
        console.log(response.data.result);
        setData(response.data.result);
      } else {
        alert("인터넷 연결에 실패했습니다.");
      }
    });
  }, [page]);

  return (
    <div>
      <BoardContainer>
        {(myBoard === false && myInterestedBoard === false)&& (
          <Fragment>
            <OptionTab
              FilterVisibility
              WriteVisibility
              InterestText="관심 목록 보기"
            ></OptionTab>
          </Fragment>
        )}
        <BoardBody>
          {data.map((item) => {
            return (
              <div>
                <BoardBox
                  item={item}
                  key={item.postId}
                  myBoard={myBoard}
                ></BoardBox>
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

Board.defaultProps = {
  myBoard: false,
  myInterestedBoard: false,
};
