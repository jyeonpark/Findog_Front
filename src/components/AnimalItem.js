import React from "react";
import styled from "styled-components";
import like from "../images/like.png";
import unlike from "../images/unlike.png";

const Container = styled.div`
  @media screen and (max-width: 500px) {
    width:40vw;
    height: 40vw;
  }
  width: 27vw;
  height: 27vw;
  min-width: 200px;
  overflow: scroll;
  &::-webkit-scrollbar {
    width: 2px;
    height: 2px;
  }
  &::-webkit-scrollbar-thumb {
    background: ${(props) =>
      props.processState === "보호중"
        ? "rgba(255, 164, 91,0.5)"
        : "rgba(128, 128, 128, 0.8)"};
    border-radius: 6px;
  }
  margin-bottom: 5vh;
  border-width: 2px;
  box-shadow: ${(props) =>
    props.processState === "보호중"
      ? " 10px 5px 5px rgba(255, 164, 91, 0.1)"
      : "10px 5px 5px rgba(128, 128, 128, 0.2)"};
`;

const Box = styled.div`
  width: 100%;
  height: 10%;
  display: flex;
  padding: 12px;
  margin-bottom: 1%;
  justify-content: space-between;
  white-space: normal;
`;

const BoxContainer = styled.div`
  width: 100%;
  height: 84%;
  margin-top: 5%;
  padding: 12px;
  justify-content: space-between;
  white-space: normal;
`;

const HeaderLeft = styled.div`
  display: flex;
`;

const RecruitState = styled.div`
  width: fit-content;
  font-size: 1.2vw;
  height: fit-content;
  line-height: 3vw;
  padding-inline-start: 5px;
  padding-inline-end: 5px;
  border-radius: 20px;
  border: solid;
  border-width: 2px;
  border-color: ${(props) =>
    props.processState === "보호중" ? "rgb(255, 164, 91)" : "lightgrey"};
`;

const AnimalGender = styled.div`
  margin-left: 1vw;
  line-height: 3vw;
  width: fit-content;
  font-size: 1.2vw;
  font-weight: 1000;
`;

const LikeIcon = styled.img`
  float: right;
  object-fit: fill;
  width: 3vw;
  height: 3vw;
  line-height: 3vw;
`;

const DogImage = styled.img`
  width: 100%;
  height: 50%;
  margin-bottom: 2%;
`;

const DogInfo = styled.div`
  width: 100%;
  height: 50%;
  text-align: left;
  font-size: 1.2vw;
`;

const DogInfoDetail = styled.div`
  font-size: 1.2vw;
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
        <LikeIcon src={likeFlag === 1 ? like : unlike}></LikeIcon>
      </Box>
      <BoxContainer>
        <DogImage src={popfile}></DogImage>
        <DogInfo>
          <DogInfoDetail>• 품종 : {kindCd}</DogInfoDetail>
          <DogInfoDetail>• 등록일 : {happenDt}</DogInfoDetail>
          <DogInfoDetail>• 구조장소 : {happenPlace.slice(0, 10)}</DogInfoDetail>
          <DogInfoDetail>• 담당기관명 : {orgNm}</DogInfoDetail>
        </DogInfo>
      </BoxContainer>
    </Container>
  );
}

export default AnimalItem;
