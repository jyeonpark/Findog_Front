import React, { useState } from "react";
import API from "../utils/api";
import styled from "styled-components";
import { CommentWrite } from "./CommentWrite";
import { CommentUpdate } from "./CommentUpdate";
import profileImage from "../images/profileImage.png";

const Container = styled.div`
  width: 70vw;
  height: auto;
  margin-left: auto;
  margin-right: auto;
  text-align: left;
  display: flex;
  padding-left: ${(props) => (props.reply ? "50px" : "0px")};
`;

const ProfileImage = styled.div`
  width: 10%;
  height: 10%;

`;

const ProfileImageShow = styled.img`
  width: 5vw;
  height: 5vw;
  border-radius: 30%;
  object-fit: fill;
`;

const ProfileName = styled.div`
  font-size: 1.5vw;
  font-weight: bold;
  vertical-align: middle;
`;

const ContentBox = styled.div`
  font-size: 1.2vw;
  width: ${(props) => (props.reply ? "70%" : "100%")};
  margin-top: 5px;
  color: ${(props) => (props.deleted ? "lightgrey" : "")};
`;

const ExtraInfo = styled.div`

  display: flex;
  justify-content: space-between;
`;

const Box = styled.div`
  display: flex;
`;

const BoxContent = styled.div`
  margin-right: 20px;
  color: grey;
  font-size: 1vw;
`;

const Divider = styled.div`
  width: 70vw;
  height: 1px;
  margin-left: auto;
  margin-right: auto;
  margin-top: 20px;
  margin-bottom: 20px;
  background-color: rgb(0, 0, 0, 0.1);
`;

export const SingleComment = ({ comment, postId, reply }) => {
  const [isEditChecked, setIsEditChecked] = useState(false);
  const [isReplying, setIsReplying] = useState(false);
  const content =
    comment.commentStatus === "active" ? comment.content : "삭제된 댓글입니다.";
  const deleted = comment.commentStatus === "active" ? false : true;

  const onClickEdit = () => {
    setIsEditChecked(!isEditChecked);
  };

  const onClickReply = () => {
    setIsReplying(!isReplying);
  };

  const onEditCancle = () => {
    setIsEditChecked(!isEditChecked);
  };

  const onDelete = async () => {
    try {
      await API.delete("/comments" + "/" + postId, {
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
            alert("댓글이 삭제되었습니다.");
            window.location.reload();
          } else {
            console.log(response);
            alert("댓글 삭제에 실패했습니다.");
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
    <div>
      {!isEditChecked && (
        <Container reply={reply}>
          <ProfileImage>
            <ProfileImageShow
              src={
                comment.profileImgUrl === null
                  ? profileImage
                  : comment.profileImgUrl
              }
              referrerpolicy="no-referrer"
            />
          </ProfileImage>
          <div>
            <ProfileName>{comment.nickname}</ProfileName>

            <ContentBox reply={reply} deleted={deleted}>
              {content}
            </ContentBox>

            <ExtraInfo>
              <Box>
                <BoxContent>{comment.commentUpdateAt}</BoxContent>
                {!reply && (
                  <BoxContent
                    style={{ cursor: "pointer" }}
                    onClick={onClickReply}
                  >
                    답글쓰기
                  </BoxContent>
                )}
              </Box>
              {Number(sessionStorage.getItem("userID")) === comment.userId &&
                !deleted && (
                  <Box>
                    <BoxContent
                      style={{ cursor: "pointer" }}
                      onClick={onClickEdit}
                    >
                      수정
                    </BoxContent>
                    <BoxContent
                      style={{ cursor: "pointer" }}
                      onClick={onDelete}
                    >
                      삭제
                    </BoxContent>
                  </Box>
                )}
            </ExtraInfo>
          </div>
        </Container>
      )}
      {isEditChecked && (
        <CommentUpdate
          commentId={comment.commentId}
          postId={postId}
          commentValue={comment.content}
          onCancle={onEditCancle}
        ></CommentUpdate>
      )}
      {isReplying && (
        <CommentWrite
          parentCommentId={comment.commentId}
          postId={postId}
          reply={true}
        ></CommentWrite>
      )}
      <Divider></Divider>
    </div>
  );
};
