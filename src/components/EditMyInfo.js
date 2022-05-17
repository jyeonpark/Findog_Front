import React, { Component, useState, useRef, useEffect } from "react";
import styled from "styled-components";
import API from "./../utils/api";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";

const Title = styled.div`
  margin-top: 100px;
  font-weight: 700;
  margin-bottom: 30px;
`;

const Divider = styled.div`
  width: 100%;
  height: 1px;
  background-color: rgb(0, 0, 0, 0.1);
  margin-top: 50px;
  margin-bottom: 50px;
`;

const Container = styled.div`
  width: 800px;
  height: fit-content;
  margin-left: auto;
  margin-right: auto;
  margin-bottom: 200px;
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
  display: flex;
  justify-content: space-between;
`;

const BoxWrapper = styled.div`
  height: 70px;
  margin-top: 10px;
`;

const Box = styled.div`
  width: 600px;
  text-align: left;
  display: flex;
  cursor: auto;
  margin-top: auto;
  margin-bottom: auto;
`;

const BoxText = styled.div`
  width: 150px;
  text-align: left;
  display: inline-block;
  margin-right: 10px;
  font-weight: bold;
`;

const Profile = styled.div`
  width: 600px;
  text-align: left;
  display: flex;
  flex-direction: row;
  cursor: auto;
`;

const ProfileText = styled.div`
  width: 150px;
  text-align: left;
  vertical-align: top;
  margin-right: 10px;
  font-weight: bold;
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

const EditBtn = styled.button`
  width: 150px;
  border: none;
  background-color: orange;
  height: 60px;
  border-radius: 5px;
  position: relative;
  color: white;
  font-weight: bolder;
  margin-top: auto;
  margin-bottom: auto;
`;

const BoxSearch = styled.div`
  width: fit-content;
  height: fit-content;
  border: solid;
  border-width: 1px;
  border-color: rgba(0, 0, 0, 0.2);
  display: inline-block;
  border-radius: 3px;
`;

const InputSearch = styled.input`
  width: 200px;
  height: 40px;
  border: none;
  padding-inline: 10px;
  margin-right: 3px;
  :focus {
    outline: 2px solid gray;
  }
`;

const BtnSearch = styled.button`
  width: 100px;
  height: 42px;
  line-height: 42px;
  border: none;
  background-color: rgb(255, 224, 166);
`;

const CheckIcon = styled(FontAwesomeIcon)`
  margin-left: 10px;
  line-height: 40px;
