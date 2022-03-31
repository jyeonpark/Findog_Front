import {Fragment} from "react";
import styles from "../styles/BoardTab.module.css";

export const BoardTab = () => {
    return (
        <Fragment>
            <div className={styles.container}>
                <div className={styles.container__search}>
                    {/* 검색 */}
                    <div className={styles.box__search}>
                        <input className={styles.input__search}/>
                        <button className={styles.btn__search}>검색</button>
                    </div>
                    {/* 지역 카테고리 */}
                    <div className={styles.box__region}>
                        <select className={styles.input__picker}>
                            <option>지역</option>
                            <option>서울</option>
                            <option>경기</option>
                            <option>충청</option>
                            <option>전라</option>
                        </select>
                    </div>
                    {/* 게시판 카테고리 */}
                    <div className={styles.box__cate}>
                        <select className={styles.input__picker}>
                            <option>카테고리</option>
                            <option>찾아주세요</option>
                            <option>봤어요</option>
                            <option>도와주세요</option>
                            <option>기타</option>
                        </select>
                    </div>
                    {/* 필터 */}
                    <div className={styles.filter}>
                        <select className={styles.input__picker}>
                            <option>최신순</option>
                            <option>조회순</option>
                            <option>인기순</option>
                        </select>
                    </div>
                </div>
                {/* 기간 */}
                <div className={styles.box__date}>
                    <div className={styles.text__date}>기간 :
                    </div>
                    <input className={styles.input__date}/>
                    <div>
                        ~
                    </div>
                    <input className={styles.input__date}/>
                </div>
                {/* 글쓰기, 관심목록 */}
                <div className={styles.box__option}>
                    <button className={styles.btn__edit}>글쓰기</button>
                    <div className={styles.box__check}>
                        <input type="checkbox" id="checkbox"/>
                        <label className={styles.label__check} htmlFor="checkbox">관심 목록 보기</label>
                    </div>
                </div>
            </div>
        </Fragment>
    )
}