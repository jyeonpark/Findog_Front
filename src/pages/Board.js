import React, { useState, useEffect } from "react";
import { Fragment } from "react";
import OptionTab from "../components/BoardOptionTab";
import { BoardBox } from "../components/BoardBox";
import styled from "styled-components";
import API from "../utils/api";
import Pagination from "./../components/Pagination";

const BoardContainer = styled.div``;

const BoardBody = styled.div`
  width: ${(props) => (props.myBoard ? "" : "90vw;")};
  margin-left: ${(props) => (props.myBoard  ? "" : "5vw;")};
  margin-right: ${(props) => (props.myBoard? "" : "5vw;")};
  margin-top: ${(props) => (props.myBoard ? "" : "50;")};
`;

export const Board = ({ myBoard, myInterestedBoard }) => {
  const size = 5;
  const [pageCount, setPageCount] = useState(0);
  const [page, setPage] = useState(1);
  const [data, setData] = useState([]);
  const [inputs, setInputs] = useState({});

  const setOptions = (inputs) => {
    setInputs(inputs);
    setPage(1);
  };

  useEffect(() => {
    console.log("inputs 바뀜", inputs);

    var url = "";
    if (myBoard === true) {
      url = "/mypage/board/count";
    } else if (myInterestedBoard === true) {
      url = "/mypage/like/count";
    } else {
      url = "/boards/count";
    }
    API.get(url, {
      params: inputs,
      headers: {
        "X-ACCESS-TOKEN": sessionStorage.getItem("userJWT"),
      },
    }).then((response) => {
      if (response.data.isSuccess) {
        console.log(response.data.result);
        const lastPage = Math.ceil(response.data.result / size);
        setPageCount(lastPage ? lastPage : 0);
      } else {
        console.log("페이지 개수 받아오기 실패");
        console.log(response.data);
      }
    });

    if (page === 1) {
      console.log("검색필터링 첫번째 페이지");
      var url = "/boards/search";
      getBoardsByPage(url);
    }
  }, [inputs]);

  useEffect(() => {
    if (inputs.constructor === Object && Object.keys(inputs).length === 0) {
      // 필터링 안할 때
      var url = "";
      if (myBoard === true) {
        url = "/mypage/board";
      } else if (myInterestedBoard === true) {
        url = "/mypage/like";
      } else {
        url = "/boards";
      }
      getBoardsByPage(url);
    } else {
      // 필터링 할 때
      // page 1 일때는 pagecount useeffect 에서 호출됨
      console.log("새로운 검색");
      var url = "/boards/search";
      getBoardsByPage(url);
    }
  }, [page]);

  const getBoardsByPage = (url) => {
    const params = Object.assign({},inputs);
    params.page = page;
    params.size = size;
    

    console.log("새로운 페이지 요청 params", params);

    API.get(url, {
      params,
      headers: {
        "X-ACCESS-TOKEN": sessionStorage.getItem("userJWT"),
      },
    }).then((response) => {
      if (response.data.isSuccess) {
        console.log("새로운 페이지 요청 결과", response.data.result);
        setData(response.data.result);
      } else {
        alert("인터넷 연결에 실패했습니다.");
      }
    });
  };

  return (
    <div>
      <BoardContainer>
        {myBoard === false && myInterestedBoard === false && (
          <Fragment>
            <OptionTab
              FilterVisibility
              WriteVisibility
              setOptions={setOptions}
            ></OptionTab>
          </Fragment>
        )}
        <BoardBody myBoard={myBoard} >
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
      {data.length !== 0 && (
        <footer>
          <Pagination total={pageCount} page={page} setPage={setPage} />
        </footer>
      )}
    </div>
  );
};

export default Board;

Board.defaultProps = {
  myBoard: false,
  myInterestedBoard: false,
};
