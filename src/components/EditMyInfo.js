import React, { Component, useState, useRef, useEffect } from "react";
import styled from "styled-components";
import API from "./../utils/api";

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
  background-color: aliceblue;

`;

const BoxWrapper = styled.div`
  height: 70px;
  margin-top: 10px;
`;

const Box = styled.div`
  width: 600px;
  text-align: left;
  cursor: auto;
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

`;

export const EditMyInfo = () => {
  /** 사진 관리 변수 */
  const default_profile_img = "https://ifh.cc/g/jLgWsT.png";

  const [image, setImage] = useState({
    image_file: "",
    preview_URL: default_profile_img,
  });

  const [defaultImg, setDefaultImg] = useState(true);
  const fileInput = useRef(null);

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

  useEffect(() => {
    API.get("/users/" + Number(sessionStorage.getItem("userID")), {
      headers: {
        "X-ACCESS-TOKEN": sessionStorage.getItem("userJWT"),
      },
    }).then((response) => {
      if (response.data.isSuccess) {
        console.log(response.data.result);
      } else {
        console.log(response.data.result);
      }
    });
  }, []);

  return (
    <div>
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
          </Box>
          <EditBtn>수정하기</EditBtn>
        </BoxContainer>
      </Container>
    </div>
  );
};

export default EditMyInfo;
