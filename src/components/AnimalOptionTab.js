import styled from "styled-components";
import React, { useState, useEffect } from "react";
import AnimalImageSearch from "./AnimalImageSearch";

const Container = styled.div`
  width: 95vw;
  margin-top: 30px;
  margin-bottom: 50px;
  display: flex;
  justify-content: center;
`;

const ContainerSearch = styled.div`
  position: relative;
  width: fit-content;
  height: fit-content;
`;

const BoxSearch = styled.div`
  display: flex;
  font-size: 1.2vw;
  line-height: 3vw;
  height: 3vw;
  @media screen and (max-width: 650px) {
    font-size: 2vw;
  }
`;

const BoxFilter = styled.div`
  font-size: 1.2vw;
  @media screen and (max-width: 650px) {
    font-size: 2vw;
  }
`;

const BtnImgSearch = styled.button`
  width: 7vw;
  height: 3vw;
  line-height: 3vw;
  border-radius: 30px;
  border: solid;
  color: black;
  background-color: white;
  border-color: rgba(255, 164, 91);
  border-width: 2px;
  font-size: 1.2vw;
  min-width: fit-content;
  margin-left: 2vw;
  @media screen and (max-width: 650px) {
    font-size: 2vw;
  }
`;

const InputSearch = styled.input`
  width: 15vw;
  height: 3vw;
  border: none;
  padding-inline: 10px;
  font-size: 1.2vw;
  @media screen and (max-width: 650px) {
    font-size: 2vw;
  }
`;

const InputOption = styled.input`
  width: 8vw;
  height: 3vw;
  border: none;
  padding-inline: 10px;
  font-size: 1.2vw;
  @media screen and (max-width: 650px) {
    font-size: 2vw;
  }
`;

const BtnSearch = styled.button`
  width: 7vw;
  height: 3vw;
  border: none;
  background-color: rgba(255, 164, 91);
  font-size: 1.2vw;
  min-width: fit-content;
  margin-left: 2vw;
  color: black;
`;

const InputPicker = styled.select`
  width: 10vw;
  height: 3vw;
  color: black;
  border: none;
  margin-left: 2vw;
  @media screen and (max-width: 650px) {
    font-size: 2vw;
  }
  text-align: left;
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
`;

function AnimalOptionTab({ setOptions }) {
  const [inputs, setInputs] = useState({
    word: "",
    region: "",
    category: "",
    breed: "",
    status: "",
  });
  const [dialog, setDialog] = useState(false);

  const onSubmit = (b) => {
    if (b) {
      setOptions(inputs);
    } else {
      const reset = {
        word: "",
        region: "",
        category: "",
        breed: "",
        status: "",
      };
      setInputs(reset);
      setOptions(reset);
    }
  };

  const onClose = () => {
    setDialog(false);
  };

  const onClick = () => {
    setDialog(true);
  };

  return (
    <Container>
      <ContainerSearch>
        <div>
          <div style={{ display: "flex" }}>
            {/* 검색 */}
            <BoxSearch>
              <InputSearch
                placeholder="색상, 특이사항, 품종 등"
                value={inputs.word}
                name="word"
                onChange={(e) =>
                  setInputs({
                    ...inputs,
                    word: e.target.value,
                  })
                }
              ></InputSearch>
            </BoxSearch>
            <BoxSearch style={{ marginLeft: "2vw" }}>
              <InputOption
                placeholder="시/군/구"
                value={inputs.region}
                name="region"
                onChange={(e) =>
                  setInputs({
                    ...inputs,
                    region: e.target.value,
                  })
                }
              ></InputOption>
            </BoxSearch>
            <BoxFilter>
              <InputPicker
                value={inputs.category}
                onChange={(e) =>
                  setInputs({
                    ...inputs,
                    category: e.target.value,
                  })
                }
              >
                <option key={1} value={""}>
                  모든 동물
                </option>
                <option key={2} value={"개"}>
                  개
                </option>
                <option key={3} value={"고양이"}>
                  고양이
                </option>
                <option key={4} value={"기타"}>
                  기타
                </option>
              </InputPicker>
            </BoxFilter>
            {inputs.category !== "" && (
              <BoxSearch style={{ marginLeft: "2vw" }}>
                <InputOption
                  style={{ width: "15vw" }}
                  placeholder="품종 ex) 믹스견, 시츄"
                  value={inputs.breed}
                  name="breed"
                  onChange={(e) =>
                    setInputs({
                      ...inputs,
                      breed: e.target.value,
                    })
                  }
                ></InputOption>
              </BoxSearch>
            )}
            <BoxFilter>
              <InputPicker
                value={inputs.status}
                onChange={(e) =>
                  setInputs({
                    ...inputs,
                    status: e.target.value,
                  })
                }
              >
                <option key={1} value={""}>
                  전체
                </option>
                <option key={2} value={"보호중"}>
                  보호중
                </option>
                <option key={3} value={"종료"}>
                  종료
                </option>
              </InputPicker>
            </BoxFilter>
            <BtnSearch
              onClick={() => {
                onSubmit(true);
              }}
            >
              검색
            </BtnSearch>
            <BtnSearch
              onClick={() => {
                onSubmit(false);
              }}
            >
              필터 초기화
            </BtnSearch>
            <BtnImgSearch onClick={onClick}>사진 검색</BtnImgSearch>
          </div>
        </div>
      </ContainerSearch>
      {dialog ? (
        <AnimalImageSearch onClose={onClose}></AnimalImageSearch>
      ) : null}
    </Container>
  );
}

export default AnimalOptionTab;
