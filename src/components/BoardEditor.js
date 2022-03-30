import {useEffect, useState} from "react"
import styles from "../styles/BoardEditor.module.css"

export const BoardEditor = () => {


    return (
        <div className={styles.frag}>
            <h1>BoardEditor</h1>
            <div className={styles.container}>
                <div>
                    <input className={styles.title} type="text" placeholder=" 제목"/>
                </div>
                <div>
                    <select className="form-control">
                        <option>카테고리</option>
                        <option>찾아주세요</option>
                        <option>발견했어요</option>
                        <option>도와주세요</option>
                        <option>기타</option>
                    </select>
                </div>
                <div>
                    <input type="text" className={styles.content}/>
                </div>
                {/* 파일 업로드 부분 */}
                <div className={styles.file__container}>
                    <div>
                        <strong>업로드 이미지</strong>
                        <div>
                            <img src="" alt=""/>
                        </div>
                    </div>
                    <form>
                        <input
                            type="file"
                            id="image"
                            accept="img/*"
                            multiple="multiple"/>
                        <label htmlFor="image">파일 선택하기</label>
                    </form>
                </div>
            </div>
            <div className={styles.btn__container}>
                <button className={styles.btn__cancel}>취소</button>
                <button className={styles.btn__confirm}>확인</button>
            </div>

        </div>
    )
}