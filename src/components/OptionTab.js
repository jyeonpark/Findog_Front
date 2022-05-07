import styled from "styled-components";
import { Link } from "react-router-dom";
import React, { Component } from "react";

const Container = styled.div`
  width: 1100px;
  margin-left: auto;
  margin-right: auto;
  margin-top: 30px;
  margin-bottom: 10px;
  padding-left: 100px;
`;

const ContainerSearch = styled.div`
  display: flex;
`;

const BoxSearch = styled.div`
  height: fit-content;
  border: solid;
  border-width: 1px;
  border-color: rgba(0, 0, 0, 0.2);
  margin-top: auto;
  margin-bottom: auto;
`;

const BoxRegion = styled.div`
  margin-top: auto;
  margin-bottom: auto;
`;

const BoxCate = styled.div`
  margin-top: auto;
  margin-bottom: auto;
`;

const BoxFilter = styled.div`
  display: ${(props) => (props.FilterVisibility ? "inline-block" : "none")};
`;

const BoxDate = styled.div`
  margin-top: 10px;
  line-height: 20px;
  display: flex;
`;

const BoxOption = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 40px;
`;

const BtnWrite = styled.button`
  border: none;
  background-color: orange;
  color: white;
  width: 150px;
  height: 70px;
  border-radius: 5%;
  visibility: ${(props) => (props.WriteVisibility ? "visible" : "hidden")};
`;

const BtnImgSearch = styled.button`
  width: 130px;
  height: 70px;
  border: none;
  background-color: orange;
  color: white;
  margin-left: 20px;
  border-radius: 5%;
  display: ${(props) => (props.ImgSearchVisibility ? "inline-block" : "none")};
`;

const BoxCheckInterest = styled.div`
  margin-top: auto;
  margin-bottom: auto;
`;

const InterestCheckbox = styled.input`
  width: 17px;
  height: 17px;
`;

const LabelCheck = styled.label`
  margin-left: 10px;
  font-size: 20px;
`;

const InputSearch = styled.input`
  width: 450px;
  height: 50px;
  border: none;
  padding-inline: 10px;
`;

const BtnSearch = styled.button`
  width: 60px;
  height: 50px;
  border: none;
  background-color: rgb(255, 224, 166);
`;

const InputPicker = styled.select`
  width: 130px;
  height: 50px;
  margin-left: 20px;
  text-align: left;
  border-color: rgba(0, 0, 0, 0.2);
`;

const TextDate = styled.div`
  font-size: 15px;
`;

const InputDate = styled.input`
  width: 100px;
  height: 20px;
  margin-left: 10px;
  margin-right: 10px;
  border-color: rgba(0, 0, 0, 0.2);
`;

function OptionTab({
  FilterVisibility,
  WriteVisibility,
  InterestText,
  ImgSearchVisibility,
}) {
  const popUp = () => {
    if (sessionStorage.getItem("userID") === null) {
      alert("로그인을 하신 후에 게시물을 등록할 수 있습니다.");
    }
  };

  return (
    <Container>
      <ContainerSearch>
        {/* 검색 */}
        <BoxSearch>
          <InputSearch placeholder="내용을 입력해주세요" />
          <BtnSearch>검색</BtnSearch>
        </BoxSearch>
        {/* 지역 카테고리 */}
        <BoxRegion>
          <InputPicker>
            <option>지역</option>
            <option>서울</option>
            <option>인천</option>
            <option>경기</option>
            <option>대전</option>
            <option>대구</option>
            <option>부산</option>
            <option>강원</option>
            <option>광주</option>
            <option>울산</option>
            <option>경남</option>
            <option>전남</option>
            <option>전북</option>
            <option>제주</option>
          </InputPicker>
        </BoxRegion>
        {/* 게시판 카테고리 */}
        <BoxCate>
          <InputPicker>
            <option>카테고리</option>
            <option>찾아주세요</option>
            <option>봤어요</option>
            <option>도와주세요</option>
            <option>기타</option>
          </InputPicker>
        </BoxCate>
        {/* 필터 */}
        <BoxFilter FilterVisibility={FilterVisibility}>
          <InputPicker>
            <option>최신순</option>
            <option>조회순</option>
            <option>인기순</option>
          </InputPicker>
        </BoxFilter>
        {/* 사진검색 */}
        <BtnImgSearch ImgSearchVisibility={ImgSearchVisibility}>
          사진 검색
        </BtnImgSearch>
      </ContainerSearch>
      {/* 기간 */}
      <BoxDate>
        <TextDate>기간 :</TextDate>
        <InputDate placeholder="2021.04.10" />
        <div>~</div>
        <InputDate placeholder="2022.04.10" />
      </BoxDate>
      {/* 글쓰기, 관심목록 */}
      <BoxOption>
        <Link to="/board/edit">
          <BtnWrite WriteVisibility={WriteVisibility} onClick={popUp}>
            글쓰기
          </BtnWrite>
        </Link>
        <BoxCheckInterest>
          <InterestCheckbox
            type="checkbox"
            id="interestCheck"
          ></InterestCheckbox>
          <LabelCheck htmlFor="interestCheck">{InterestText}</LabelCheck>
        </BoxCheckInterest>
      </BoxOption>
    </Container>
  );
}

export default OptionTab;
