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
  text-align: left;
  padding-left: 1vw;
  padding-top: 1vw;
  padding-right: 1vw;
  margin-bottom: 30px;
  overflow: hidden;
  text-overflow: ellipsis;
  @media screen and (max-width: 650px) {
    height: 30vw;
    margin-bottom: 30px;
  }
`;

const Box1 = styled.div`
  padding-inline-start: 1vw;
  height: 100%;
  width: 70%;
  text-overflow: ellipsis;
`;

const Box2 = styled.div`
  width: 30%;
  height: 95%;
`;

const Title = styled.div`
  height: 25%;
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
  display: -webkit-inline-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
  word-wrap: break-word;
  text-overflow: ellipsis;
  text-align: left;
  font-size: 1.3vw;
  margin-top: 1vh;
  margin-bottom: 1vh;
  white-space: normal;
  @media screen and (max-width: 650px) {
    font-size: 2vw;
  }
`;

const BoxProfile = styled.div`
  width: max-content;
  display: flex;
  height: 25%;
  line-height: 25%;
`;

const TextInfo = styled.div`
  margin-right: 15px;
  font-size: 1.2vw;
  margin-top: 3%;
  @media screen and (max-width: 650px) {
    font-size: 1.6vw;
  }
`;

const BoxProfilePhoto = styled.div`
  margin-right: 1vw;
`;

const Photo = styled.img`
  object-fit: fill;
  width: 95%;
  height: 100%;
`;

const ProfileImage = styled.img`
  width: 3vw;
  height: 3vw;
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
            <div style={{ minHeight: "50%" }}>
              <Content>{item.content}</Content>
            </div>
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
