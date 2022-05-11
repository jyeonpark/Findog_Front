import React, {
  Fragment,
  useState,
  useEffect,
  useCallback,
  useRef,
  ReactText,
} from "react";
import API from "../utils/api";
import styled from "styled-components";
import { SingleComment } from "./SingleComment";

export const ReplyComments = ({ commentList, parentCommentId, postId }) => {
  const [ChildCommentNumber, setChildCommentNumber] = useState(0);

  useEffect(() => {
    let commentNumber = 0;
    commentList.map((comment) => {
      if (comment.parentCommentId === parentCommentId) {
        commentNumber++;
      }
    });
    setChildCommentNumber(commentNumber);
  }, [commentList]); //commentList가 바뀔때마다 실행이될 수 있도록해야됨

  const renderReplyComment = (parentCommentId) =>
    commentList.map((comment) => (
      <div>
        {comment.parentCommentId === parentCommentId && (
          <div>
            <SingleComment reply={true} comment={comment} postId={postId} />
          </div>
        )}
      </div>
    ));

  return <div>{renderReplyComment(parentCommentId)}</div>;
};
