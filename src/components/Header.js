import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import headerImage from "../images/header_dog.jpg";

const Top = styled.div`
  position: relative;
  white-space: nowrap;
  width: 100vw;
  min-width: 100%;
  max-width: 1000%;
  height: 30vh;
  text-align: center;
  object-fit: fill;

  background: linear-gradient(
      rgba(239, 239, 239, 0.6),
      rgba(239, 239, 239, 0.6)
    ),
    url(${headerImage});
  background-position: center;
  background-size: cover;
  background-color: rgba(0, 0, 0, 0.3);
  background-attachment: scroll;
`;

const HeaderText = styled.div`
  position: absolute;
  top: 2rem;
  left: 50%;
  color: rgb(243, 156, 18);
  font-weight: 800;
  font-size: 30px;
`;

const Container = styled.div`
  display: flex;
  position: absolute;
  top: 10%;
  left: 90%;
  font-weight: 500;
`;

const ContainerText = styled.div`
  padding-left: 10px;
  font-size: 1rem;
  font-weight: 800;
  display: inline-block;
  color: rgb(243, 156, 18);
  cursor: pointer;
`;

function Header(props) {
  function setTabMenu(menu) {
    props.tabMenuChange(menu);
  }

  function logout(){
    sessionStorage.removeItem("userJWT");
    sessionStorage.removeItem("userID");
    sessionStorage.removeItem(
      "profileImgUrl"
    );
    props.isLoginChange(false);
    alert("로그아웃 되었습니다.");
  }

  return (
    <Top>
      <Container>
        {!props.isLogin && (
          <Link to="/login">
            <ContainerText
              onClick={() => {
                setTabMenu(0);
              }}
            >
              {" "}
              로그인
            </ContainerText>
          </Link>
        )}
        {props.isLogin && (
            <ContainerText
              onClick={() => {
                setTabMenu(0);
                logout();
                // 로그아웃 함수
              }}
            >
              {" "}
              로그아웃
            </ContainerText>
        )}
      </Container>
      <Link to="/">
        <HeaderText
          onClick={() => {
            setTabMenu(1);
          }}
        >
          {" "}
          Findog
        </HeaderText>
      </Link>
    </Top>
  );
}

export default Header;
