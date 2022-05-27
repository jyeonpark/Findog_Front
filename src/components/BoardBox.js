import React from "react";
import { Fragment } from "react";
import styled from "styled-components";
import profileImage from "../images/profileImage.png";
import { Link } from "react-router-dom";

const Container = styled.div`
  width: 80vw;
  min-height: 30vh;
  background-color: rgb(251, 223, 169);
  margin-left: auto;
  margin-right: auto;
  display: flex;
  padding: 2vh;
  margin-bottom: 5vh;
  overflow: hidden;
`;

const Box1 = styled.div`
  padding-inline-start: 1vw;
  width: 65%;
`;

const Box2 = styled.div`
  width: 30%;
  margin-right: 5vw;
  height: 95%;
`;

const Title = styled.div`
  height: 7vh;
  font-weight: bolder;
  font-size: 1.5vw;
  text-align: start;
  overflow: hidden;
  text-overflow: ellipsis;
  -webkit-line-clamp: 1;
  display: -webkit-box;
  padding-top: 1vh;
`;

const Content = styled.div`
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  height: 14vh;
  overflow: hidden;
  text-overflow: ellipsis;
  text-align: start;
  font-size: 1.5vw;
  margin-top: 1vh;
  margin-bottom: 1vh;
`;

const BoxProfile = styled.div`
  display: flex;
  height: 7vh;
  line-height: 7vh;
  font-size: 1vw;
`;

const TextInfo = styled.div`
  margin-right: 15px;
  font-size: 1.2vw;
`;

const BoxProfilePhoto = styled.div`
  margin-right: 1vw;
`;

const Photo = styled.img`
  object-fit: fill;
  width: 100%;
  height: 27vh;
  margin-left: 5vw;
`;

const ProfileImage = styled.img`
  height: 5vh;
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
