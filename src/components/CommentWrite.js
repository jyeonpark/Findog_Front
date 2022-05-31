import React, { useState } from "react";
import API from "./../utils/api";
import styled from "styled-components";

const Container = styled.div`
  width: 70vw;
  height: fit-content;
  margin-top: 10px;
  margin-left: auto;
  margin-right: auto;
  border: 1px solid lightgray;
  border-radius: 3px;
  text-align: left;
  background-color: white;
`;

const CommentInput = styled.textarea`
  width: 70vw;
  line-height: 30px;
  background: none;
  border: none;
  font-size: 1.5vw;
  word-break: break-all;
  resize: none;
  :focus {
    outline: none;
  }
  padding-left: 10px;
`;

const Btn = styled.button`
  font-size: 1.5vw;
  color: grey;
  font-weight: bolder;
  border: none;
  cursor: pointer;
  margin-right: 10px;
  background-color: white;
`;

const Count = styled.div`
  text-align: end;
  margin-top: 10px;
  margin-right: 10px;
  font-size: 1.5vw;
`;

const Box = styled.div`
  justify-content: flex-end;
  display: flex;
  margin-bottom: 5px;
`;

export const CommentWrite = ({ parentCommentId, postId, reply }) => {
  const [commentInput, setCommentInput] = useState("");
  const [textAreaCount, setTextAreaCount] = useState(0);

  const onInputChange = (e) => {
    setCommentInput(e.currentTarget.value);
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
            console.log(response);
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
      <Count>
        <span>{textAreaCount}</span>/200
      </Count>
      <CommentInput
        placeholder="댓글을 입력해주세요."
        onChange={onInputChange}
        value={commentInput}
        maxLength={199}
      ></CommentInput>
      <Box>
        <Btn onClick={onSubmit}>등록</Btn>
      </Box>
    </Container>
  );
};