`;

export const EditMyInfo = () => {
  const [inputs, setInputs] = useState({
    email: "",
    nickname: "",
    password: "",
    newPassword: "",
    phoneNumber: "",
  });
  const { email, nickname, password, newPassword, phoneNum } = inputs; // 비구조화 할당을 통해 값 추출

  /** 사진 관리 변수 */
  const default_profile_img = "https://ifh.cc/g/jLgWsT.png";
  const [image, setImage] = useState({
    image_file: "",
    preview_URL: default_profile_img,
  });
  const [defaultImg, setDefaultImg] = useState(true);
  const [isProfileChanged,setIsProfileChanged] = useState(false);
  const fileInput = useRef(null);

  /** 닉네임 관리 변수 */
  const [isNicknameChecked, setIsNicknameChecked] = useState(false); // 중복확인 완료

  /** 프로필 사진 업로드 */
  const OnProfileChange = (e) => {
    //화면에 프로필 사진 표시
    const reader = new FileReader();

    if (e.target.files[0]) {
      reader.readAsDataURL(e.target.files[0]);
      setDefaultImg(false);
      setIsProfileChanged(true);
    } else {

    }

    reader.onload = () => {
      setImage({
        image_file: e.target.files[0],
        preview_URL: reader.result,
      });
    };
  };

  /** 닉네임 중복확인 */
  const checkDuplicateNickname = async () => {
    if (nickname.length === 0) {
      alert("닉네임을 입력해주세요.");
    } else {
      try {
        const params = { nickname: nickname };
        console.log("파라미터", params);
        const res = await API.get("/users/chk-nickname", { params }); // API 가 get 해올 때까지 기다리고, 결과 값을 res 에 담음
        console.log(res.data);
        if (res.data.isSuccess) {
          setIsNicknameChecked(true);
        } else {
          alert("이미 사용중인 닉네임입니다.");
        }
      } catch (e) {
        console.log(e);
      }
    }
  };

  useEffect(() => {
    API.get("/users/" + Number(sessionStorage.getItem("userID")), {
      headers: {
        "X-ACCESS-TOKEN": sessionStorage.getItem("userJWT"),
      },
    }).then((response) => {
      if (response.data.isSuccess) {
        const data = response.data.result;
        console.log(data);
        setInputs({
          ...inputs,

          email: data.email,
          nickname: nickname,
          phoneNum: phoneNum,
        });
        setImage({
          image_file: "",
          preview_URL: data.profileUrl,
        });
      } else {
        console.log(response.data.result);
      }
    });
  }, []);

  const onInputChange = (e) => {
    const { value, name } = e.target; // 우선 e.target 에서 name 과 value 를 추출

    setInputs({
      ...inputs, // 기존의 input 객체를 복사한 뒤
      [name]: value, // name 키를 가진 값을 value 로 설정
    });

    if (name === "nickname") {
      setIsNicknameChecked(false);
    }
  };

  return (
    <div style={{ marginLeft: "100px" }}>
      <Title> 내 정보 수정</Title>
      <Divider></Divider>
      <Container>
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
              <div style={{ display: "flex" }}>
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
                    setIsProfileChanged(true);
                  }}
                >
                  삭제
                </SelectProfileBox>
              </div>
            </ProfileImageWrap>
          </Profile>
          <EditBtn>수정하기</EditBtn>
        </BoxContainer>
        <Divider></Divider>
        <BoxContainer>
          <Box>
            <BoxText>닉네임</BoxText>
            <div style={{ display: "flex", width: "300px" }}>
              <BoxSearch>
                <InputSearch
                  name="nickname"
                  onChange={onInputChange}
                  value={nickname}
                />
                <BtnSearch onClick={checkDuplicateNickname}>중복확인</BtnSearch>
              </BoxSearch>
              {isNicknameChecked && (
                <CheckIcon size="2x" icon={faCheck} color="orange"></CheckIcon>
              )}
            </div>
          </Box>
          <EditBtn>수정하기</EditBtn>
        </BoxContainer>
        <Divider></Divider>
        <BoxContainer>
          <div>
            <Box style={{ marginBottom: "20px" }}>
              <BoxText>현재 비밀번호</BoxText>
              <div style={{ display: "flex", width: "300px" }}>
                <BoxSearch>
                  <InputSearch
                    name="nickname"
                    onChange={onInputChange}
                    value={nickname}
                  />
                  <BtnSearch onClick={checkDuplicateNickname}>확인</BtnSearch>
                </BoxSearch>
                {isNicknameChecked && (
                  <CheckIcon
                    size="2x"
                    icon={faCheck}
                    color="orange"
                  ></CheckIcon>
                )}
              </div>
            </Box>
            <Box>
              <BoxText>새 비밀번호</BoxText>
              <div style={{ display: "flex", width: "300px" }}>
                <BoxSearch>
                  <InputSearch
                    name="nickname"
                    onChange={onInputChange}
                    value={nickname}
                  />
                </BoxSearch>
                {isNicknameChecked && (
                  <CheckIcon
                    size="2x"
                    icon={faCheck}
                    color="orange"
                  ></CheckIcon>
                )}
              </div>
            </Box>
          </div>
          <EditBtn>수정하기</EditBtn>
        </BoxContainer>
        <Divider></Divider>
        <BoxContainer>
          <Box>
            <BoxText>연락처</BoxText>
            <div style={{ display: "flex", width: "300px" }}>
              <BoxSearch>
                <InputSearch
                  name="nickname"
                  onChange={onInputChange}
                  value={nickname}
                />
              </BoxSearch>
              {isNicknameChecked && (
                <CheckIcon size="2x" icon={faCheck} color="orange"></CheckIcon>
              )}
            </div>
          </Box>
          <EditBtn>수정하기</EditBtn>
        </BoxContainer>
      </Container>
    </div>
  );
};

export default EditMyInfo;
