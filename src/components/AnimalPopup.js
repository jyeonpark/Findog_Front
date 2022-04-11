import React, { Component, useState, useEffect } from "react";
import styled, { keyframes } from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRectangleXmark as closeBtn } from "@fortawesome/free-solid-svg-icons";
import { faHeart as regularHeart } from "@fortawesome/free-regular-svg-icons";
import { faHeart as solidHeart } from "@fortawesome/free-solid-svg-icons";
import dogImage from "../images/dog2.jpeg";

const fadeIn = keyframes`
  from {
    opacity: 0
  }
  to {
    opacity: 1
  }
`;

const slideUp = keyframes`
  /* from {
    transform: translateY(100px);
  }
  to {
    transform: translateY(0px);
  } */
`;

const DarkBackground = styled.div`
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(0, 0, 0, 0.3);

  animation-duration: 0.25s;
  animation-timing-function: ease-out;
  animation-name: ${slideUp};
  animation-fill-mode: forwards;
`;

const DialogBlock = styled.div`
  width: 500px;
  height: 700px;
  padding: 5px;
  background: white;
  border-radius: 2px;
  border: solid;
  border-color: orange;
  border-width: 10px;
  font-size: 15px;
`;

const Body = styled.div`
  width: 80%;
  margin-left: auto;
  margin-right: auto;
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
  width: 100%;
  height: 35%;
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
    props.IsRecruiting === "공고중" ? "orange" : "grey"};
  color: white;
`;

const ImageBottomBox = styled.div`
  height: fit-content;
  display: flex;
  margin-left: auto;
  margin-right: auto;
  justify-content: space-between;
  margin-top: 15px;
`;

const DogKind = styled.div`
  padding: 3px;
  background-color: rgba(255, 166, 0, 0.3);
`;

const DogInfoText = styled.div`
  text-align: left;
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
`;

function AnimalPopup({ item, onClose, visible }) {
  const [animate, setAnimate] = useState(false);
  const [localVisible, setLocalVisible] = useState(visible);

  useEffect(() => {
    // visible 값이 true -> false 가 되는 것을 감지
    if (localVisible && !visible) {
      setAnimate(true);
      setTimeout(() => setAnimate(false), 250);
    }
    setLocalVisible(visible);
  }, [localVisible, visible]);

  if (!animate && !localVisible) return null;

  const {
    IsRecruiting,
    KeyNumber,
    PreviewInfo,
    NoticePeriod,
    SpecialFeature,
    ProtectionCenter,
    ManageCenter,
    Gender,
    isLike,
    Kind,
    RegisterDate,
    Location,
    RescuePlace,
  } = item;

  return (
    <DarkBackground>
      <DialogBlock>
        <Header>
          <CloseBtn icon={closeBtn} onClick={onClose}></CloseBtn>
        </Header>
        <Body>
          <ImageBox>
            <DogImage src={dogImage}></DogImage>
            <RecruiteState IsRecruiting={IsRecruiting}>{IsRecruiting}</RecruiteState>
          </ImageBox>
          <TextBox>
            <ImageBottomBox>
              <DogKind>{Kind}</DogKind>
              <LikeIcon
                size="2x"
                icon={isLike ? solidHeart : regularHeart}
              ></LikeIcon>
            </ImageBottomBox>
            <DogInfoText>{PreviewInfo}</DogInfoText>

            <Divider></Divider>
            <DogInfoTextBox>
              <DogInfoText>공고번호 : &nbsp;&nbsp;</DogInfoText>{" "}
              <DogInfoText
                style={{
                  color: "goldenrod",
                }}
              >
                {KeyNumber}
              </DogInfoText>
            </DogInfoTextBox>
            <DogInfoTextBox>
              <DogInfoText>공고기간 : &nbsp;&nbsp;</DogInfoText>{" "}
              <DogInfoText>{NoticePeriod}</DogInfoText>
            </DogInfoTextBox>
            <DogInfoTextBox>
              <DogInfoText>발견장소 : &nbsp;&nbsp;</DogInfoText>{" "}
              <DogInfoText>{RescuePlace}</DogInfoText>
            </DogInfoTextBox>
            <DogInfoTextBox>
              <DogInfoText>특이사항 : &nbsp;&nbsp;</DogInfoText>{" "}
              <DogInfoText>{SpecialFeature}</DogInfoText>
            </DogInfoTextBox>
            <DogInfoTextBox>
              <DogInfoText>보호센터 : &nbsp;&nbsp;</DogInfoText>{" "}
              <DogInfoText>{ProtectionCenter}</DogInfoText>
            </DogInfoTextBox>
            <DogInfoTextBox>
              <DogInfoText>담당센터 : &nbsp;&nbsp;</DogInfoText>{" "}
              <DogInfoText>{ManageCenter}</DogInfoText>
            </DogInfoTextBox>

            <Divider></Divider>
            <DogInfoTextBox>
              <DogInfoText>바로가기 : &nbsp;&nbsp;</DogInfoText>{" "}
              <DogInfoText
                style={{
                  textDecoration: "underline",
                  color: "goldenrod",
                }}
              >
                보호소 바로가기 링크
              </DogInfoText>
            </DogInfoTextBox>
          </TextBox>
        </Body>
      </DialogBlock>
    </DarkBackground>
  );
}

export default AnimalPopup;
