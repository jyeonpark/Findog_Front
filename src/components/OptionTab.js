import styled from "styled-components";
import { Link } from "react-router-dom";
import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { ko } from "date-fns/esm/locale";

const Container = styled.div`
  width: 100vw;
  margin-top: 30px;
  margin-bottom: 10px;
  margin-left: 10vw;
  margin-right: 10vw;
  justify-content: center;
  text-align: center;
`;

const ContainerSearch = styled.div`
  justify-content: center;
  position: relative;
  background-color: aliceblue;
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

const BoxRegion = styled.div`
  margin-top: auto;
  margin-bottom: auto;
  font-size: 1.5vw;
  min-width: fit-content;
`;

const BoxCate = styled.div`
  margin-top: auto;
  margin-bottom: auto;
  font-size: 1.5vw;
  min-width: fit-content;
`;

const BoxFilter = styled.div`
  display: ${(props) => (props.FilterVisibility ? "inline-block" : "none")};
  font-size: 1.5vw;
`;

const BoxDate = styled.div`
  margin-top: 3vw;
  display: flex;
  font-size: 1.5vw;
  height: 4vw;
`;

const BoxOption = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 3vw;
  font-size: 1.5vw;
  margin-left: 5%;
`;

const BtnWrite = styled.button`
  font-size: 1.5vw;
  font-weight: bolder;
  border: none;
  background-color: orange;
  color: white;
  width: 10vw;
  height: 7vh;
  border-radius: 5%;
  visibility: ${(props) => (props.WriteVisibility ? "visible" : "hidden")};
`;

const BtnImgSearch = styled.button`
  font-size: 1.5vw;
  width: 12vw;
  height: 4vw;
  border: none;
  background-color: orange;
  color: white;
  margin-left: 20px;
  border-radius: 5%;
  font-size: 1vw;
  display: ${(props) => (props.ImgSearchVisibility ? "inline-block" : "none")};
`;

const InputSearch = styled.input`
  width: 25vw;
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
`;

const InputPicker = styled.select`
  width: 12vw;
  height: 4vw;
  margin-left: 20px;
  text-align: left;
  border-color: rgba(0, 0, 0, 0.2);
`;

const TextDate = styled.div`
  font-size: 1vw;
  height: 3vw;
  line-height: 3vw;
  margin-right: 2vw;
  min-width: fit-content;
`;

const SDatePicker = styled(DatePicker)`
  border-radius: 4px;
  font-size: 1vw;
  border: 1px solid lightgray;
`;

