import styled from "styled-components";
import { Link } from "react-router-dom";
import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { ko } from "date-fns/esm/locale";

const Container = styled.div`
  width: 80vw;
  margin-top: 30px;
  margin-bottom: 100px;
  margin-left: auto;
  margin-right: auto;
`;

const ContainerSearch = styled.div`
  justify-content: center;
  position: relative;
  width: fit-content;
  height: fit-content;
`;

const BoxSearch = styled.div`
  height: fit-content;
  border: solid;
  border-width: 1px;
  border-color: rgba(0, 0, 0, 0.2);
  margin-top: auto;
  margin-bottom: auto;
  display: flex;
  font-size: 1.5vw;
`;

const BoxFilter = styled.div`
  font-size: 1.5vw;
`;

const BtnImgSearch = styled.button`
  font-size: 2vw;
  width: 12vw;
  height: 4vw;
  text-align: center;
  border: none;
  background-color: orange;
  color: white;
  border-radius: 5%;
  font-weight: bold;
  display: flex;
  margin-top: 3vw;
`;

const InputSearch = styled.input`
  width: 15vw;
  height: 4vw;
  border: none;
  padding-inline: 10px;
  font-size: 1.5vw;
`;

const InputOption = styled.input`
  width: 8vw;
  height: 4vw;
  border: none;
  padding-inline: 10px;
  font-size: 1.5vw;
`;

const BtnSearch = styled.button`
  width: 7vw;
  height: 4vw;
  border: none;
  background-color: rgb(255, 224, 166);
  font-size: 1.5vw;
  min-width: fit-content;
  margin-left: 2vw;
`;

const InputPicker = styled.select`
  width: 10vw;
  height: 4vw;
  margin-left: 2vw;
  text-align: left;
  border-color: rgba(0, 0, 0, 0.2);
`;

function AnimalOptionTab({ setOptions }) {
  const [inputs, setInputs] = useState({
    word: "",
    region: "",
    category: "",
    breed: "",
    status: "",
  });

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
          </div>
          <BtnImgSearch>사진 검색</BtnImgSearch>
        </div>
      </ContainerSearch>
    </Container>
  );
}

export default AnimalOptionTab;
