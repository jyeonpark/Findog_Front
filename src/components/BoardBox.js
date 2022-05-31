import React from "react";
import { Fragment } from "react";
import styled from "styled-components";
import profileImage from "../images/profileImage.png";
import { Link } from "react-router-dom";

const Container = styled.div`
  width: 100%;
  height: 18vw;
  box-shadow: 5px 5px 5px rgba(255, 164, 91, 0.1);
  background-color: white;
  margin-left: auto;
  margin-right: auto;
  display: flex;
  padding-left: 1vw;
  padding-top: 1vw;
  padding-right: 1vw;
  margin-bottom: 30px;
  overflow: hidden;
  text-overflow: ellipsis;
  @media screen and (max-width: 650px) {
    height: 20vw;
    margin-bottom: 30px;
  }
`;

const Box1 = styled.div`
  padding-inline-start: 1vw;
  width: 65%;
  text-overflow: ellipsis;
`;

const Box2 = styled.div`
  width: 30%;
  margin-right: 5vw;
  height: 95%;
`;

const Title = styled.div`
  height: 20%;
  font-weight: bolder;
  font-size: 1.6vw;
  text-align: start;
  overflow: hidden;
  text-overflow: ellipsis;
  -webkit-line-clamp: 1;
  display: -webkit-box;
  padding-top: 1vh;
`;

const Content = styled.div`
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  word-wrap: break-word;
  height: 45%;
  overflow: hidden;
  text-overflow: ellipsis;
  text-align: start;
  font-size: 1.3vw;
  margin-top: 1vh;
  margin-bottom: 1vh;
  white-space: normal;
`;

const BoxProfile = styled.div`
  width: max-content;
  display: flex;
  height: 15%;
  line-height: 20%;
  font-size: 1vw;
`;

const TextInfo = styled.div`
  margin-right: 15px;
  font-size: 1.2vw;
  line-height: 90%;
  margin-top: 3%;
`;

const BoxProfilePhoto = styled.div`
  margin-right: 1vw;
`;

const Photo = styled.img`
  object-fit: fill;
  width: 100%;
  height: 80%;
  margin-top: 10%;
  margin-left: 5vw;
`;

const ProfileImage = styled.img`
  height: 100%;
  vertical-align: baseline;
  border-radius: 40%;
`;

const popUp = (event) => {
  if (sessionStorage.getItem("userID") === null) {
    alert("로그인을 하신 후에 게시물을 열람할 수 있습니다.");
    event.preventDefault();
  }
};

export const BoardBox = ({ item, myBoard }) => {
  const postLike = item.likeCount === null ? 0 : item.likeCount;
  const commentLike = item.commentCount === null ? 0 : item.commentCount;
  const profile = item.userImgUrl === null ? profileImage : item.userImgUrl;
  const path = "/board/detail/" + item.postId;
  return (
    <Link
      to={"/board/detail/" + item.postId}
      state={{ myBoard: myBoard }}
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
                <ProfileImage src={profile} />
              </BoxProfilePhoto>
              <TextInfo style={{ marginRight: "20px", fontWeight: "bold" }}>
                {item.nickname}
              </TextInfo>
              <TextInfo>좋아요 {postLike}</TextInfo>
              <TextInfo>댓글 {commentLike}</TextInfo>
              <TextInfo>조회수 {item.hits}</TextInfo>
            </BoxProfile>
          </Box1>
          {item.thumbnail && (
            <Box2>
              <Photo src={item.thumbnail} />
            </Box2>
          )}
        </Container>
      </Fragment>
    </Link>
  );
};
