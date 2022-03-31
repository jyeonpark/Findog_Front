import {Fragment} from "react"
import styles from "../styles/BoardBox.module.css";
import myImage from '../images/dog.jpeg';
import profile from '../images/profileImage.png'

export const BoardBox = () => {

    return (
        <> < div className = {
            styles.container
        } > <div className={styles.box1}>
            <div className={styles.title}>
                강사모 - 반려견 훈련 교육법, 강아지 종류 유기견 입양 방법 안내
            </div>
            <div className={styles.content}>
                저희 뽀삐가 항상 말을 안듣더라구요... ㅠㅠ 항상 사람들만 보면 저렇게 물려고 웃으면서 쳐다봐요 저희 뽀삐가 항상 말을 안듣더라구요... ㅠㅠ 항상 사람들만 보면 저렇게 물려고 웃으면서 쳐다봐요 흑...
            </div>
            <div className={styles.box__profile}>
                <div className={styles.box__profile__photo}>
                    <img className={styles.profile__image} alt="profile" src={profile}/>
                </div>
                <div className={styles.text__info}>도키도키</div>
                <div className={styles.text__info}>좋아요</div>
                <div className={styles.text__info}>댓글</div>
                <div className={styles.text__info}>조회수</div>
            </div>
        </div>
        <div className={styles.box2}>
            <img className={styles.photo} alt="profile" src={myImage}/>
        </div>

    </div>

</>
    )
}