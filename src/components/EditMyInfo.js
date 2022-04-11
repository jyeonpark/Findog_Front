import React, { Component } from "react";
import styled from "styled-components";
import ProfileIcon from "../images/profileImage.png";

const Header = styled.div`
  text-align: center;
  white-space: nowrap;
  color: orange;
  font-size: 40px;
  padding: 20px;
  font-weight: bold;
  margin-bottom: 15px;
`;

const BoxContainer = styled.div`
  white-space: nowrap;
  border-left: orange;
`;

const Box = styled.div`
  width: 600px;
  text-align: left;
  margin-left: 50px;
  margin-top: 30px;
  cursor: auto;
`;

const BoxText = styled.div`
  width: 150px;
  text-align: left;
  display: inline-block;
  margin-right: 10px;
`;

const BoxInput = styled.input`
  width: 400px;
  display: inline-block;
  height: 40px;
  border: 1px solid lightgray;
  border-radius: 3px;
  vertical-align: top;
  margin: 0 auto;
  :focus {
    outline: 2px solid gray;
  }
`;

const DuplicateBtn = styled.div`
  left: 100px;
  width: 100px;
  height: 100%;
  line-height: 40px;
  background-color: orange;
  border-radius: 3px;
  color: white;
  font-weight: bold;
  text-align: center;
  display: inline-block;
  margin-left: 1px;
`;

const Profile = styled.div`
  width: 600px;
  text-align: left;
  margin-left: 50px;
  margin-top: 30px;
  cursor: auto;
`;

const ProfileText = styled.div`
  width: 150px;
  text-align: left;
  vertical-align: top;
  display: inline-block;
  margin-right: 10px;
`;

const ProfileImageWrap = styled.div`
  width: 100px;
  border: 1px solid lightgray;
  display: inline-block;
  text-align: left;
`;

const ProfileImage = styled.img`
  width: 100px;
  display: inline-block;
  justify-content: center;
  padding: 3px;
`;

const Btn = styled.button`
  width: 80%;
  height: 60px;
  margin-top: 80px;
  font-size: 20px;
  color: white;
  font-weight: bold;
  margin-bottom: 300px;
  margin-right: 20px;
  border: none;
  cursor: pointer;
  background-color: ${(props) => props.background};
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

const Container = styled.div`
  width: 900px;
  height: fit-content;
  padding-left: 50px;
  padding-right: 50px;
  margin-bottom: 100px;
`;

const BoxSearch = styled.div`
  width: fit-content;
  height: fit-content;
  border: solid;
  border-width: 1px;
  border-color: rgba(0, 0, 0, 0.2);
  margin-top: auto;
  margin-bottom: auto;
  display: inline-block;
  border-radius: 3px;
`;

const InputSearch = styled.input`
  width: 400px;
  height: 40px;
  border: none;
  padding-inline: 10px;
  :focus {
    outline: 2px solid gray;
  }
`;

const BtnSearch = styled.button`
  width: 100px;
  height: 40px;
  border: none;
  background-color: rgb(255, 224, 166);
`;

function EditMyInfo() {
  return (
    <div>
      <Title> 내 정보 수정</Title>
      <Divider></Divider>
      <Container>
        <BoxContainer>
          <Profile>
            <ProfileText>프로필사진</ProfileText>
            <ProfileImageWrap>
              <ProfileImage src={ProfileIcon}></ProfileImage>
            </ProfileImageWrap>
          </Profile>
          <Box>
            <BoxText>닉네임</BoxText>
            <BoxSearch>
              <InputSearch />
              <BtnSearch>중복확인</BtnSearch>
            </BoxSearch>
          </Box>

          <Box>
            <BoxText>비밀번호</BoxText>
            <BoxSearch>
              <InputSearch />
            </BoxSearch>
          </Box>

          <Box>
            <BoxText>비밀번호 확인</BoxText>
            <BoxSearch>
              <InputSearch />
            </BoxSearch>
          </Box>

          <Box>
            <BoxText>연락처</BoxText>
            <BoxSearch>
              <InputSearch />
            </BoxSearch>
          </Box>
        </BoxContainer>

        <Btn background="orange">수정하기</Btn>
      </Container>
    </div>
  );
}

export default EditMyInfo;
