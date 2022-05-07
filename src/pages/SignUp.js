import React, { Component, useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import API from "./../utils/api";
import axios from "axios";
import { type } from "@testing-library/user-event/dist/type";
import { AuthLogin } from "../utils/utils";

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

const BoxWrapper = styled.div`
  height: 70px;
  margin-top: 10px;
`;

const Box = styled.div`
  width: 700px;
  text-align: left;
  margin-left: 50px;
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
  display: flex;
  flex-direction: row;
  cursor: auto;
`;

const ProfileText = styled.div`
  width: 150px;
  text-align: left;
  vertical-align: top;
  margin-right: 10px;
`;

const SelectProfileBox = styled.div`
  width: 100px;
  text-align: left;
  vertical-align: top;
  margin-top: 5px;
  margin-right: 15px;
  padding: 5px;

  cursor: pointer;
`;

const ProfileImageWrap = styled.div`
  width: 200px;
  display: inline-block;
  text-align: left;
`;

const ProfileImage = styled.img`
  width: 100px;
  height: 100px;
  display: inline-block;
  justify-content: center;
  padding: 3px;
  border: 1px solid lightgray;
`;

const CheckIcon = styled(FontAwesomeIcon)`
  float: right;
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
  margin-right: 3px;
  :focus {
    outline: 2px solid gray;
  }
`;

const ErrorNotification = styled.div`
  width: 400px;
  height: 40px;
  border: none;
  display: inline-block;
  text-align: left;
  margin-top: 2px;
  margin-left: 20px;
  font-size: smaller;
  color: red;
`;

const BtnSearch = styled.button`
  width: 100px;
  height: 40px;
  border: none;
  background-color: rgb(255, 224, 166);
`;

function SignUp() {
  const navigate = useNavigate();
  const [inputs, setInputs] = useState({
    id: "",
    nickname: "",
    password: "",
    passwordCheck: "",
    phoneNumber: "",
  });

  const { id, nickname, password, passwordCheck, phoneNumber } = inputs; // 비구조화 할당을 통해 값 추출

  /** 사진 관리 변수 */
  const default_profile_img = "https://ifh.cc/g/jLgWsT.png";

  const [image, setImage] = useState({
    image_file: "",
    preview_URL: default_profile_img,
  });
  const [defaultImg, setDefaultImg] = useState(true);
  const fileInput = useRef(null);

  /** ID 관리 변수 */
  const [isIdChecked, setIsIdChecked] = useState(false); // 중복확인 완료
  const [isIdValidate, setIsIdValidate] = useState(false); // 유효한 형식
  const [idNotification, setIdNotification] = useState(false);
  const [idOpacity, setIdOpacity] = useState(0.7);
  const idNotiArray = [
    "이메일 형식이 올바르지 않습니다.",
    "이미 존재하는 이메일입니다.",
  ];
  const [idNotiText, setIdNotiText] = useState(idNotiArray[0]);

  /** 닉네임 관리 변수 */
  const [isNicknameChecked, setIsNicknameChecked] = useState(false); // 중복확인 완료
  const [nicknameNotification, setNicknameNotification] = useState(false); // 유효한 형식
  const [isNicknameValidate, setIsNicknameValidate] = useState(false);
  const [nicknameOpacity, setNicknameOpacity] = useState(0.7);
  const nicknameNotiText = "이미 존재하는 닉네임입니다.";

  /** 비밀번호 관리 변수 */
  const [isPwChecked, setIsPwChecked] = useState(false); // 비밀번호 확인이랑 일치
  const [pwNotification, setPwNotification] = useState(true); // 비밀번호 형식 에러 표시
  const [pwCheckNotification, setPwCheckNotification] = useState(false); // 비밀번호 확인 불일치 에러 표시
  const pwNotiArray = [
    "8~15자 이내로 입력해주세요.",
    "영문,숫자, 특수문자를 혼합하여 입력해주세요.",
  ];
  const [pwNotiText, setPwNotiText] = useState(pwNotiArray[0]);

  /** 연락처 관리 변수 */
  const [isPhonenumChecked, setIsPhonenumChecked] = useState(false);
  const [phoneNumNotification, setPhoneNumNotification] = useState(false); // 유효한 형식
  const phoneNumNotiText = "핸드폰 번호 양식이 올바르지 않습니다.";

  const [isAllChecked, setIsAllChecked] = useState(false);

  const onInputChange = (e) => {
    const { value, name } = e.target; // 우선 e.target 에서 name 과 value 를 추출

    setInputs({
      ...inputs, // 기존의 input 객체를 복사한 뒤
      [name]: value, // name 키를 가진 값을 value 로 설정
    });
  };

  useEffect(() => {
    console.log("이미지바뀜");
  }, [defaultImg]);

  /** 회원가입 버튼 활성화 */
  useEffect(() => {
    if (isIdChecked && isNicknameChecked && isPwChecked && isPhonenumChecked) {
      setIsAllChecked(true);
    } else {
      setIsAllChecked(false);
    }
  }, [
    isIdChecked,
    isNicknameChecked,
    isPwChecked,
    isPhonenumChecked,
    defaultImg,
  ]);

  /** 비밀번호 유효성 검사 */
  const setPasswordValidation = () => {
    if (password === "" || passwordCheck === "") {
      setIsPwChecked(false);
      setPwNotification(false);
      setPwCheckNotification(false);
    }
    if (password != "") {
      if (password.length >= 8 && password.length <= 15) {
        if (
          !/^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,25}$/.test(password)
        ) {
          setPwNotification(true);
          setPwNotiText(pwNotiArray[1]);
        }
      } else {
        setPwNotification(true);
        setPwNotiText(pwNotiArray[0]);
      }
    }
    if (passwordCheck != "") {
      if (password === passwordCheck) {
        console.log("같음");
        setIsPwChecked(true);
        setPwCheckNotification(false);
      } else {
        console.log("다름");
        setIsPwChecked(false);
        setPwCheckNotification(true);
      }
    }
  };

  /** 이메일 유효성 검사 */
  useEffect(() => {
    if (id === "") {
      setIdNotification(false);
      setIsIdValidate(false);
      setIdOpacity(0.7);
    } else {
      var regExp =
        /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i;
      // 형식에 맞는 경우 true 리턴
      if (regExp.test(id)) {
        setIdNotification(false);
        setIsIdValidate(true);
        setIdOpacity(1);
      } else {
        setIdNotification(true);
        setIdNotiText(idNotiArray[0]);
        setIsIdValidate(false);
        setIdOpacity(0.7);
      }
    }
    setIsIdChecked(false);
  }, [id]);

  /** 닉네임 유효성 검사 (공백만 아니면 됨) */
  useEffect(() => {
    if (nickname === "") {
      setIsNicknameValidate(false);
      setNicknameOpacity(0.7);
    } else {
      setIsNicknameValidate(true);
      setNicknameOpacity(1);
    }
    setIsNicknameChecked(false);
  }, [nickname]);

  useEffect(() => {
    setPasswordValidation();
  }, [password]);

  useEffect(() => {
    setPasswordValidation();
  }, [passwordCheck]);

  /** 연락처 자동 하이픈 & 유효성 검사 */
  useEffect(() => {
    if (phoneNumber === "") {
      setPhoneNumNotification(false);
    } else {
      if (phoneNumber.length === 10) {
        setInputs({
          ...inputs, // 기존의 input 객체를 복사
          ["phoneNumber"]: phoneNumber.replace(
            /(\d{3})(\d{3})(\d{4})/,
            "$1-$2-$3"
          ),
        });
      }

      if (phoneNumber.length === 13) {
        setInputs({
          ...inputs, // 기존의 input 객체를 복사
          ["phoneNumber"]: phoneNumber
            .replace(/-/g, "")
            .replace(/(\d{3})(\d{4})(\d{4})/, "$1-$2-$3"),
        });
      }

      if (phoneNumber.length === 13 && /^[0-9\b -]{0,13}$/.test(phoneNumber)) {
        var regPhone = /^01([0|1|6|7|8|9])-?([0-9]{3,4})-?([0-9]{4})$/;
        if (regPhone.test(phoneNumber) === true) {
          setPhoneNumNotification(false);
          setIsPhonenumChecked(true);
        } else {
          setPhoneNumNotification(true);
          setIsPhonenumChecked(false);
        }
      } else {
        setPhoneNumNotification(true);
        setIsPhonenumChecked(false);
      }
    }
  }, [phoneNumber]);

  /** 프로필 사진 업로드 */
  const OnProfileChange = (e) => {
    //화면에 프로필 사진 표시
    const reader = new FileReader();

    if (e.target.files[0]) {
      reader.readAsDataURL(e.target.files[0]);
      setDefaultImg(false);
    } else {
      //업로드 취소할 시
      // setImage(image);
    }

    reader.onload = () => {
      setImage({
        image_file: e.target.files[0],
        preview_URL: reader.result,
      });
    };
  };

  /** 이메일 중복확인 */
  const checkDuplicateId = async () => {
    try {
      const params = { email: id };
      const res = await API.get("/users/chk-email", { params }); // API 가 get 해올 때까지 기다리고, 결과 값을 res 에 담음
      console.log(res.data);
      if (res.data.isSuccess) {
        setIsIdChecked(true);
        setIdNotification(false);
      } else {
        setIdNotification(true);
        setIdNotiText(idNotiArray[1]);
      }
    } catch (e) {
      console.log(e);
    }
  };

  /** 닉네임 중복확인 */
  const checkDuplicateNickname = async () => {
    try {
      const params = { nickname: nickname };
      console.log("파라미터", params);
      const res = await API.get("/users/chk-nickname", { params }); // API 가 get 해올 때까지 기다리고, 결과 값을 res 에 담음
      console.log(res.data);
      if (res.data.isSuccess) {
        setIsNicknameChecked(true);
        setNicknameNotification(false);
      } else {
        setNicknameNotification(true);
      }
    } catch (e) {
      console.log(e);
    }
  };

  /** 회원가입 api 호출 */
  const onSubmit = async () => {
    try {
      console.log("클릭");
      const formData = new FormData();

      // formData.append(JSON.stringify(data));
      formData.append("email", id);
      formData.append("nickname", nickname);
      formData.append("password", password);
      formData.append("phoneNum", phoneNumber);

      if (!defaultImg) {
        console.log("사진 있음");
        console.log(image.image_file);
        formData.append("profileImg", image.image_file);
        console.log(type(image.image_file));
      }

      await axios
        .post("http://3.39.156.161:8080/users/sign-up", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          data: formData,
        })
        .then((response) => {
          if (response.data.isSuccess) {
            alert("회원가입에 성공했습니다.");
            AuthLogin(response.data.result.userJWT);
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
      <Header>회원가입</Header>
      <BoxContainer>
        <Profile>
          <ProfileText>프로필사진</ProfileText>
          <ProfileImageWrap>
            <ProfileImage src={image.preview_URL}></ProfileImage>
            <input
              type="file"
              style={{ display: "none" }}
              accept="image/*"
              name="profile_img"
              onChange={OnProfileChange}
              ref={fileInput}
            />
            <div style={{ display: "flex", marginBottom: "30px" }}>
              <SelectProfileBox
                onClick={() => {
                  fileInput.current.click();
                }}
              >
                사진 업로드
              </SelectProfileBox>
              <SelectProfileBox> | </SelectProfileBox>
              <SelectProfileBox
                onClick={() => {
                  setImage({
                    image_file: "",
                    preview_URL: default_profile_img,
                  });
                  setDefaultImg(true);
                }}
              >
                기본 이미지 설정
              </SelectProfileBox>
            </div>
          </ProfileImageWrap>
        </Profile>
        <BoxWrapper>
          <Box>
            <BoxText>아이디(이메일)</BoxText>
            <BoxSearch>
              <InputSearch name="id" onChange={onInputChange} value={id} />

              <BtnSearch
                disabled={!isIdValidate}
                style={{ opacity: idOpacity }}
                onClick={checkDuplicateId}
              >
                중복확인
              </BtnSearch>
            </BoxSearch>
            {isIdChecked && (
              <CheckIcon size="2x" icon={faCheck} color="orange"></CheckIcon>
            )}
          </Box>
          {idNotification && (
            <ErrorNotification>{idNotiText}</ErrorNotification>
          )}
        </BoxWrapper>
        <BoxWrapper>
          <Box>
            <BoxText>닉네임</BoxText>
            <BoxSearch>
              <InputSearch
                name={"nickname"}
                onChange={onInputChange}
                value={nickname}
              />
              <BtnSearch
                disabled={!isNicknameValidate}
                style={{ opacity: nicknameOpacity }}
                onClick={checkDuplicateNickname}
              >
                중복확인
              </BtnSearch>
            </BoxSearch>
            {isNicknameChecked && (
              <CheckIcon size="2x" icon={faCheck} color="orange"></CheckIcon>
            )}
          </Box>
          {nicknameNotification && (
            <ErrorNotification>{nicknameNotiText}</ErrorNotification>
          )}
        </BoxWrapper>
        <BoxWrapper>
          <Box>
            <BoxText>비밀번호</BoxText>
            <BoxSearch>
              <InputSearch
                style={{ width: "500px" }}
                name={"password"}
                onChange={onInputChange}
                value={password}
                placeholder="※ 영문 대소문자, 숫자, 특수문자를 혼합한 8~15자 이내"
                maxLength="15"
              />
            </BoxSearch>
          </Box>
          {pwNotification && (
            <ErrorNotification>{pwNotiText}</ErrorNotification>
          )}
        </BoxWrapper>
        <BoxWrapper>
          <Box>
            <BoxText>비밀번호 확인</BoxText>
            <BoxSearch>
              <InputSearch
                style={{ width: "500px" }}
                name={"passwordCheck"}
                onChange={onInputChange}
                value={passwordCheck}
                maxLength="15"
              />
            </BoxSearch>
            {isPwChecked && (
              <CheckIcon size="2x" icon={faCheck} color="orange"></CheckIcon>
            )}
          </Box>
          {pwCheckNotification && (
            <ErrorNotification>비밀번호가 일치하지 않습니다.</ErrorNotification>
          )}
        </BoxWrapper>
        <BoxWrapper>
          <Box>
            <BoxText>연락처</BoxText>
            <BoxSearch>
              <InputSearch
                style={{ width: "500px" }}
                name={"phoneNumber"}
                onChange={onInputChange}
                value={phoneNumber}
                maxLength="13"
              />
            </BoxSearch>
            {isPhonenumChecked && (
              <CheckIcon size="2x" icon={faCheck} color="orange"></CheckIcon>
            )}
          </Box>
          {phoneNumNotification && (
            <ErrorNotification>{phoneNumNotiText}</ErrorNotification>
          )}
        </BoxWrapper>
      </BoxContainer>

      <BtnWrap>
        <Link to="/login">
          <Btn background="lightgrey">취소</Btn>
        </Link>

        <Btn background="orange" disabled={!isAllChecked} onClick={onSubmit}>
          회원가입
        </Btn>
      </BtnWrap>
    </Container>
  );
}

export default SignUp;
