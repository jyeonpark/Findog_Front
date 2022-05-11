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
import { CommentWrite } from "./CommentWrite";
import { SingleComment } from "./SingleComment";
import { ReplyComments } from "./ReplyComments";


const Container = styled.div`
  width: 1000px;
  height: auto;
  margin-left: auto;
  margin-right: auto;
  margin-top: 80px;
`;

export const BoardComment = ({ postId }) => {
  const [comments, setComments] = useState([]);

  // 서버에서 댓글 조회하기
  const getComments = () => {
    API.get("/comments", { params: { postId: postId } }).then((response) => {
      if (response.data.isSuccess) {
        console.log(response.data);
        setComments(response.data.result);
      } else {
        console.log(response);
      }
    });
  };
  useEffect(getComments, []);

  return (
    <Container>
      <div>
        {comments.map((item) => {
          if (item.parentCommentId === 0) {
            return (
              <div >
                <SingleComment comment={item} postId={postId}></SingleComment>
                <ReplyComments commentList={comments} parentCommentId={item.commentId} postId={postId}></ReplyComments>
              </div>
            );
          }
        })}
        <CommentWrite parentCommentId={0} postId={postId}></CommentWrite>
      </div>
    </Container>
  );
};
