import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styles from "../styles/BoardEditor.module.css";
import styled from "styled-components";

const InputPicker = styled.select`
  width: 955px;
  height: 50px;
  text-align: left;
  border-color: rgba(0, 0, 0, 0.2);
`;

export const BoardEditor = () => {
  return (
    <div className={styles.frag}>
      <div className={styles.container}>
        <div>
          <input className={styles.title} type="text" placeholder=" 제목" />
        </div>
        <div>
        <InputPicker>
            <option>카테고리</option>
            <option>찾아주세요</option>
            <option>봤어요</option>
            <option>도와주세요</option>
            <option>기타</option>
          </InputPicker>
        </div>
        <div>
          <textarea type="textarea" className={styles.content} />
        </div>
        {/* 파일 업로드 부분 */}
        <div className={styles.file__container}>
          <div>
            <strong>업로드 이미지</strong>
            <div>
              <img src="" alt="" />
            </div>
          </div>
          <form>
            <input type="file" id="image" accept="img/*" multiple="multiple" />
            <label htmlFor="image">파일 선택하기</label>
          </form>
        </div>
      </div>
      <div className={styles.btn__container}>
        <Link to="/board">
          <button className={styles.btn__cancel}>취소</button>
        </Link>
        <button className={styles.btn__confirm}>확인</button>
      </div>
    </div>
  );
};