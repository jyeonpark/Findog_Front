import React, { Component } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import ProfileIcon from "../images/profileImage.png";

const Container = styled.div`
  width: 800px;
  height: fit-content;
  margin-top: 100px;
  margin-left: auto;
  margin-right: auto;
`;

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
  width: 700px;
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

const BtnWrap = styled.div`
  white-space: nowrap;
`;

const Btn = styled.button`
  width: 380px;
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

function SignUp() {
  return (
    <Container>
      <Header>회원가입</Header>
      <BoxContainer>
        <Profile>
          <ProfileText>프로필사진</ProfileText>
          <ProfileImageWrap>
            <ProfileImage src={ProfileIcon}></ProfileImage>
          </ProfileImageWrap>
        </Profile>
        <Box>
          <BoxText>아이디(이메일)</BoxText>
          <BoxSearch>
            <InputSearch />
            <BtnSearch>중복확인</BtnSearch>
          </BoxSearch>
        </Box>

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

      <BtnWrap>
        <Link to="/login">
          <Btn background="lightgrey">취소</Btn>
        </Link>

        <Btn background="orange">회원가입</Btn>
      </BtnWrap>
    </Container>
  );
}

export default SignUp;
