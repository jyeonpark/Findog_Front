import React, { useState, useRef, useEffect } from "react";
import styled from "styled-components";
import API from "./../utils/api";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";

export const EditMyInfo = () => {
  const [inputs, setInputs] = useState({
    email: "",
    nickname: "",
    password: "",
    newPassword: "",
    phoneNum: "",
  });
  const { email, nickname, password, newPassword, phoneNum } = inputs; // 비구조화 할당을 통해 값 추출

  /** 사진 관리 변수 */
  const [prevProfileImg, setPrevProfileImg] = useState("");
  const default_profile_img = "https://ifh.cc/g/jLgWsT.png";
  const [image, setImage] = useState({
    image_file: "",
    preview_URL: default_profile_img,
  });

  const [isProfileChanged, setIsProfileChanged] = useState(false);
  const fileInput = useRef(null);

  /** 닉네임 관리 변수 */
  const [isNicknameChecked, setIsNicknameChecked] = useState(false); // 중복확인 완료

  /** 비밀번호 관리 변수 */
  const [isPasswordChecked, setIsPasswordChecked] = useState(false); // 비밀번호확인 완료

  /** 연락처 관리 변수 */
  const [prevPhoneNum, setPrevPhoneNum] = useState("");

  /** 프로필 사진 업로드 */
  const OnProfileChange = (e) => {
    //화면에 프로필 사진 표시
    const reader = new FileReader();

    if (e.target.files[0]) {
      reader.readAsDataURL(e.target.files[0]);
      setIsProfileChanged(true);
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
        setPrevProfileImg(data.profileUrl);
        setPrevPhoneNum(data.phoneNum);
        console.log(data);

        setInputs({
          ...inputs,
          email: data.email,
          nickname: data.nickname,
          phoneNum: data.phoneNum,
        });
        setImage({
          image_file: "",
          preview_URL:
            data.profileUrl === null ? default_profile_img : data.profileUrl,
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
    } else if (name === "password") {
      setIsPasswordChecked(false);
    } else if (name === "phoneNum") {
      setInputs({
        ...inputs,
        [name]: value
          .replace(/[^0-9]/g, "")
          .replace(
            /(^02|^0505|^1[0-9]{3}|^0[0-9]{2})([0-9]+)?([0-9]{4})$/,
            "$1-$2-$3"
          )
          .replace("--", "-"),
      });
    }
  };

  const onSubmitProfile = async () => {
    var deleteFlag = 0;
    if (isProfileChanged && image.image_file !== "") {
      // 수정된 것
      console.log("수정됨(사진변경) 1");
    } else if (isProfileChanged && image.image_file === "") {
      if (prevProfileImg === null) {
        // 수정안된것
        alert("사진이 수정되지 않았습니다.");
        return;
      } else {
        console.log("수정됨(사진 삭제) 3");
        deleteFlag = 1;
      }
    } else if (!isProfileChanged) {
      alert("사진이 수정되지 않았습니다.");
      return;
    }

    try {
      const formData = new FormData();
      if (deleteFlag === 1) {
        // 프로필 사진 삭제
        formData.append("deleteFlag", 1);
      } else {
        formData.append("newProfileImg", image.image_file);
      }
      if (prevProfileImg !== "") {
        formData.append("originProfileImgUrl", prevProfileImg);
      }

      // JSON.stringify(data)
      await API.patch("/mypage/myInfo/profileImg", formData, {
        headers: {
          "X-ACCESS-TOKEN": sessionStorage.getItem("userJWT"),
          "Content-Type": "multipart/form-data",
        },
      })
        .then((response) => {
          if (response.data.isSuccess) {
            alert("프로필 사진이 수정되었습니다.");
            window.location.reload();
          } else {
            console.log(response);
            alert("프로필 사진 수정에 실패했습니다.");
          }
        })
        .catch((error) => {
          console.log(error.response);
        });
    } catch (e) {
      console.log(e.response);
    }
  };

  const onSubmitNickName = async () => {
    if (!isNicknameChecked) {
      alert("닉네임 중복확인을 먼저 진행해주세요.");
      return;
    } else {
      try {
        // JSON.stringify(data)
        await API.patch(
          "/mypage/myInfo/nickname",
          JSON.stringify({ nickname: nickname }),
          {
            headers: {
              "X-ACCESS-TOKEN": sessionStorage.getItem("userJWT"),
              "Content-Type": "application/json",
            },
          }
        )
          .then((response) => {
            if (response.data.isSuccess) {
              alert("닉네임이 수정되었습니다.");
              window.location.reload();
            } else {
              console.log("닉네임", nickname);
              console.log(response);
              alert("닉네임 수정에 실패했습니다.");
            }
          })
          .catch((error) => {
            console.log(error.response);
          });
      } catch (e) {
        console.log(e.response);
      }
    }
  };

  const onCheckPassword = async () => {
    let data = {
      email: email,
      password: password,
    };

    try {
      // JSON.stringify(data)
      await API.post("/mypage/myInfo/checkUser", JSON.stringify(data), {
        headers: {
          "X-ACCESS-TOKEN": sessionStorage.getItem("userJWT"),
          "Content-Type": "application/json",
        },
      })
        .then((response) => {
          if (response.data.isSuccess) {
            alert("비밀번호가 확인되었습니다.");
            setIsPasswordChecked(true);
          } else {
            console.log(response);
            alert("비밀번호가 일치하지 않습니다.");
          }
        })
        .catch((error) => {
          console.log(error.response);
        });
    } catch (e) {
      console.log(e.response);
    }
  };

  const onSubmitPassword = async () => {
    if (!isPasswordChecked) {
      alert("현재 비밀번호 확인을 먼저 진행해주세요.");
      return;
    } else {
      try {
        // JSON.stringify(data)
        await API.patch(
          "/mypage/myInfo/password",
          JSON.stringify({ newPassword: newPassword }),
          {
            headers: {
              "X-ACCESS-TOKEN": sessionStorage.getItem("userJWT"),
              "Content-Type": "application/json",
            },
          }
        )
          .then((response) => {
            if (response.data.isSuccess) {
              alert("비밀번호가 수정되었습니다.");
              window.location.reload();
            } else {
              console.log(response);
              alert("비밀번호 수정에 실패했습니다.");
            }
          })
          .catch((error) => {
            console.log(error.response);
          });
      } catch (e) {
        console.log(e.response);
      }
    }
  };

  const onSubmitPhonenum = async () => {
    if (prevPhoneNum === phoneNum) {
      alert("연락처가 수정되지 않았습니다.");
    } else {
      try {
        // JSON.stringify(data)
        await API.patch(
          "/mypage/myInfo/phoneNum",
          JSON.stringify({ phoneNum: phoneNum }),
          {
            headers: {
              "X-ACCESS-TOKEN": sessionStorage.getItem("userJWT"),
              "Content-Type": "application/json",
            },
          }
        )
          .then((response) => {
            if (response.data.isSuccess) {
              alert("연락처가 수정되었습니다.");
              window.location.reload();
            } else {
              console.log(response);
              alert("연락처 수정에 실패했습니다.");
            }
          })
          .catch((error) => {
            console.log(error.response);
          });
      } catch (e) {
        console.log(e.response);
      }
    }
  };

  return (
    <div style={{marginLeft:"5vw"}}>
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
                    setIsProfileChanged(true);
                  }}
                >
                  삭제
                </SelectProfileBox>
              </div>
            </ProfileImageWrap>
          </Profile>
          <EditBtn onClick={onSubmitProfile}>수정하기</EditBtn>
        </BoxContainer>
        <Divider></Divider>
        <BoxContainer>
          <Box>
            <BoxText>닉네임</BoxText>
            <div style={{ display: "flex" }}>
              <BoxSearch>
                <InputSearch
                  name="nickname"
                  onChange={onInputChange}
                  value={nickname}
                />
                <BtnSearch onClick={checkDuplicateNickname}>중복확인</BtnSearch>
              </BoxSearch>
              {isNicknameChecked && (
                <CheckIcon size="2x" icon={faCheck} color="#FFA45B"></CheckIcon>
              )}
            </div>
          </Box>
          <EditBtn onClick={onSubmitNickName}>수정하기</EditBtn>
        </BoxContainer>
        <Divider></Divider>
        <BoxContainer>
          <div>
            <Box style={{ marginBottom: "20px" }}>
              <BoxText>현재 비밀번호</BoxText>
              <div style={{ display: "flex" }}>
                <BoxSearch>
                  <InputSearch
                    name="password"
                    onChange={onInputChange}
                    value={password}
                  />
                  <BtnSearch onClick={onCheckPassword}>확인</BtnSearch>
                </BoxSearch>
                {isPasswordChecked && (
                  <CheckIcon
                    size="2x"
                    icon={faCheck}
                    color="#FFA45B"
                  ></CheckIcon>
                )}
              </div>
            </Box>
            <Box>
              <BoxText>새 비밀번호</BoxText>
              <div style={{ display: "flex" }}>
                <BoxSearch>
                  <InputSearch
                    name="newPassword"
                    onChange={onInputChange}
                    value={newPassword}
                  />
                </BoxSearch>
              </div>
            </Box>
          </div>
          <EditBtn onClick={onSubmitPassword}>수정하기</EditBtn>
        </BoxContainer>
        <Divider></Divider>
        <BoxContainer>
          <Box>
            <BoxText>연락처</BoxText>
            <div style={{ display: "flex" }}>
              <BoxSearch>
                <InputSearch
                  name="phoneNum"
                  onChange={onInputChange}
                  value={phoneNum}
                  maxLength="13"
                />
              </BoxSearch>
            </div>
          </Box>
          <EditBtn onClick={onSubmitPhonenum}>수정하기</EditBtn>
        </BoxContainer>
      </Container>
    </div>
  );
};

