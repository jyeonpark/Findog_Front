import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRectangleXmark as closeBtn } from "@fortawesome/free-solid-svg-icons";
import likeIcon from "../images/like.png";
import unlikeIcon from "../images/unlike.png";

import API from "./../utils/api";

function AnimalPopup({ item, onClose, likeFlag }) {
  useEffect(() => {
    getAnimalInfo(item.animalId);
  }, []);

  const [like, setLike] = useState(likeFlag);

  // 유기동물 상세정보 조회하기
  const getAnimalInfo = (animalId) => {
    API.get("/animals/" + animalId).then((response) => {
      if (response.data.isSuccess) {
        console.log(response.data);
        setAnimal(response.data.result);
      } else {
        console.log(response);
      }
    });
  };

  const [animal, setAnimal] = useState({
    animalId: 0,
    desertionNo: "",
    filename: "",
    happenDt: "",
    happenPlace: "",
    kindCd: "",
    colorCd: "",
    age: "",
    weight: "",
    noticeNo: "",
    noticeSdt: "",
    noticeEdt: "",
    popfile: "",
    processState: "",
    sexCd: "",
    neuterYn: "",
    specialMark: "",
    careNm: "",
    careTe: "",
    careAddr: "",
    careNm: "",
  });

  const Like = (event) => {
    if (sessionStorage.getItem("userJWT") === null) {
      alert("로그인을 하신 후 이용하실 수 있습니다.");
      event.preventDefault();
    }
    if (like === 1) {
      // 좋아요 취소
      API.delete("/animals/unlike", {
        headers: {
          "X-ACCESS-TOKEN": sessionStorage.getItem("userJWT"),
        },
        data: {
          animalIdList: JSON.parse("[" + animal.animalId + "]"),
        },
      }).then((response) => {
        console.log(response.data);
        if (response.data.isSuccess) {
          setLike(0);
        }
      });
    } else {
      // 좋아요 누르기
      const params = new URLSearchParams({
        animalId: animal.animalId,
      }).toString();
      const url = "/animals/like?" + params;

      API.post(url, null, {
        headers: {
          "X-ACCESS-TOKEN": sessionStorage.getItem("userJWT"),
        },
      }).then((response) => {
        console.log(response.data);
        if (response.data.isSuccess) {
          setLike(1);
        }
      });
    }
  };

  return (
    <DarkBackground>
      <DialogBlock>
        <Header>
          <CloseBtn icon={closeBtn} onClick={onClose}></CloseBtn>
        </Header>
        <Body>
          <ImageBox>
            <DogImage src={animal.popfile}></DogImage>
            <RecruiteState processState={animal.processState}>
              {animal.processState}
            </RecruiteState>
          </ImageBox>
          <TextBox>
            <ImageBottomBox>
              <DogKind>{animal.kindCd}</DogKind>
              <LikeIcon
                src={like === 1 ? likeIcon : unlikeIcon}
                onClick={Like}
              ></LikeIcon>
            </ImageBottomBox>
            <DogInfoText>{animal.specialMark}</DogInfoText>
            <Divider></Divider>
            <DogInfoTextBox>
              <DogInfoTitle>공고번호 :</DogInfoTitle>
              <DogInfoText
                style={{
                  color: "#FFA45B",
                  fontWeight: "bolder",
                }}
              >
                {animal.noticeNo}
              </DogInfoText>
            </DogInfoTextBox>
            <DogInfoTextBox>
              <DogInfoTitle>공고기간 : </DogInfoTitle>
              <DogInfoText>
                {animal.noticeSdt} ~ {animal.noticeEdt}
              </DogInfoText>
            </DogInfoTextBox>
            <DogInfoTextBox>
              <DogInfoTitle>발견장소 :</DogInfoTitle>
              <DogInfoText>{animal.happenPlace}</DogInfoText>
            </DogInfoTextBox>
            <DogInfoTextBox>
              <DogInfoTitle>특이사항 :</DogInfoTitle>
              <DogInfoText
                style={{
                  color: "#FFA45B",
                  fontWeight: "bolder",
                }}
              >
                {animal.specialMark}
              </DogInfoText>
            </DogInfoTextBox>
            <DogInfoTextBox>
              <DogInfoTitle>보호센터 :</DogInfoTitle>
              <DogInfoText>
                {animal.careNm} (Tel : {animal.careTel})
                <br />
                주소 : {animal.careAddr}
              </DogInfoText>
            </DogInfoTextBox>
            <DogInfoTextBox>
              <DogInfoTitle>담당센터 : </DogInfoTitle>
              <DogInfoText>{animal.careNm}</DogInfoText>
            </DogInfoTextBox>
          </TextBox>
        </Body>
      </DialogBlock>
    </DarkBackground>
  );
}

export default AnimalPopup;

const DarkBackground = styled.div`
  position: fixed;
  left: 0;
  top: 0;
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(0, 0, 0, 0.5);
`;

const DialogBlock = styled.div`
  width: 70vw;
  height: fit-content;
  max-height: 70vh;
  padding: 5px;
  background: white;
  border-radius: 2px;
  border: solid;
  border-color: #FFA45B;
  border-width: 5px;
  overflow: scroll;
  &::-webkit-scrollbar {
    width: 8px;
    height: 8px;
    border-radius: 6px;
    background: rgba(255, 255, 255, 0.4);
  }
  &::-webkit-scrollbar-thumb {
    background: rgba(0, 0, 0, 0.3);
    border-radius: 6px;
  }
  @media screen and (max-width: 650px) {
    height: fit-content;
  }
`;

const Body = styled.div`
  width: 90%;
  margin-left: auto;
  margin-right: auto;
  margin-bottom: 20px;
  display: flex;
`;

const TextBox = styled.div`
  width: 50%;
`;

const Header = styled.div`
  width: 100%;
  height: 5vh;
`;

const CloseBtn = styled(FontAwesomeIcon)`
  width: 3vw;
  height: 3vw;
  float: right;
  cursor: pointer;
`;

const ImageBox = styled.div`
  width: 50%;
  position: relative;
`;

const DogImage = styled.img`
  width: 90%;
  height: 27vw;
  min-height: 50vh;
`;

const RecruiteState = styled.div`
  position: absolute;
  top: 4%;
  left: 8%;
  width: fit-content;
  padding-inline-start: 5%;
  padding-inline-end: 5%;
  height: 30px;
  line-height: 30px;
  border-radius: 20px;
  background-color: ${(props) =>
    props.processState === "보호중" ? "#FFA45B" : "grey"};
  color: white;
`;

const ImageBottomBox = styled.div`
  height: fit-content;
  display: flex;
  width: 100%;
  margin-left: auto;
  margin-right: auto;
  justify-content: space-between;
`;

const DogKind = styled.div`
height: fit-content;
  font-weight: bolder;
  font-size: 2vw;
  padding-inline-start: 3px;
  padding-inline-end: 3px;
  background-color: rgb(255, 164, 91);
`;

const DogInfoTitle = styled.div`
  width: 30%;
  text-align: left;
  font-size: 1.2vw;
`;

const DogInfoText = styled.div`
  width: 70%;
  text-align: left;
  font-size: 1.2vw;
`;

const DogInfoTextBox = styled.div`
  display: flex;
  margin-top: 5px;
  text-align: left;
`;

const Divider = styled.div`
  width: 100%;
  height: 1px;
  margin-top: 10px;
  margin-bottom: 10px;
  background-color: rgba(255, 164, 91, 0.1);
`;

const LikeIcon = styled.img`
width: 5vw;
height: 5vw;
  float: right;
  cursor: pointer;
`;
