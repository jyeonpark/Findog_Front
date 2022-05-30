import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import API from "./../utils/api";
import Pagination from "./Pagination";

function MyComment() {
  var size = 10;
  const [pageCount, setPageCount] = useState(0);
  const [page, setPage] = useState(1);
  const [checkedComments, setCheckedComments] = useState([]);
  const [comments, setComments] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    getMyComments(page, size);
  }, [page]);

  // 유기동물 리스트 조회하기
  const getMyComments = (page, size) => {
    var url = "/comments/mypage";

    console.log("null");
    API.get(url, {
      params: { page: page, size: size },
      headers: {
        "X-ACCESS-TOKEN": sessionStorage.getItem("userJWT"),
      },
    }).then((response) => {
      if (response.data.isSuccess) {
        const pageCriteria = response.data.result.pageCriteriaDto;
        const comments = response.data.result.commentList;

        console.log(response.data);
        setPageCount(pageCriteria.totalPage);
        setComments(comments);
      } else {
        console.log(response);
      }
    });
  };

  // 전체 체크 클릭 시 발생하는 함수
  const onCheckedAll = (checked) => {
    if (checked) {
      const checkedListArray = [];
      comments.forEach((item) => checkedListArray.push(item));
      setCheckedComments(checkedListArray);
    } else {
      setCheckedComments([]);
    }
  };

  // 개별 체크 클릭 시 발생하는 함수
  const onCheckedElement = (checked, item) => {
    if (checked) {
      setCheckedComments([...checkedComments, item]);
    } else if (!checked) {
      setCheckedComments(checkedComments.filter((el) => el !== item));
    }
  };

  // 댓글 삭제
  const onDelete = async () => {
    var length = checkedComments.length;
    var index = 0;
    try {
      for (const comment of checkedComments) {
        index++;
        console.log(comment);
        await API.delete("/comments" + "/" + comment.postId, {
          data: {
            // 서버에서 req.body.{} 로 확인할 수 있다.
            commentId: comment.commentId,
            userId: Number(sessionStorage.getItem("userID")),
          },
          headers: {
            "X-ACCESS-TOKEN": sessionStorage.getItem("userJWT"),
            "Content-Type": "application/json",
          },
        })
          .then((response) => {
            if (response.data.isSuccess) {
              if (index === length) {
                alert("댓글이 삭제되었습니다.");
                window.location.reload();
              }
              console.log(index);
            } else {
              alert("댓글 삭제에 실패하였습니다.");
              return;
            }
          })
          .catch((error) => {
            console.log(error.response);
          });
      }
    } catch (e) {
      console.log(e.response);
    }
  };

  // 게시물로 이동
  const onGoToBoard = (postId) => {
    navigate("/board/detail/" + postId, { state: { myBoard: true } });
  };

  return (
    <div style={{ marginTop: "100px", marginLeft: "20px" }}>
      {comments.map((item) => {
        return (
          <Container>
            <Checkbox
              type={"checkbox"}
              key={item.commentId}
              onChange={(e) => onCheckedElement(e.target.checked, item)}
              checked={checkedComments.includes(item) ? true : false}
            ></Checkbox>
            <Box onClick={() => onGoToBoard(item.postId)}>
              <Comment>{item.commentContent}</Comment>
              <Option>{item.date}</Option>
              <div style={{ display: "flex" }}>
                <Option>{item.postTitle}</Option>
                <Option style={{ color: "orange" }}>
                  [{item.postCommentCount}]
                </Option>
              </div>
            </Box>
          </Container>
        );
      })}

      <Divider></Divider>
      <BottomBox>
        <div style={{ display: "flex" }}>
          <Checkbox
            type={"checkbox"}
            style={{ marginRight: "7px" }}
            onChange={(e) => onCheckedAll(e.target.checked)}
            checked={
              checkedComments.length === 0
                ? false
                : checkedComments.length === comments.length
                ? true
                : false
            }
          ></Checkbox>
          <div style={{ fontSize: "0.8rem", marginTop: "5px" }}>전체선택</div>
        </div>
        <Button onClick={() => onDelete()}>삭제</Button>
      </BottomBox>

      {comments.length !== 0 && (
        <footer>
          <Pagination total={pageCount} page={page} setPage={setPage} />
        </footer>
      )}
    </div>
  );
}

export default MyComment;

const Container = styled.div`
  width: 50vw;
  position: relative;
  text-align: start;
  display: flex;
  margin-bottom: 30px;
`;

const Box = styled.div`
  cursor: pointer;
  width: 50%;
  text-align: start;
`;

const Comment = styled.div`
  font-size: 1em;
  padding: 2px;
`;

const Option = styled.div`
  font-size: 0.8em;
  padding: 2px;
`;

const Checkbox = styled.input`
  width: 15px;
  height: 15px;
  margin-top: 7px;
  margin-right: 20px;
`;

const Divider = styled.div`
  width: 100%;
  height: 1px;
  margin-top: 20px;
  margin-bottom: 20px;
  background-color: rgb(0, 0, 0, 0.1);
`;

const BottomBox = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Button = styled.button`
  font-size: 0.7em;
  font-weight: bold;
  padding-left: 10px;
  padding-right: 10px;
  margin-left: 10px;
  background-color: white;
  border: 1px solid rgba(64, 64, 64, 0.5);
`;