export default EditMyInfo;

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
  width: 100%;
  height: fit-content;
  margin-bottom: 200px;
`;

const BoxContainer = styled.div`
  white-space: nowrap;
  display: flex;
  justify-content: space-between;
`;

const Box = styled.div`
  width: 80%;
  text-align: left;
  display: flex;
  cursor: auto;
  margin-top: auto;
  margin-bottom: auto;
  border: none;
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
  width: fit-content;
  text-align: left;
  display: flex;
  flex-direction: row;
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
  width: 15vw;
  display: inline-block;
  text-align: left;
`;

const ProfileImage = styled.img`
  width: 15vw;
  height: 15vw;
  display: inline-block;
  justify-content: center;
  padding: 3px;
  border: 1px solid lightgray;
`;

const EditBtn = styled.button`
  width: 10vw;
  max-width: fit-content;
  border: none;
  background-color: #FFA45B;
  height: 5vh;
  border-radius: 5px;
  position: relative;
  color: white;
  font-weight: bolder;
  margin-top: auto;
  margin-bottom: auto;
  font-size: 1vw;
`;

const BoxSearch = styled.div`
  width: fit-content;
  height: fit-content;

`;

const InputSearch = styled.input`
  width: 13vw;
  height: 5vh;
  border: solid;
  border-width: 1px;
  border-color: rgba(0, 0, 0, 0.2);
  display: inline-block;
  border-radius: 3px;
  padding-inline: 1vw;
  font-size: 1vw;
  :focus {
    outline: 2px solid gray;
  }
`;

const BtnSearch = styled.button`
  min-width: fit-content;
  height: 5vh;
  border: solid;
  border-width: 1px;
  border-color: rgba(0, 0, 0, 0.2);
  display: inline-block;
  border-radius: 3px;
  background-color: rgb(255, 224, 166);
  font-size: 1vw;
`;

const CheckIcon = styled(FontAwesomeIcon)`
  margin-left: 10px;
  line-height: 40px;
`;