function OptionTab({
  FilterVisibility,
  WriteVisibility,
  ImgSearchVisibility,
  setOptions,
}) {
  const [inputs, setInputs] = useState({
    start: "",
    end: "",
    category: 0,
    region: 0,
    keyword: "",
    sort: 1,
  });

  const [startDate, setStartDate] = useState(false);
  const [endDate, setEndDate] = useState(false);

  const popUp = (event) => {
    if (sessionStorage.getItem("userID") === null) {
      alert("로그인을 하신 후에 게시물을 등록할 수 있습니다.");
      event.preventDefault();
    }
  };


  const onSubmit = () => {
    setOptions(inputs);
  };

  return (
    <Container>
      <ContainerSearch>
        <div style={{ marginLeft: "5vw", marginRight: "5vw" }}>
          <div style={{ display: "flex" }}>
            {/* 검색 */}
            <BoxSearch>
              <InputSearch
                placeholder="내용을 입력해주세요"
                value={inputs.keyword}
                name="keyword"
                onChange={(e) =>
                  setInputs({
                    ...inputs,
                    keyword: e.target.value,
                  })
                }
              ></InputSearch>
              <BtnSearch onClick={onSubmit}>검색</BtnSearch>
            </BoxSearch>
            {/* 지역 카테고리 */}
            <BoxRegion>
              <InputPicker
                onChange={(e) =>
                  setInputs({
                    ...inputs,
                    region: Number(e.target.value),
                  })
                }
              >
                <option key={0} value={0}>
                  지역
                </option>
                <option key={1} value={1}>
                  서울
                </option>
                <option key={2} value={2}>
                  인천
                </option>
                <option key={3} value={3}>
                  경기
                </option>
                <option key={4} value={4}>
                  대전
                </option>
                <option key={5} value={5}>
                  대구
                </option>
                <option key={6} value={6}>
                  부산
                </option>
                <option key={7} value={7}>
                  강원
                </option>
                <option key={8} value={8}>
                  광주
                </option>
                <option key={9} value={9}>
                  울산
                </option>
                <option key={10} value={10}>
                  경남
                </option>
                <option key={11} value={11}>
                  전남
                </option>
                <option key={12} value={12}>
                  전북
                </option>
                <option key={13} value={13}>
                  제주
                </option>
              </InputPicker>
            </BoxRegion>
            {/* 게시판 카테고리 */}
            <BoxCate>
              <InputPicker
                onChange={(e) =>
                  setInputs({
                    ...inputs,
                    category: Number(e.target.value),
                  })
                }
              >
                <option key={0} value={0}>
                  카테고리
                </option>
                <option key={1} value={1}>
                  찾아주세요
                </option>
                <option key={2} value={2}>
                  봤어요
                </option>
                <option key={3} value={3}>
                  도와주세요
                </option>
                <option key={4} value={4}>
                  기타
                </option>
              </InputPicker>
            </BoxCate>
            {/* 필터 */}
            <BoxFilter FilterVisibility={FilterVisibility}>
              <InputPicker
                onChange={(e) =>
                  setInputs({
                    ...inputs,
                    sort: Number(e.target.value),
                  })
                }
              >
                <option key={1} value={1}>
                  최신순
                </option>
                <option key={2} value={2}>
                  조회순
                </option>
                <option key={3} value={3}>
                  좋아요순
                </option>
              </InputPicker>
            </BoxFilter>
            {/* 사진검색 */}
            <BtnImgSearch ImgSearchVisibility={ImgSearchVisibility}>
              사진 검색
            </BtnImgSearch>
          </div>
          <BoxDate>
            <TextDate>기간 :</TextDate>
            <div>
              <SDatePicker
                placeholderText="조회 시작 날짜"
                dateFormat="yyyy/MM/dd"
                selected={startDate}
                onChange={(date) => {
                  setStartDate(date);
                  var start =
                  date.getFullYear() +
                  ("0" + (date.getMonth() + 1)).slice(-2) +
                  ("0" + date.getDate()).slice(-2);
                setInputs({ ...inputs, start: start });
                }}
                maxDate={new Date()}
                locale={ko}
              />
            </div>
            <div style={{ marginLeft: "2vw", marginRight: "2vw" }}>~</div>
            <div>
              <SDatePicker
              placeholderText="조회 종료 날짜"
                dateFormat="yyyy/MM/dd"
                selected={endDate}
                onChange={(date) =>{
                  setEndDate(date);
                  var end =
                  date.getFullYear() +
                  ("0" + (date.getMonth() + 1)).slice(-2) +
                  ("0" + date.getDate()).slice(-2);
                setInputs({ ...inputs, end: end });
                }}
                maxDate={new Date()}
                locale={ko}
              />
            </div>
          </BoxDate>
          <div style={{ fontSize: "1vw", color: "grey", textAlign: "left" }}>
            * yyyy/mm/dd 형식으로 날짜를 입력하거나, 달력으로 날짜를
            선택해주세요.
          </div>
        </div>
      </ContainerSearch>

      {/* 글쓰기, 관심목록 */}
      <BoxOption>
        <Link to="/board/edit">
          <BtnWrite WriteVisibility={WriteVisibility} onClick={popUp}>
            글쓰기
          </BtnWrite>
        </Link>
      </BoxOption>
    </Container>
  );
}

export default OptionTab;
