import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRectangleXmark as closeBtn } from "@fortawesome/free-solid-svg-icons";
import { faHeart as regularHeart } from "@fortawesome/free-regular-svg-icons";
import { faHeart as solidHeart } from "@fortawesome/free-solid-svg-icons";
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
    orgNm: "",
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
                size="2x"
                icon={like === 1 ? solidHeart : regularHeart}
                onClick={Like}
              ></LikeIcon>
            </ImageBottomBox>
            <DogInfoText>{animal.specialMark}</DogInfoText>
            <Divider></Divider>
            <DogInfoTextBox>
              <DogInfoTitle>공고번호 :</DogInfoTitle>
              <DogInfoText
                style={{
                  color: "orange",
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
              <DogInfoText>{animal.specialMark}</DogInfoText>
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
              <DogInfoText>{animal.orgNm}</DogInfoText>
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
  background: rgba(0, 0, 0, 0.3);
`;

const DialogBlock = styled.div`
  width: 70vw;
  height: fit-content;
  max-height: 70vh;
  padding: 5px;
  background: white;
  border-radius: 2px;
  border: solid;
  border-color: orange;
  border-width: 10px;
  font-size: 15px;
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

`;

const Body = styled.div`
  width: 95%;
  margin-left: auto;
  margin-right: auto;
  margin-bottom: 50px;
`;

const TextBox = styled.div`
  width: 100%;
`;

const Header = styled.div`
  width: 100%;
  height: 50px;
  margin-bottom: 30px;
`;

const CloseBtn = styled(FontAwesomeIcon)`
  width: 50px;
  height: 50px;
  float: right;
  cursor: pointer;
`;

const ImageBox = styled.div`
  width: fit-content;
  position: relative;
`;

const DogImage = styled.img`
  width: 50vw;
  height: 400px;
`;

const RecruiteState = styled.div`
  position: absolute;
  top: 10px;
  left: 10px;
  width: 75px;
  height: 30px;
  line-height: 30px;
  border-radius: 10%;
  background-color: ${(props) =>
    props.processState === "보호중" ? "orange" : "grey"};
  color: white;
`;

const ImageBottomBox = styled.div`
  height: fit-content;
  display: flex;
  width: 100%;
  margin-left: auto;
  margin-right: auto;
  justify-content: space-between;
  margin-top: 15px;
`;

const DogKind = styled.div`
  padding: 3px;
  font-weight: bolder;
  margin-bottom: 5px;
  font-size: xx-large;
  background-color: rgba(255, 166, 0, 0.3);
`;

const DogInfoTitle = styled.div`
  width: 100px;
  text-align: left;
  font-size: large;
`;

const DogInfoText = styled.div`
  width: 500px;
  text-align: left;
  font-size: large;
`;

const DogInfoTextBox = styled.div`
  display: flex;
  margin-top: 5px;
  text-align: left;
`;

const Divider = styled.div`
  width: 100%;
  height: 1px;
  margin-top: 20px;
  margin-bottom: 20px;
  background-color: rgb(0, 0, 0, 0.3);
`;

const LikeIcon = styled(FontAwesomeIcon)`
  float: right;
  cursor: pointer;
`;
