import React, {
  Fragment,
  useState,
  useEffect,
  useCallback,
  useRef,
  ReactText,
} from "react";
import API from "./../utils/api";
import styled from "styled-components";

const Container = styled.div`
  width: 1000px;
  height: fit-content;
  margin-top: 100px;
  margin-bottom: 100px;
  margin-left: auto;
  margin-right: auto;
  border: 1px solid lightgray;
  border-radius: 3px;
  display: flex;
`;

const CommentInput = styled.textarea`
  width: 800px;
  line-height: 40px;
  border: none;
  size: 10;
  word-break: break-all;
  resize: none;
  :focus {
    outline: none;
  }
`;

const Btn = styled.button`
  width: 200px;
  font-size: 20px;
  color: white;
  font-weight: bold;
  border: none;
  cursor: pointer;
  background-color: orange;
`;

const Count = styled.div`
  margin-top: 60px;
  margin-right: 10px;
`;

export const CommentWrite = ({ parentCommentId, postId }) => {
  const [commentInput, setCommentInput] = useState("");
  const [textAreaCount, setTextAreaCount] = React.useState(0);

  const onInputChange = (e) => {
    setCommentInput(e.currentTarget.value);
    if (e.target.value.length > 200) {
    }
    setTextAreaCount(e.target.value.length);
  };

  const onSubmit = async () => {
    try {
      let data = {
        parentCommentId: parentCommentId,
        postId: Number(postId),
        content: commentInput,
      };
      await API.post("/comments", JSON.stringify(data), {
        headers: {
          "X-ACCESS-TOKEN": sessionStorage.getItem("userJWT"),
          "Content-Type": "application/json",
        },
      })
        .then((response) => {
          if (response.data.isSuccess) {
            alert("댓글이 등록되었습니다.");
            window.location.reload();
          } else {
            alert("댓글 등록에 실패했습니다.");
          }
        })
        .catch((error) => {
          console.log(error.response);
        });
    } catch (e) {
      console.log(e.response);
    }
  };

  return (
    <Container>
      <CommentInput
        placeholder="댓글을 입력해주세요."
        onChange={onInputChange}
        value={commentInput}
        maxLength={200}
      ></CommentInput>
      <Count>
        <span>{textAreaCount}</span>/200
      </Count>
      <Btn onClick={onSubmit}>등록</Btn>
    </Container>
  );
};
