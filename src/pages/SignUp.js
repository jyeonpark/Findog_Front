import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import API from "./../utils/api";
import { type } from "@testing-library/user-event/dist/type";
import { AuthLogin } from "../utils/utils";

const Container = styled.div`
  width: 60vw;
  height: fit-content;
  margin-top: 50px;
  margin-left: auto;
  margin-right: auto;
`;

const Divider = styled.div`
  width: 100%;
  height: 1px;
  background-color: rgba(255, 164, 91, 0.1);
  margin-top: 20px;
  margin-bottom: 20px;
`;

const Header = styled.div`
  text-align: center;
  white-space: nowrap;
  color: #ffa45b;
  font-size: 25px;
  padding: 20px;
  font-weight: bold;
`;

const BoxContainer = styled.div`
  white-space: nowrap;
  border-left: #ffa45b;
  margin-left: 10%;
`;

const BoxWrapper = styled.div`
  margin-top: 10px;
`;

const Box = styled.div`
  width: 100%;
  text-align: left;
  cursor: auto;
`;

const BoxText = styled.div`
  min-width: 13vw;
  width: 13vw;
  text-align: left;
  display: inline-block;
  margin-right: 2vw;
  font-weight: bold;
  font-size: 1vw;
`;

const Profile = styled.div`
  width: 70vw;
  text-align: left;
  margin-top: 30px;
  display: flex;
  flex-direction: row;
  font-size: 2vw;
  cursor: auto;
`;

const ProfileText = styled.div`
  min-width: 13vw;
  width: 13vw;
  text-align: left;
  display: inline-block;
  margin-right: 2vw;
  font-weight: bold;
  font-size: 1vw;
`;

const SelectProfileBox = styled.div`
  width: fit-content;
  text-align: left;
  vertical-align: top;
  margin-top: 5px;
  padding: 1vw;
  font-size: 1vw;

  cursor: pointer;
`;

const ProfileImageWrap = styled.div`
  width: 30vw;
  display: inline-block;
  text-align: left;
  border: none;
`;

const ProfileImage = styled.img`
  min-width: 50px;
  min-height: 50px;
  width: 5vw;
  height: 5vw;
  display: inline-block;
  justify-content: center;
  padding: 3px;
  border: none;
`;

const CheckIcon = styled(FontAwesomeIcon)`
  float: right;
`;

const BtnWrap = styled.div`
  white-space: nowrap;
`;

const Btn = styled.button`
  width: 30%;
  height: 40px;
  margin-top: 50px;
  margin-left: 10px;
  margin-right: 10px;
  font-size: 1.5vw;
  color: white;
  border-radius: 5px;
  margin-bottom: 100px;
  border: none;
  cursor: pointer;
  background-color: ${(props) => props.background};
`;

const BoxSearch = styled.div`
  width: fit-content;
  height: fit-content;
  margin-top: auto;
  margin-bottom: auto;
  display: inline-block;
`;

const InputSearch = styled.input`
  width: 20vw;
  min-width: fit-content;
  height: 5vh;
  border: none;
  display: inline-block;
  border-radius: 3px;
  padding-inline: 1vw;
  font-size: 1vw;
  :focus {
    outline: 1px solid #ffa45b;
  }
  ::placeholder {
    font-size: 1px;
  }
`;

const ErrorNotification = styled.div`
  width: 50vw;
  height: 40px;
  border: none;
  display: inline-block;
  text-align: left;
  margin-top: 2px;
  font-size: smaller;
  color: red;
  margin-left: 15vw;
  font-size: 1px;
`;

const BtnSearch = styled.button`
  min-width: fit-content;
  height: 5vh;
  border: none;
  display: inline-block;
  border-radius: 3px;
  background-color: rgba(255, 164, 91, 0.3);
  font-size: 1vw;
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
    if (password !== "") {
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
    if (passwordCheck !== "") {
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
      setInputs({
        ...inputs,
        phoneNumber: phoneNumber
          .replace(/[^0-9]/g, "")
          .replace(
            /(^02|^0505|^1[0-9]{3}|^0[0-9]{2})([0-9]+)?([0-9]{4})$/,
            "$1-$2-$3"
          )
          .replace("--", "-"),
      });

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

      await API.post("/users/sign-up", formData, {
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
        <Divider></Divider>
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
        <Divider></Divider>
        <BoxWrapper>
          <Box>
            <BoxText>아이디(이메일)</BoxText>

            <InputSearch name="id" onChange={onInputChange} value={id} />
            <BtnSearch
              disabled={!isIdValidate}
              style={{ opacity: idOpacity }}
              onClick={checkDuplicateId}
            >
              중복확인
            </BtnSearch>

            {isIdChecked && (
              <CheckIcon size="2x" icon={faCheck} color="#FFA45B"></CheckIcon>
            )}
          </Box>
          {idNotification && (
            <ErrorNotification>{idNotiText}</ErrorNotification>
          )}
        </BoxWrapper>
        <Divider></Divider>
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
              <CheckIcon size="2x" icon={faCheck} color="#FFA45B"></CheckIcon>
            )}
          </Box>
          {nicknameNotification && (
            <ErrorNotification>{nicknameNotiText}</ErrorNotification>
          )}
        </BoxWrapper>
        <Divider></Divider>
        <BoxWrapper>
          <Box>
            <BoxText>비밀번호</BoxText>
            <BoxSearch>
              <InputSearch
           
                type={"password"}
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
          <Divider></Divider>
          <Box>
            <BoxText>비밀번호 확인</BoxText>
            <BoxSearch>
              <InputSearch
           
                name={"passwordCheck"}
                onChange={onInputChange}
                value={passwordCheck}
                maxLength="15"
              />
            </BoxSearch>
            {isPwChecked && (
              <CheckIcon size="2x" icon={faCheck} color="#FFA45B"></CheckIcon>
            )}
          </Box>
          {pwCheckNotification && (
            <ErrorNotification>비밀번호가 일치하지 않습니다.</ErrorNotification>
          )}
        </BoxWrapper>
        <BoxWrapper>
          <Divider></Divider>
          <Box>
            <BoxText>연락처</BoxText>
            <BoxSearch>
              <InputSearch
                name={"phoneNumber"}
                onChange={onInputChange}
                value={phoneNumber}
                maxLength="13"
              />
            </BoxSearch>
            {isPhonenumChecked && (
              <CheckIcon size="2x" icon={faCheck} color="#FFA45B"></CheckIcon>
            )}
          </Box>
          {phoneNumNotification && (
            <ErrorNotification>{phoneNumNotiText}</ErrorNotification>
          )}
        </BoxWrapper>
      </BoxContainer>

      <BtnWrap>
        <Link to="/login">
          <Btn
            background="white"
            style={{
              color: "black",
              border: "solid",
              borderColor: "rgba(255, 164, 91, 0.3)",
            }}
          >
            취소
          </Btn>
        </Link>
        <Btn background="#FFA45B" disabled={!isAllChecked} onClick={onSubmit}>
          회원가입
        </Btn>
      </BtnWrap>
    </Container>
  );
}

export default SignUp;
