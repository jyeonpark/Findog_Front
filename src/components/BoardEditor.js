import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "../styles/BoardEditor.module.css";
import styled from "styled-components";
import API from './../utils/api';

const InputPicker = styled.select`
  width: 955px;
  height: 50px;
  text-align: left;
  border-color: rgba(0, 0, 0, 0.2);
`;

export const BoardEditor = (props) => {
  let [showImages, setShowImages] = useState([]);
  const [sendingImg, setSendingImg] = useState([]);
  const navigate = useNavigate();

  const [inputs, setInputs] = useState({
    category: 1,
    region: 1,
    content: "",
    title: "",
    userId: sessionStorage.getItem("userID"),
  });

  const [postId, setPostId] = useState(999);
  const [patchState, setPatchState] = useState(props.patchState);

  /** input 입력 시 title, content 내용 변경 */
  const onChangeData = (e) => {
    setInputs({
      ...inputs,
      [e.target.name]: e.target.value,
    });
  };

  const onChangeCategory = (e) => {
    setInputs({
      ...inputs,
      category: e.target.value,
    });
  };

  const onChangeRegion = (e) => {
    setInputs({
      ...inputs,
      region: e.target.value,
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
    if (patchState === false) {
      if (inputs.content === "" || inputs.title === "") {
        alert("제목과 내용을 모두 입력해주세요.");
        return;
      } else {
        try {
          console.log("클릭");
          const formData = new FormData();

          formData.append("userId", Number(inputs.userId));
          formData.append("title", inputs.title);
          formData.append("category", Number(inputs.category));
          formData.append("content", inputs.content);
          formData.append("region", inputs.region);

          Object.values(sendingImg).forEach((image) =>
            formData.append("imgFiles", image)
          );

          console.log("전송시작");
          await API
            .post("/boards/post", formData, {
              method: "POST",
              headers: { "Content-Type": "multipart/form-data" },
            })
            .then((response) => {
              console.log(response.data.isSuccess);

              if (response.data.isSuccess) {
                console.log("게시물이 저장되었습니다.");
                alert("게시물이 등록되었습니다!");
                setPostId(response.data.result.postId);
              } else {
                console.log(response.data.isSuccess);
                console.log(response.data.message);
              }
            });
        } catch (e) {
          console.log(e.response);
        }
        console.log("전송끝");
      }
    }
  };

  useEffect(() => {
    if (postId !== 999 && patchState === false) {
      navigate(`/board/detail/${postId}`, { state: { myBoard: false } });
      console.log("==포스트 이동==");
    }
  }, [postId, patchState]);

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
          <InputPicker
            style={{ marginBottom: "20px" }}
            onChange={onChangeCategory}
          >
            <option key={1} value={1}>
              찾아주세요
            </option>
            <option key={2} value={2}>
              봤어요
            </option>
            <option key={3} value={3}>
              도와주세요
            </option>
            <option key={4} value={4}>
              기타
            </option>
          </InputPicker>
          <InputPicker onChange={onChangeRegion}>
          <option>지역</option>
                <option  key={1} value={1}>서울</option>
                <option  key={2} value={2}>인천</option>
                <option  key={3} value={3}>경기</option>
                <option  key={4} value={4}>대전</option>
                <option  key={5} value={5}>대구</option>
                <option  key={6} value={6}>부산</option>
                <option  key={7} value={7}>강원</option>
                <option  key={8} value={8}>광주</option>
                <option  key={9} value={9}>울산</option>
                <option  key={10} value={10}>경남</option>
                <option  key={11} value={11}>전남</option>
                <option  key={12} value={12}>전북</option>
                <option  key={13} value={13}>제주</option>
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
        <button
          className={styles.btn__confirm}
          onClick={() => {
            onClickUpload();
            // goToPost();
          }}
        >
          확인
        </button>
      </div>
    </div>
  );
};

BoardEditor.defaultProps = {
  patchPostId: 999,
  patchState: false,
  title: "",
  content: "",
  region: "",
  imgList: "",
};
