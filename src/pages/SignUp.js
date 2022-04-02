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
  width: 100px;
  height: 100%;
  line-height: 43px;
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
  width: 400px;
  display: inline-block;
  text-align: left;
`;

const ProfileImage = styled.img.attrs({
  src: `${ProfileIcon}`,
})`
  width: 100px;
  display: inline-block;
  content: url("../images/profileImage.png");
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

function SignUp() {
  return (
    <Container>
      <Header>회원가입</Header>
      <BoxContainer>
        <div>
          <Box>
            <BoxText>아이디(이메일)</BoxText>
            <BoxInput />
            <DuplicateBtn>중복확인</DuplicateBtn>
          </Box>
        </div>
        <div>
          <Box>
            <BoxText>닉네임</BoxText>
            <BoxInput />
            <DuplicateBtn>중복확인</DuplicateBtn>
          </Box>
        </div>
        <div>
          <Box>
            <BoxText>비밀번호</BoxText>
            <BoxInput />
          </Box>
        </div>
        <div>
          <Box>
            <BoxText>비밀번호 확인</BoxText>
            <BoxInput />
          </Box>
        </div>
        <div>
          <Box>
            <BoxText>연락처</BoxText>
            <BoxInput />
          </Box>
        </div>
        <div>
          <Profile>
            <ProfileText>프로필사진</ProfileText>
            <ProfileImageWrap>
              <ProfileImage></ProfileImage>
            </ProfileImageWrap>
          </Profile>
        </div>
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
