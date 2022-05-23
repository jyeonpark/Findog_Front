import React, {
  useState,

} from "react";
import API from "./../utils/api";
import styled from "styled-components";

const Container = styled.div`
  width: 950px;
  height: fit-content;
  margin-top: 10px;
  margin-left: auto;
  margin-right: auto;
  border: 1px solid lightgray;
  border-radius: 3px;
  text-align: left;
`;

const CommentInput = styled.textarea`
  width: 900px;
  line-height: 30px;
  border: none;
  size: 10;
  word-break: break-all;
  resize: none;
  :focus {
    outline: none;
  }
  padding-left: 10px;
`;

const Btn = styled.button`
  font-size: 20px;
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
`;

const Box = styled.div`
  justify-content: flex-end;
  display: flex;
  margin-bottom: 5px;
`;

export const CommentUpdate = ({
  commentId,
  postId,
  commentValue,
  onCancle,
}) => {
  const [commentInput, setCommentInput] = useState(commentValue);
  const [textAreaCount, setTextAreaCount] = useState(commentValue.length);

  const onInputChange = (e) => {
    setCommentInput(e.currentTarget.value);
    setTextAreaCount(e.target.value.length);
  };

  const onSubmit = async () => {
    try {
      let data = {
        commentId: commentId,
        userId: Number(sessionStorage.getItem("userID")),
        postId: Number(postId),
        content: commentInput,
      };
      await API.patch("/comments", JSON.stringify(data), {
        headers: {
          "X-ACCESS-TOKEN": sessionStorage.getItem("userJWT"),
          "Content-Type": "application/json",
        },
      })
        .then((response) => {
          if (response.data.isSuccess) {
            alert("댓글이 수정되었습니다.");
            window.location.reload();
          } else {
            console.log(response);
            alert("댓글 수정에 실패했습니다.");
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
        <Btn onClick={onCancle}>취소</Btn>
        <Btn onClick={onSubmit}>수정</Btn>
      </Box>
    </Container>
  );
};
