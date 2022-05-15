import React, { Component, useEffect, useState } from "react";
import { Link, Navigate, useNavigate, useLocation } from "react-router-dom";
import styles from "../styles/BoardEditor.module.css";
import styled from "styled-components";
import axios from "axios";
import { BoardDetail } from "../pages/BoardDetail";

const InputPicker = styled.select`
  width: 955px;
  height: 50px;
  text-align: left;
  border-color: rgba(0, 0, 0, 0.2);
`;

export const BoardUpdate = () => {

    // inputPostId,
    // inputTitle,
    // inputCategory,
    // inputRegion,
    // inputContent,
    // inputImgList,
    const location = useLocation();

    console.log("===location===")
    console.log(location.state);


    let [showImages, setShowImages] = useState([]);
    const [sendingImg, setSendingImg] = useState([]);
    const navigate = useNavigate();

    const [inputs, setInputs] = useState({
        category: location.state.locCategory,
        region: 1,
        content: location.state.locContent,
        title: location.state.locTitle,
        userId: sessionStorage.getItem("userID"),
    });

    // const [inputs, setInputs] = useState({
    //     category: 1,
    //     region: 1,
    //     content: "",
    //     title: "",
    //     userId: sessionStorage.getItem("userID"),
    // });


    const [postId, setPostId] = useState(location.state.postId);
    //   const [patchState, setPatchState] = useState(props.patchState);


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
            category: e.target.value
        });
    }

    const onChangeRegion = (e) => {
        setInputs({
            ...inputs,
            region: e.target.value
        })
    }

    // category select
    const handleSelect = (e) => {
        setInputs({
            ...inputs,
            categoy: e.target.value,
        });
        console.log("handle select");
        console.log(e.target.value);
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
                        defaultValue={inputs.title}
                    />
                </div>
                <div>
                    <InputPicker style={{ marginBottom: "20px" }} onChange={onChangeCategory} defaultValue={inputs.category}>
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
                    <InputPicker onChange={onChangeRegion} defaultValue={inputs.region}>
                        <option key={1} value={1}>
                            서울
                        </option>
                        <option key={2} value={2}>
                            경기도
                        </option>
                        <option key={3} value={3}>
                            인천
                        </option>
                        <option key={4} value={4}>
                            강원도
                        </option>
                        <option key={5} value={5}>
                            충청도
                        </option>
                        <option key={6} value={6}>
                            경상도
                        </option>
                        <option key={7} value={7}>
                            전라도
                        </option>
                        <option key={8} value={8}>
                            제주도
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
                        defaultValue={inputs.content}
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
                <button className={styles.btn__confirm} onClick={() => {
                    onClickUpload();
                    // goToPost();
                }}>
                    확인
                </button>
            </div>
        </div>
    );
};

BoardUpdate.defaultProps = {
    inputPostId: 1,
    inputTitle: "",
    inputCategory: 1,
    inputRegion: 1,
    inputContent: "",
    inputImgList: [],
};