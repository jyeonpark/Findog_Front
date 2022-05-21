import React, { Fragment, useEffect, useState } from "react";
import styled from "styled-components";
import API from "./../utils/api";
import { Link, Navigate, useNavigate  } from "react-router-dom";
import profileImage from "../images/profileImage.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart as regularHeart } from "@fortawesome/free-regular-svg-icons";
import { faHeart as solidHeart } from "@fortawesome/free-solid-svg-icons";

const Container = styled.div`
  width: 1000px;
  height: auto;
  padding: 30px;
  margin-left: auto;
  margin-right: auto;
  margin-top: 100px;
  /* border-color: orange; */
  border: 5px orange solid;
`;
const ProfileBox = styled.div`
  width: max-content;
  /* background-color: black; */
  display: flex;
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
const ProfileInfo = styled.div`
  width: fit-content;
  height: fit-content;
`;
const ProfileName = styled.div`
  text-align: left;
  font-size: 20px;
  font-weight: bold;
`;
const ProfileDate = styled.div`
  font-size: 15px;
`;
const TitleBox = styled.div`
  display: flex;
  margin-top: 15px;
`;
const Category = styled.div`
  height: 50px;
  padding-left: 10px;
  padding-right: 10px;
  text-align: center;
  line-height: 50px;
  font-size: 35px;
  color: gray;
  background-color: rgba(243, 156, 18, 0.22);
`;
const Title = styled.div`
  height: 50px;
  margin-left: 15px;
  font-size: 25px;
  font-weight: bold;
  line-height: 50px;
`;
const ContentBox = styled.div`
  margin-top: 50px;
  margin-bottom: 50px;
  min-height: 300px;
  text-align: start;
  font-size: 20px;
`;

const Photo = styled.img`
  object-fit: fill;
  width: 230px;
  height: 120px;
`;

const ExtraBox = styled.div`
  width: 1000px;
  margin-left: auto;
  margin-right: auto;
  margin-top: 30px;
  display: flex;
  justify-content: space-between;
`;

const ExtraInfo = styled.div`
  border: 2px solid rgba(64, 64, 64, 0.2);
  padding-left: 10px;
  padding-right: 10px;
  font-size: 15px;
  font-weight: bold;
  line-height: 30px;
`;

const LikeIcon = styled(FontAwesomeIcon)`
  margin-left: 10px;
  float: right;
  cursor: pointer;
`;

const ExtraButton = styled.div``;

const Button = styled.button`
  font-size: large;
  font-weight: bold;
  padding-left: 10px;
  padding-right: 10px;
  margin-left: 10px;
  background-color: white;
  border: 2px solid rgba(64, 64, 64, 0.5);
