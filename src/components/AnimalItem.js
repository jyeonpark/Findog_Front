import React, { Component } from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart as regularHeart } from "@fortawesome/free-regular-svg-icons";
import { faHeart as solidHeart } from "@fortawesome/free-solid-svg-icons";
import dogImage from "../images/dog2.jpeg";

const Container = styled.div`
  width: 350px;
  height: 250px;
  background-color: ${(props) =>
    props.IsRecruiting === "공고중"
      ? "rgb(251, 223, 169)"
      : "rgba(128, 128, 128, 0.2)"};
`;

const Box = styled.div`
  width: 100%;
  height: fit-content;
  display: flex;
  padding: 12px;
  justify-content: space-between;
  white-space: normal;
`;

const HeaderLeft = styled.div`
  display: flex;
`;
const RecruitState = styled.div`
  width: 75px;
  height: 40px;
  line-height: 40px;
  border-radius: 10%;
  background-color: ${(props) =>
    props.IsRecruiting === "공고중" ? "orange" : "grey"};
  color: white;
`;

const AnimalGender = styled.div`
  margin-left: 10px;
  line-height: 40px;
  width: fit-content;
  font-size: 18px;
  font-weight: 600;
`;

const LikeIcon = styled(FontAwesomeIcon)`
  float: right;
`;

const DogImage = styled.img`
  width: 150px;
  height: 100px;
`;

const DogInfo = styled.div`
  padding-left: 20px;
  text-align: left;
`;

const DogInfoDetail = styled.div`
  overflow-x: hidden;
`;

function AnimalItem({ item, onClick, onView }) {
  const {
    IsRecruiting,
    KeyNumber,
    Gender,
    isLike,
    Kind,
    RegisterDate,
    Location,
    RescuePlace,
  } = item;

  return (
    <Container
      IsRecruiting={IsRecruiting}
      onClick={() => {
        onClick();
        onView(item.KeyNumber);
      }}
    >
      <Box>
        <HeaderLeft>
          <RecruitState IsRecruiting={IsRecruiting}>
            {IsRecruiting}
          </RecruitState>
          <AnimalGender>{Gender}</AnimalGender>
        </HeaderLeft>
        <LikeIcon
          size="2x"
          icon={isLike ? solidHeart : regularHeart}
        ></LikeIcon>
      </Box>
      <Box>
        <DogImage src={dogImage}></DogImage>
        <DogInfo>
          <DogInfoDetail>품종 : {Kind}</DogInfoDetail>
          <DogInfoDetail>등록일 : {RegisterDate}</DogInfoDetail>
          <DogInfoDetail>지역 : {Location.slice(0, 10)}</DogInfoDetail>
          <DogInfoDetail>
            구조장소 :{" "}
            {RescuePlace.length < 30
              ? RescuePlace
              : RescuePlace.slice(0, 27) + "..."}
          </DogInfoDetail>
        </DogInfo>
      </Box>
    </Container>
  );
}

export default AnimalItem;
