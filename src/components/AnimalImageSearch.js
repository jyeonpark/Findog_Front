import React, { useState, useRef } from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRectangleXmark as closeBtn } from "@fortawesome/free-solid-svg-icons";
import { faImage as imgIcon } from "@fortawesome/free-solid-svg-icons";
import defaultImage from "../images/defaultImage.png";
import { faArrowPointer } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import API from "./../utils/api";

function AnimalImageSearch({ onClose, ImageSearch }) {
  const [image, setImage] = useState({
    image_file: "",
    preview_URL: defaultImage,
  });

  const fileInput = useRef(null);

  /** 프로필 사진 업로드 */
  const OnProfileChange = (e) => {
    //화면에 프로필 사진 표시
    const reader = new FileReader();

    if (e.target.files[0]) {
      reader.readAsDataURL(e.target.files[0]);
    }
    reader.onload = () => {
      setImage({
        image_file: e.target.files[0],
        preview_URL: reader.result,
      });
    };
  };

  const onSubmit = () => {
    const formData = new FormData();

    formData.append("input", image.image_file);
    formData.append("serverUrl", "http://e126-34-140-77-64.ngrok.io/");

    API.post("/animals/searchImage", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
      .then((response) => {
        onClose();
        const breed = response.data.class_name;
        const reset = {
          word: breed,
          region: "",
          category: "",
          breed: "",
          status: "",
        };
        ImageSearch(reset);
      })
  };

  return (
    <DarkBackground>
      <DialogBlock>
        <Header>
          <CloseBtn icon={closeBtn} onClick={onClose}></CloseBtn>
        </Header>
        <Img
          src={image.preview_URL}
          onClick={() => {
            fileInput.current.click();
          }}
        ></Img>
        <input
          type="file"
          style={{ display: "none" }}
          accept="image/*"
          name="profile_img"
          onChange={OnProfileChange}
          ref={fileInput}
        />
        <SelectImg
          style={{ marginTop: "5vh" }}
          onClick={() => {
            fileInput.current.click();
          }}
        >
          <div>검색할 동물 업로드하기</div>
          <FontAwesomeIcon
            icon={faArrowPointer}
            style={{
              color: "#FFA45B",
              width: "2vw",
              height: "2vw",
              marginLeft: "2px",
              marginTop: "1px",
            }}
          ></FontAwesomeIcon>
        </SelectImg>
        <Search onClick={onSubmit}>검색하기</Search>
      </DialogBlock>
    </DarkBackground>
  );
}

export default AnimalImageSearch;

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
  width: 35vw;
  min-width: fit-content;
  max-height: fit-content;
  padding: 5px;
  background: white;
  border-radius: 2px;
  border: solid;
  border-color: #ffa45b;
  border-width: 5px;
  font-size: 15px;
  overflow: scroll;
  &::-webkit-scrollbar {
    width: 5px;
    height: 5px;
    border-radius: 6px;
    background: rgba(255, 255, 255, 0.4);
  }
  &::-webkit-scrollbar-thumb {
    background: rgba(0, 0, 0, 0.3);
    border-radius: 6px;
  }
`;
const Header = styled.div`
  width: 100%;
  height: 5vw;
`;

const CloseBtn = styled(FontAwesomeIcon)`
  width: 5vw;
  height: 5vh;
  float: right;
  cursor: pointer;
`;
const SelectImg = styled.div`
  -webkit-line-clamp: 1;
  display: -webkit-box;
  height: fit-content;
  margin-left: auto;
  margin-right: auto;
  border-radius: 5px;
  text-align: center;
  background-color: rgb(255, 224, 166);
  vertical-align: top;
  font-weight: bold;
  width: 25vw;
  min-width: fit-content;
  color: #ffa45b;
  padding: 3px;
  font-size: 1.2vw;
  justify-content: center;
  cursor: pointer;
  margin-bottom: 5px;
`;

const Search = styled.div`
  display: flex;
  width: 25vw;
  height: fit-content;
  margin-left: auto;
  margin-right: auto;
  margin-bottom: 2vh;
  border: solid;
  border-color: rgb(255, 224, 166);
  border-radius: 5px;
  text-align: center;
  padding: 1px;
  vertical-align: top;
  font-weight: bold;
  color: #ffa45b;
  font-size: 1.2vw;
  justify-content: center;
  cursor: pointer;
`;

const Img = styled.img`
  position: relative;
  width: 12vw;
  height: 12vw;
  display: inline-block;
  justify-content: center;
  color: white;
  background-color: lightgrey;
  cursor: pointer;
`;
