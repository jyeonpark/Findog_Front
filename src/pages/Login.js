import React, {  useState } from "react";
import {  useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import styled from "styled-components";
import API from './../utils/api';

const Container = styled.div`
  width: 800px;
  height: fit-content;
  margin-top: 100px;
  margin-left: auto;
  margin-right: auto;
  text-align: left;
`;

const Header = styled.div`
  text-align: center;
  color: orange;
  font-size: 40px;
  padding: 20px;
  font-weight: bold;
  margin-bottom: 15px;
`;

const BoxContainer = styled.div`
  width: 600px;
  border-left: orange;
  text-align: left;
  margin-left: 100px;
`;

const Box = styled.input`
  width: 600px;
  height: 60px;
  margin-top: 10px;
  border-color: rgba(0, 0, 0, 0.2);
  :focus {
    outline: 2px solid gray;
  }
  cursor: auto;
`;

const LoginBtn = styled.button`
  width: 610px;
  height: 60px;
  margin-top: 15px;
  font-size: 20px;
  background-color: orange;
  color: white;
  font-weight: bold;
  margin-bottom: 20px;
  border: none;
  margin-left: 100px;
`;

const Bottom = styled.div`
  width: 610px;
  display: flex;
  margin-left: 100px;
  font-size: 20px;
  margin-bottom: 300px;
  justify-content: space-between;
`;

const Signup = styled.span`
  font-size: 1rem;
  font-weight: 300;
  display: inline-block;
  color: black;
`;

const IdSearch = styled.div`
  font-size: 1rem;
  font-weight: 300;
  display: inline-block;
  color: black;
`;

const PwSearch = styled.div`
  font-size: 1rem;
  font-weight: 300;
  display: inline-block;
  color: black;
`;

const BottomRight = styled.div`
  float: right;
  display: flex;
`;

function Login() {
  const navigate = useNavigate();
  const [inputs, setInputs] = useState({
    email: "",
    password: "",
  });
  const { email, password } = inputs;

  const onInputChange = (e) => {
    const { value, name } = e.target; // 우선 e.target 에서 name 과 value 를 추출

    setInputs({
      ...inputs, // 기존의 input 객체를 복사한 뒤
      [name]: value, // name 키를 가진 값을 value 로 설정
    });
  };

  /** 로그인 api 호출 */
  const onSubmit = async () => {
    try {
      let data = {
        email: email,
        password: password,
      };
      await API
        .post("/users/log-in", JSON.stringify(data), {
          headers: {
            "Content-Type": "application/json",
          },
        })
        .then((response) => {
          if (response.data.isSuccess) {
            alert("로그인 되었습니다.");
            sessionStorage.setItem("userJWT", response.data.result.userJWT);
            sessionStorage.setItem("userID", response.data.result.userId);
            sessionStorage.setItem(
              "profileImgUrl",
              response.data.result.profileImgUrl
            );
            navigate("/");
            window.location.reload();
          } else {
            alert(response.data.message);
          }
        })
        .catch((error) => {
          console.log(error.response);
        });
    } catch (e) {
      console.log(e.response);
    }
  };

  return (
    <Container>
      <Header>로그인</Header>
      <BoxContainer>
        <div>
          <Box
            placeholder="아이디(이메일)"
            name={"email"}
            onChange={onInputChange}
            value={email}
          ></Box>
        </div>
        <div>
          <Box
            placeholder="비밀번호"
            name={"password"}
            onChange={onInputChange}
            value={password}
          ></Box>
        </div>
      </BoxContainer>
      <LoginBtn onClick={onSubmit}>로그인</LoginBtn>
      <Bottom>
        <Link to="/signup">
          <Signup>회원가입</Signup>
        </Link>
        <BottomRight>
          <IdSearch>아이디 찾기</IdSearch>
          <div>&nbsp;&nbsp;|&nbsp;&nbsp;</div>
          <PwSearch>비밀번호 찾기</PwSearch>
        </BottomRight>
      </Bottom>
    </Container>
  );
}

export default Login;
