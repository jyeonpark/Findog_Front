import React, { Component } from "react";
import OptionTab from "../components/OptionTab";
import AnimalList from "../components/AnimalList";
import styled from "styled-components";

const Container = styled.div`
  width: 1200px;
  margin-left: auto;
  margin-right: auto;
  padding-left: 80px;
  display: flex;
  margin-bottom: 30px;
`;

const Body = styled.div`
  margin-bottom: 100px;
`;

function AbandonedAnimal() {
  return (
    <div>
      <OptionTab
        InterestText="관심 동물 보기"
        ImgSearchVisibility
        WriteVisibility={false}
      ></OptionTab>
      <Body>
        <Container>
          <AnimalList
            IsRecruiting={"공고중"}
            Gender={"암컷(중성화O)"}
            IsLike
            Kind={"[개] 푸들"}
            RegisterDate="2022-04-01"
            Location="전남 화순"
            RescuePlace={"전라남도 화순군 화순읍 부영 6차 아파트"}
          ></AnimalList>
          <AnimalList
            IsRecruiting={"공고중"}
            Gender={"암컷(중성화O)"}
            Kind={"[개] 푸들"}
            RegisterDate="2022-04-01"
            Location="전남 화순"
            RescuePlace={"전라남도 화순군 화순읍 부영 6차 아파트"}
          ></AnimalList>
          <AnimalList
            IsRecruiting={"완료"}
            Gender={"암컷(중성화O)"}
            IsLike
            Kind={"[개] 푸들"}
            RegisterDate="2022-04-01"
            Location="전남 화순"
            RescuePlace={"전라남도 화순군 화순읍 부영 6차 아파트"}
          ></AnimalList>
        </Container>
        <Container>
          <AnimalList
            IsRecruiting={"완료"}
            Gender={"암컷(중성화O)"}
            Kind={"[개] 푸들"}
            RegisterDate="2022-04-01"
            Location="전남 화순"
            RescuePlace={"전라남도 화순군 화순읍 부영 6차 아파트"}
          ></AnimalList>
          <AnimalList
            IsRecruiting={"완료"}
            Gender={"암컷(중성화O)"}
            Kind={"[개] 푸들"}
            RegisterDate="2022-04-01"
            Location="전남 화순"
            RescuePlace={"전라남도 화순군 화순읍 부영 6차 아파트"}
          ></AnimalList>
          <AnimalList
            IsRecruiting={"공고중"}
            Gender={"암컷(중성화O)"}
            IsLike
            Kind={"[개] 푸들"}
            RegisterDate="2022-04-01"
            Location="전남 화순"
            RescuePlace={"전라남도 화순군 화순읍 부영 6차 아파트"}
          ></AnimalList>
        </Container>
      </Body>
    </div>
  );
}

export default AbandonedAnimal;
