import React from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart as regularHeart } from "@fortawesome/free-regular-svg-icons";
import { faHeart as solidHeart } from "@fortawesome/free-solid-svg-icons";

const Container = styled.div`
  width: 37vw;
  min-height: 30vh;
  margin-bottom: 1vh;
  background-color: ${(props) =>
    props.processState === "보호중"
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
  width: 10vw;
  font-size: 1.5vw;
  height: fit-content;
  line-height: 5vw;
  border-radius: 10%;
  background-color: ${(props) =>
    props.processState === "보호중" ? "orange" : "grey"};
  color: white;
`;

const AnimalGender = styled.div`
  margin-left: 10px;
  line-height: 5vw;
  width: fit-content;
  font-size: 1.5vw;
  font-weight: 1000;
`;

const LikeIcon = styled(FontAwesomeIcon)`
  float: right;
  object-fit: fill;
  width: 3vw;
  height: 5vw;
`;

const DogImage = styled.img`
  width: 40%;
  height: 25vh;
  margin-bottom: 2%;
`;

const DogInfo = styled.div`
  width: 50%;
  margin-left: 10%;
  text-align: left;
  font-size: 1.5vw;
`;

const DogInfoDetail = styled.div`
  overflow: hidden;
  font-weight: 500;
`;

function AnimalItem({ item, onClick, onView }) {
  const {
    animalId,
    processState,
    sexCd,
    neuterYn,
    kindCd,
    happenDt,
    orgNm,
    happenPlace,
    popfile,
    likeFlag,
  } = item;

  const gender = sexCd === "M" ? "수컷" : "암컷";
  const neuter = neuterYn === "N" ? "(중성화 X)" : "(중성화 O)";

  return (
    <Container
      processState={processState}
      onClick={() => {
        onClick();
        onView(item.animalId);
      }}
    >
      <Box>
        <HeaderLeft>
          <RecruitState processState={processState}>
            {processState}
          </RecruitState>
          <div style={{ display: "flex" }}>
            <AnimalGender>{gender}</AnimalGender>
            <AnimalGender>{neuter}</AnimalGender>
          </div>
        </HeaderLeft>
        <LikeIcon
          icon={likeFlag === 1 ? solidHeart : regularHeart}
        ></LikeIcon>
      </Box>
      <Box>
        <DogImage src={popfile}></DogImage>
        <DogInfo>
          <DogInfoDetail>• 품종 : {kindCd}</DogInfoDetail>
          <DogInfoDetail>• 등록일 : {happenDt}</DogInfoDetail>
          <DogInfoDetail>• 구조장소 : {happenPlace.slice(0, 10)}</DogInfoDetail>
          <DogInfoDetail>• 담당기관명 : {orgNm}</DogInfoDetail>
        </DogInfo>
      </Box>
    </Container>
  );
}

export default AnimalItem;
