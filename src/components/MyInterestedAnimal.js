import React, { Component, useState } from "react";
import AnimalItem from "../components/AnimalItem";
import styled from "styled-components";
import AnimalPopup from "../components/AnimalPopup";

const Container = styled.div`
  width: fit-content;
  height: fit-content;
  margin-left: auto;
  margin-right: auto;
  margin-top: 100px;
  display: grid;
  grid-gap: 50px;
  grid-template-columns: 1fr 1fr;
`;

const Body = styled.div`
  margin-bottom: 100px;
`;

function MyInterestedAnimal() {
  const data = [
    {
      IsRecruiting: "공고중",
      Gender: "수컷(중성화O)",
      isLike: true,
      Kind: "[개] 푸들",
      RegisterDate: "2022-04-01",
      Location: "전남 화순",
      RescuePlace: "전라남도 화순군 화순읍 부영 6차 아파트",
    },
    {
      IsRecruiting: "완료",
      Gender: "암컷(중성화O)",
      isLike: false,
      Kind: "[개] 비숑",
      RegisterDate: "2022-04-01",
      Location: "서울 강서구",
      RescuePlace: "서울 강서구 화순읍 부영 6차 아파트",
    },
    {
      IsRecruiting: "공고중",
      Gender: "암컷(중성화X)",
      isLike: true,
      Kind: "[개] 말티즈",
      RegisterDate: "2022-04-01",
      Location: "부산 해운대구",
      RescuePlace: "부산 해운대구 화순읍 부영 6차 아파트",
    },
  ];

  const [dialog, setDialog] = useState(false);
  const [animals, setAnimals] = useState(data);

  const onClose = () => {
    setDialog(false);
  };

  const onClick = () => {
    console.log("클릭");
    setDialog(true);
  };

  return (
    <div>
      <Body>
        <Container>
          <AnimalItem item={animals[0]} onClick={onClick}></AnimalItem>
          <AnimalItem item={animals[1]} onClick={onClick}></AnimalItem>
          <AnimalItem item={animals[1]} onClick={onClick}></AnimalItem>
          <AnimalItem item={animals[2]} onClick={onClick}></AnimalItem>
          <AnimalItem item={animals[0]} onClick={onClick}></AnimalItem>
          <AnimalItem item={animals[0]} onClick={onClick}></AnimalItem>
          <AnimalItem item={animals[1]} onClick={onClick}></AnimalItem>
          <AnimalItem item={animals[2]} onClick={onClick}></AnimalItem>
          <AnimalItem item={animals[0]} onClick={onClick}></AnimalItem>
          {/* {animals.map((item) => {
            // console.log(item);
            <AnimalItem item={item}></AnimalItem>;
          })} */}
        </Container>
      </Body>
      <AnimalPopup onClose={onClose} visible={dialog}></AnimalPopup>
    </div>
  );
}

export default MyInterestedAnimal;
