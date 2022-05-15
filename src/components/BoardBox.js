import React, { Component } from "react";
import { Fragment } from "react";
import styled, { keyframes } from "styled-components";
import myImage from "../images/dog.jpeg";
import profile from "../images/profileImage.png";
import { Link } from "react-router-dom";

const Container = styled.div`
  width: 850px;
  height: 160px;
  background-color: rgb(251, 223, 169);
  margin-left: auto;
  margin-right: auto;
  display: flex;
  padding: 20px;
  margin-bottom: 30px;
  overflow: hidden;
`;

const Box1 = styled.div`
  width: 540px;
`;

const Box2 = styled.div`
  width: 200px;
  height: 120px;
  background-color: red;
  margin-left: auto;
  margin-right: auto;
`;

const Title = styled.div`
  width: 550px;
  font-weight: bold;
  font-size: large;
  text-align: start;
  padding-inline-start: 4px;
  overflow: hidden;
  text-overflow: ellipsis;
  -webkit-line-clamp: 1;
  display: -webkit-box;
  max-height: 25px;
`;

const Content = styled.div`
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  width: 550px;
  height: 40px;
  line-height: 20px;
  overflow: hidden;
  text-overflow: ellipsis;
  text-align: start;
  margin-top: 10px;
  margin-bottom: 20px;
`;

const BoxProfile = styled.div`
  display: flex;
  text-align: center;
  font-size: small;
  margin-bottom: 10px;
`;

const TextInfo = styled.div`
  margin-right: 15px;
  margin-top: 3px;
`;

const BoxProfilePhoto = styled.div`
  margin-bottom: 10px;
  margin-right: 5px;
`;

const BoxPhoto = styled.div``;

const Photo = styled.img`
  object-fit: fill;
  width: 230px;
  height: 120px;
`;

const ProfileImage = styled.img`
  width: 40px;
  height: 40px;
  vertical-align: baseline;
  border-radius: 40%;
  margin-bottom: 10px;
`;

const popUp = (event) => {
  if (sessionStorage.getItem("userID") === null) {
    alert("로그인을 하신 후에 게시물을 등록할 수 있습니다.");
    event.preventDefault();
  }
};

export const BoardBox = ({ item }) => {
  const postLike = item.likeCount === null ? 0 : item.likeCount;
  const commentLike = item.commentCount === null ? 0 : item.commentCount;
  return (
    <Link
      to={"/board/detail/" + item.postId}
      style={{ textDecoration: "none", color: "black" }}
      onClick={popUp}
    >
      <Fragment>
        <Container>
          <Box1>
            <Title>{item.title}</Title>
            <Content>{item.content}</Content>
            <BoxProfile>
              <BoxProfilePhoto>
                <ProfileImage src={item.userImgUrl} />
              </BoxProfilePhoto>
              <TextInfo style={{ marginRight: "20px", fontWeight: "bold" }}>
                {item.nickname}
              </TextInfo>
              <TextInfo>좋아요 {postLike}</TextInfo>
              <TextInfo>댓글 {commentLike}</TextInfo>
              <TextInfo>조회수 {item.hits}</TextInfo>
            </BoxProfile>
          </Box1>
          <Box2>
            <Photo alt="profile" src={myImage} />
          </Box2>
        </Container>
      </Fragment>
    </Link>
  );
};
