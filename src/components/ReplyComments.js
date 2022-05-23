import React from "react";
import { SingleComment } from "./SingleComment";

export const ReplyComments = ({ commentList, parentCommentId, postId }) => {
  
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
