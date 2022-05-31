import React, {useState} from "react";
import AbandonedAnimal from "../pages/AbandonedAnimal";
import styled from "styled-components";

const Title = styled.div`
  margin-top: 50px;
  font-weight: 700;
  margin-bottom: 30px;
`;

const Divider = styled.div`
  width: 100%;
  height: 1px;
  background-color: rgb(0, 0, 0, 0.1);
  margin-top: 50px;
  margin-bottom: 50px;
`;

export const MyInterestedAnimal = () => {
  const [isEmpty, setIsEmpty]= useState(false);
  const Notice = () => {
    setIsEmpty(true);
  }
  return (
    <div style={{ marginLeft: "5vw" }}>
      <Title> 관심있는 동물 </Title>
      <Divider></Divider>
      <AbandonedAnimal myInterest={true} Notice={Notice}></AbandonedAnimal>
      {isEmpty && 
      <div style={{fontSize:"5px"}}>관심있는 동물이 없습니다.</div>}
    </div>
  );
};

export default MyInterestedAnimal;