`;

export const BoardContent = ({ postId }) => {
  // 1: "기타",
  // 2: "찾아주세요",
  // 3: "봤어요",
  // 4: "도와주세요",

  const navigate = useNavigate();
  const [categoryText, setCategoryText] = useState("기타");
  const WEEKDAY = ["월", "화", "수", "목", "금", "토", "일"];
  const [inputs, setInputs] = useState({
    userId: 0,
    nickname: "",
    userImgUrl: "",
    title: "",
    category: 1,
    content: "",
    postCreateAt: "",
    likeCount: 0,
    commentCount: 0,
    hits: 0,
    userLiked: false,
    imgList: [],
  });

  useEffect(() => {
    API.get("/boards/" + postId, {
      headers: {
        "X-ACCESS-TOKEN": sessionStorage.getItem("userJWT"),
      },
    })
      .then((response) => {
        setInputs({
          userId: response.data.result.board.userId,
          nickname: response.data.result.board.nickname,
          userImgUrl:
            response.data.result.board.userImgUrl === null
              ? profileImage
              : response.data.result.board.userImgUrl,
          title: response.data.result.board.title,
          category: response.data.result.board.category,
          content: response.data.result.board.content,
          postCreateAt: response.data.result.board.postCreateAt,
          likeCount: response.data.result.board.likeCount,
          commentCount: response.data.result.board.commentCount,
          hits: response.data.result.board.hits,
          userLiked: response.data.result.userLiked,
          imgList: response.data.result.imgList,
        });
        console.log(response.data);
        // console.log(inputs);
      })
      .catch((err) => console.log("error:", err));
  }, []);

  useEffect(() => {
    // 카테고리
    switch (inputs.category) {
      case 1:
        setCategoryText("기타");
        break;
      case 2:
        setCategoryText("찾아주세요");
        break;
      case 3:
        setCategoryText("봤어요");
        break;
      case 4:
        setCategoryText("도와주세요");
        break;
      default:
        setCategoryText("default");
        break;
    }
  }, [inputs.category]);

  // Date객체 내용 빼서 형식에 맞춰서 return
  const dateTrans = () => {
    let date = new Date(inputs.postCreateAt);
    let week = WEEKDAY[date.getDay()];

    date =
      date.getFullYear() +
      "년" +
      (date.getMonth() + 1) +
      "월" +
      date.getDate() +
      "일 (" +
      week +
      ") " +
      date.getHours() +
      ":" +
      date.getMinutes();

    console.log(date);
    return date;
  };

  const onClickUpdate = () => {
    const data = {
      locPostId: postId,
      locTitle: inputs.title,
      locCategory: inputs.category,
      // locRegion: inputs.region,
      locContent: inputs.content,
      locImgList: inputs.imgList,
    }
    navigate("/board/update", { state: data });
  };

  const onClickDelete = () => {
    API.delete("/boards/" + postId, {
      headers: {
        "X-ACCESS-TOKEN": sessionStorage.getItem("userJWT"),
      },
      body: {
        userId: sessionStorage.getItem("userID"),
      },
    }).then((response) => {
      console.log(response.data);
      alert("게시물이 삭제되었습니다.");
    });
  };

  const Like = () => {
    const formData = new FormData();
    formData.append("postId", Number(postId));
    if (inputs.userLiked === true) {
      // 좋아요 취소
      API.delete("/boards/like", {
        headers: {
          "X-ACCESS-TOKEN": sessionStorage.getItem("userJWT"),
        },
        data: formData,
      }).then((response) => {
        if (response.data.isSuccess) {
          setInputs({
            ...inputs, // 기존의 input 객체를 복사
            userLiked: false,
          });
        }
      });

    } else {
      // 좋아요 누르기
      API.post("/boards/like", formData, {
        headers: {
          "X-ACCESS-TOKEN": sessionStorage.getItem("userJWT"),
        },
      }).then((response) => {
        if (response.data.isSuccess) {
          setInputs({
            ...inputs, // 기존의 input 객체를 복사
            userLiked: true,
          });
        }
      });

    }
  };

  return (
    <Fragment>
      <Container>
        <ProfileBox>
          <ProfileImage>
            <ProfileImageShow src={inputs.userImgUrl} />
          </ProfileImage>
          <ProfileInfo>
            <ProfileName>{inputs.nickname}</ProfileName>
            <ProfileDate>{dateTrans()}</ProfileDate>
          </ProfileInfo>
        </ProfileBox>
        <TitleBox>
          <Category>{categoryText}</Category>
          <Title>{inputs.title}</Title>
        </TitleBox>
        <hr />
        <ContentBox>{inputs.content}</ContentBox>
        <div style={{ display: "flex" }}>
          {inputs.imgList &&
            inputs.imgList.map((item) => {
              return <Photo src={item}></Photo>;
            })}
        </div>
      </Container>
      <ExtraBox>
        <div style={{ display: "flex" }}>
          <ExtraInfo>
            좋아요 {inputs.likeCount}&nbsp;&nbsp;&nbsp;&nbsp; 댓글{" "}
            {inputs.commentCount}&nbsp;&nbsp;&nbsp;&nbsp; 조회수 {inputs.hits}
          </ExtraInfo>
          <LikeIcon
            size="2x"
            icon={inputs.userLiked ? solidHeart : regularHeart}
            onClick={Like}
          ></LikeIcon>
        </div>
        {inputs.userId === Number(sessionStorage.getItem("userID")) && (
          <ExtraButton>
            <Button onClick={onClickUpdate}>수정</Button>
            <Link to="/board">
              <Button onClick={onClickDelete}>삭제</Button>
            </Link>
          </ExtraButton>
        )}
      </ExtraBox>
    </Fragment>
  );
};

BoardContent.defaultProps = {
  postId: 1,
};
