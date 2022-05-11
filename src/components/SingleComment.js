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

const Container = styled.div`
  width: "1000px";
  height: auto;
  margin-left: auto;
  margin-right: auto;
  text-align: left;
  display: flex;
  margin-top: 20px;
`;

const ProfileImage = styled.div`
  margin-right: 10px;
`;

const ProfileImageShow = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 30%;
  object-fit: fill;
`;

const ProfileName = styled.div`
  font-size: 17px;
  font-weight: bold;
  vertical-align: middle;
`;

const ContentBox = styled.div`
  font-size: 20px;
  width: 900px;
  margin-top: 5px;
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
`;

const Divider = styled.div`
  width: 100%;
  height: 1px;
  margin-top: 20px;
  margin-bottom: 20px;
  background-color: rgb(0, 0, 0, 0.1);
`;

export const SingleComment = ({ comment, postId, reply }) => {
  return (
    <Fragment>
      <Container>
        <ProfileImage>
          <ProfileImageShow src="https://findog-bucket.s3.ap-northeast-2.amazonaws.com/images/a7d381d1-18c6-49db-8666-47c11d816b95.png" />
        </ProfileImage>
        <div>
          <ProfileName>{comment.nickname}</ProfileName>
          <ContentBox>{comment.content}</ContentBox>
          <ExtraInfo>
            <Box>
              <BoxContent>{comment.commentUpdateAt}</BoxContent>
              <BoxContent>답글쓰기</BoxContent>
            </Box>
            <Box>
              <BoxContent>수정</BoxContent>
              <BoxContent>삭제</BoxContent>
            </Box>
          </ExtraInfo>
        </div>
      </Container>
      <Divider></Divider>
    </Fragment>
  );
};
