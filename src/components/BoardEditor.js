import React, { Component, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styles from "../styles/BoardEditor.module.css";
import styled from "styled-components";
import axios from "axios";

const InputPicker = styled.select`
  width: 955px;
  height: 50px;
  text-align: left;
  border-color: rgba(0, 0, 0, 0.2);
`;

export const BoardEditor = () => {
  let [showImages, setShowImages] = useState([]);
  const [sendingImg, setSendingImg] = useState([]);

  const [inputs, setInputs] = useState({
    category: 1,
    content: "",
    title: "",
    userId: sessionStorage.getItem("userID"),
  });

  /** input 입력 시 title, content 내용 변경 */
  const onChangeData = (e) => {
    setInputs({
      ...inputs,
      [e.target.name]: e.target.value,
    });
  };

  // category select
  const handleSelect = (e) => {
    setInputs({
      ...inputs,
      categoy: e.target.value,
    });
  };

  /** 사진 추가 */
  const handleAddImages = (event) => {
    const imageLists = event.target.files;
    let imageUrlLists = [...showImages];

    for (let i = 0; i < imageLists.length; i++) {
      const currentImageUrl = URL.createObjectURL(imageLists[i]);
      imageUrlLists.push(currentImageUrl);

      sendingImg.push(imageLists[i]);
    }

    if (imageUrlLists.length > 10) {
      imageUrlLists = imageUrlLists.slice(0, 10);
      sendingImg = sendingImg.slice(0, 10);
    }

    setShowImages(imageUrlLists);
  };

  /** 사진 삭제 */
  const handleDeleteImage = (id) => {
    setShowImages(showImages.filter((_, index) => index !== id));
    setSendingImg(sendingImg.filter((_, index) => index !== id));
  };

  /** 확인버튼 누르면 데이터 서버로 전송 */
  const onClickUpload = async () => {
    try {
      console.log("클릭");
      const formData = new FormData();

      formData.append("userId", Number(inputs.userId));
      formData.append("title", inputs.title);
      formData.append("category", Number(inputs.category));
      formData.append("content", inputs.content);

      console.log("type check start");

      console.log("cate: ", typeof Number(inputs.category));
      console.log("title: ", typeof inputs.title);
      console.log("content: ", typeof inputs.content);
      console.log("userId: ", typeof inputs.userId);

      // showImages.map((eachfile) => {
      //   formData.append("imgFiles", eachfile)
      // })

      if (sendingImg.length > 0) {
        // const sendingImg = [];

        // showImages.map((eachfiles) => {
        //   sendingImg.push(eachfiles)
        // })

        // sendingImg.forEach(image => formData.append("imgFiles", image));

        sendingImg.map((e) => {
          formData.append("imageFiles", e);
        });

        // formData.append("imgFiles", sendingImg);
        // formData.append("imgFiles",showImages);
        console.log("sendingImg: ", typeof sendingImg);
        console.log("sendingImg: ", sendingImg);
        // formData.push("imgFiles", showImages);
      }

      // console.log("type check end");
      console.log("전송시작");
      await axios
        .post("http://3.39.156.161:8080/boards/post", formData, {
          method: "POST",
          headers: { "Content-Type": "multipart/form-data" },
          data: formData,
        })
        .then((response) => {
          console.log(response.data.isSuccess);

          if (response.data.isSuccess) {
            console.log("게시물이 저장되었습니다.");
            alert("게시물이 등록되었습니다!");
            console.log("postId ", response.data.result.postId);
            console.log("userId", response.data.result.userId);
          } else {
            console.log(response.data.isSuccess);
            console.log(response.data.message);
          }
        });
    } catch (e) {
      console.log(e.response);
    }
    console.log("전송끝");
  };

  return (
    <div className={styles.frag}>
      <div className={styles.container}>
        {/* title */}
        <div>
          <input
            className={styles.title}
            type="text"
            placeholder=" 제목"
            id="title"
            name="title"
            onChange={onChangeData}
          />
        </div>
        <div>
          <InputPicker onChange={handleSelect}>
            <option key={1} value={1}>
              기타
            </option>
            <option key={2} value={2}>
              찾아주세요
            </option>
            <option key={3} value={3}>
              봤어요
            </option>
            <option key={4} value={4}>
              도와주세요
            </option>
          </InputPicker>
        </div>
        {/* content */}
        <div>
          <textarea
            type="textarea"
            className={styles.content}
            id="content"
            name="content"
            onChange={onChangeData}
          />
        </div>
        {/* 파일 업로드 부분 */}
        <div>
          <div>
            {/* <strong>업로드 이미지</strong> */}
            <div className={styles.file__container}>
              {showImages.map((image, id) => (
                <div className={styles.ImageBox} key={id}>
                  <img
                    className={styles.imageContainer}
                    src={image}
                    alt={`${image}-${id}`}
                  />
                  <div>
                    <button onClick={() => handleDeleteImage(id)}>삭제</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <form className={styles.ImageSelect}>
            <input
              type="file"
              id="image"
              accept="img/*"
              multiple="multiple"
              onChange={handleAddImages}
            />
            <label htmlFor="image"></label>
          </form>
        </div>
      </div>
      <div className={styles.btn__container}>
        <Link to="/board">
          <button className={styles.btn__cancel}>취소</button>
        </Link>
        <Link to="/board">
          <button className={styles.btn__confirm} onClick={onClickUpload}>
            확인
          </button>
        </Link>
      </div>
    </div>
  );
};
