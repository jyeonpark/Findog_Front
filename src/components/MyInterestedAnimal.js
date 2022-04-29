import React, { Component, useState } from "react";
import AnimalItem from "../components/AnimalItem";
import styled from "styled-components";
import AnimalPopup from "../components/AnimalPopup";

const Container = styled.div`
  width: 900px;
  height: fit-content;
  margin-bottom: 100px;
  display: grid;
  grid-row-gap: 50px;
  grid-template-columns: 1fr 1fr;
  justify-items: center;
`;

const Title = styled.div`
  margin-top: 100px;
  font-weight: 700;
  margin-bottom: 30px;
`;

const Divider = styled.div`
  width: 100%;
  height: 1px;
  background-color: rgb(0, 0, 0, 0.1);
  margin-bottom: 50px;
`;

function MyInterestedAnimal() {
  const data = [
    {
      IsRecruiting: "공고중",
      KeyNumber: "경기도-화성-2022-00106",
      PreviewInfo: "암컷(중성화 X) / 흰색 + 크림색 / 3(kg)",
      NoticePeriod: "2022-04-01 ~ 2022-04-11",
      SpecialFeature: "L-3-1-8 흰색 + 크림색",
      ProtectionCenter: "경기도유기동물보호소(Tel: 055-225-5701)",
      ManageCenter: "경기도 화성 의창성산구청 (Tel:123-345-2324)",
      Gender: "수컷(중성화 O)",
      isLike: true,
      Kind: "[개] 골든리트리버",
      RegisterDate: "2022-04-01",
      Location: "경기도 화성",
      RescuePlace: "경기도 화성 레미안 2차 아파트",
    },
    {
      IsRecruiting: "완료",
      KeyNumber: "부산-2022-00107",
      PreviewInfo: "암컷(중성화 X) / 갈색 + 크림색 / 14(kg)",
      NoticePeriod: "2022-03-15 ~ 2022-03-22",
      SpecialFeature: "L-3-1-8 흰색 + 크림색",
      ProtectionCenter: "부산유기동물보호소(Tel: 055-225-5701)",
      ManageCenter: "부산광역시 의창성산구청 (Tel:123-345-2324)",
      Gender: "암컷(중성화 X)",
      isLike: true,
      Kind: "[개] 비숑",
      RegisterDate: "2022-03-15",
      Location: "부산 동래구",
      RescuePlace: "부산 동래구 사직2동 자이아파트",
    },
    {
      IsRecruiting: "공고중",
      KeyNumber: "전라남도-화순-2022-00108",
      PreviewInfo: "암컷(중성화 O) / 검정색 / 3(kg)",
      NoticePeriod: "2022-04-05 ~ 2022-04-22",
      SpecialFeature: "L-3-1-8 흰색 + 크림색",
      ProtectionCenter: "전라남도유기동물보호소(Tel: 055-225-5701)",
      ManageCenter: "전라남도 화순군 구청 (Tel:123-345-2324)",
      Gender: "암컷(중성화 O)",
      isLike: true,
      Kind: "[개] 푸들",
      RegisterDate: "2022-04-05",
      Location: "전남 화순",
      RescuePlace: "전라남도 화순군 화순읍 부영 6차 아파트",
    },
  ];

  const [dialog, setDialog] = useState(false);
  const [animals, setAnimals] = useState(data);
  const [currentAnimal, setCurrentAnimal] = useState(data[0]);

  const onClose = () => {
    setDialog(false);
  };

  const onView = (key) => {
    setCurrentAnimal(data.find((item) => item.KeyNumber === key));
  };

  const onClick = () => {
    console.log("클릭");
    setDialog(true);
  };

  return (
    <div>
      <Title> 관심있는 동물</Title>
      <Divider></Divider>
      <Container>
        {animals.map((item) => {
          return (
            <AnimalItem
              item={item}
              key={item.KeyNumber}
              onClick={onClick}
              onView={onView}
            ></AnimalItem>
          );
        })}
      </Container>

      <AnimalPopup
        item={currentAnimal}
        key={currentAnimal.KeyNumber}
        onClose={onClose}
        visible={dialog}
      ></AnimalPopup>
    </div>
  );
}

export default MyInterestedAnimal;
