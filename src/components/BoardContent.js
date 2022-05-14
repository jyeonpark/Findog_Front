import React, { Fragment, useEffect, useState } from "react";
import styled from "styled-components";
import axios from "axios";
// import { propTypes } from "react-bootstrap/esm/Image";
// import setAuthorizationToken from "../utils/setAuthorizationToken";
// import { getAllByPlaceholderText } from "@testing-library/react";
import API from "./../utils/api";
import dogImg from "../images/dog.jpeg";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";


const Container = styled.div`
  width: 1000px;
  height: auto;
  padding: 30px;
  margin-left: auto;
  margin-right: auto;
  /* border-color: orange; */
  border: 2px orange solid;
`;
const ProfileBox = styled.div`
  width: max-content;
  /* background-color: black; */
  display: flex;
`;
const ProfileImage = styled.div`
  margin-right: 10px;
`;

const ProfileImageShow = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 30%;
  object-fit: fill;
`;
const ProfileInfo = styled.div`
  width: fit-content;
  height: fit-content;
`;
const ProfileName = styled.div`
  text-align: left;
  font-size: 20px;
  font-weight: bold;
`;
const ProfileDate = styled.div`
  font-size: 15px;
`;
const TitleBox = styled.div`
  display: flex;
  margin-top: 15px;
`;
const Category = styled.div`
  height: 50px;
  padding-left: 10px;
  padding-right: 10px;
  text-align: center;
  line-height: 50px;
  font-size: 35px;
  color: gray;
  background-color: rgba(243, 156, 18, 0.22);
`;
const Title = styled.div`
  height: 50px;
  margin-left: 15px;
  font-size: 25px;
  font-weight: bold;
  line-height: 50px;
`;
const ContentBox = styled.div`
  font-size: 20px;
  text-align: left;
`;
const ExtraBox = styled.div`
  width: 1000px;
  margin-left: auto;
  margin-right: auto;
  margin-top: 15px;
  display: flex;
  justify-content: space-between;
`;
const ExtraInfo = styled.div`
  border: 2px solid rgba(64, 64, 64, 0.5);
  padding-left: 10px;
  padding-right: 10px;
  font-size: 15px;
  font-weight: bold;
  line-height: 30px;
`;
const ExtraButton = styled.div``;

const Button = styled.button`
  font-size: large;
  font-weight: bold;
  padding-left: 10px;
  padding-right: 10px;
  margin-left: 10px;
  background-color: white;
  border: 2px solid rgba(64, 64, 64, 0.5);
`;

const ImgBox = styled.div`
    text-align: left;
`;

const Img = styled.img`
    width: 300px;
    height: 300px;
`;

export const BoardContent = ({ postId }) => {
    // 1: "기타",
    // 2: "찾아주세요",
    // 3: "봤어요",
    // 4: "도와주세요",

    const [categoryText, setCategoryText] = useState("기타");
    const [checkState, setCheckState] = useState(true);
    const [deleteCheck, setDeleteCheck] = useState(false);

    const WEEKDAY = ['월', '화', '수', '목', '금', '토', '일'];

    // input 받을 것
    const [inputs, setInputs] = useState({
        postId: 92,
        userId: 43,
        nickname: "",
        userImgUrl: "https://www.google.com/imgres?imgurl=https%3A%2F%2Fwww.princeton.edu%2Fsites%2Fdefault%2Ffiles%2Fstyles%2Fhalf_2x%2Fpublic%2Fimages%2F2022%2F02%2FKOA_Nassau_2697x1517.jpg%3Fitok%3DiQEwihUn&imgrefurl=https%3A%2F%2Fwww.princeton.edu%2Fnews%2F2022%2F02%2F02%2Fwhat-your-dogs-lifespan-you-might-be-surprised&tbnid=vEgZce8uNit9PM&vet=12ahUKEwiEj9TAi9r3AhV8xosBHTBpAGYQMygAegUIARC3AQ..i&docid=y-9b3DnaEkm6oM&w=1920&h=1080&q=dog&ved=2ahUKEwiEj9TAi9r3AhV8xosBHTBpAGYQMygAegUIARC3AQ",
        title: "",
        category: 1,
        thumbnail: "",
        content: "",
        postCreateAt: "",
        likeCount: 0,
        commentCount: 0,
        hits: 0,
    });

    const [userLiked, setUserLiked] = useState(false);
    const [imgList, setImgList] = useState([]);

    useEffect(() => {

        API.get("/boards/" + postId, {
            headers: {
                "X-ACCESS-TOKEN": sessionStorage.getItem("userJWT"),
            },
        })
            .then((response) => {
                // input 받는 부분
                setInputs({
                    postId: response.data.result.board.postId,
                    userId: response.data.result.board.userId,
                    nickname: response.data.result.board.nickname,
                    userImgUrl: response.data.result.board.userImgUrl,
                    title: response.data.result.board.title,
                    category: response.data.result.board.category,
                    content: response.data.result.board.content,
                    thumbnail: "",
                    postCreateAt: response.data.result.board.postCreateAt,
                    likeCount: response.data.result.board.likeCount,
                    commentCount: response.data.result.board.commentCount,
                    hits: response.data.result.board.hits,
                });
                setUserLiked(response.data.result.userLiked);
                setImgList(response.data.result.imgList);

                console.log("BoardContent inputs test");
                console.log(response.data);
                console.log(inputs);
            })
            .catch((err) => console.log("error:", err));

        // console.log("inputs : ", inputs);

        if (inputs.userId == sessionStorage.getItem("userID")) {
            setCheckState(true);
        } else {
            setCheckState(false);
        }

    }, []);

    useEffect(() => {
        // 카테고리
        switch (inputs.category) {
            case 1:
                setCategoryText("기타");
                break;
            case 2:
                setCategoryText("찾아주세요");
                break;
            case 3:
                setCategoryText("봤어요");
                break;
            case 4:
                setCategoryText("도와주세요");
                break;
            default:
                setCategoryText("default");
                break;
        }
    }, [inputs.category]);


    // Date객체 내용 빼서 형식에 맞춰서 return
    const dateTrans = () => {

        let date = new Date(inputs.postCreateAt);
        let week = WEEKDAY[date.getDay()];

        date =
            date.getFullYear() +
            "년" +
            (date.getMonth() + 1) +
            "월" +
            date.getDate() +
            "일 (" +
            week +
            ") " +
            date.getHours() +
            ":" +
            date.getMinutes();

        console.log(date);
        return date;
    }

    const onClickPatch = () => {

    }

    const onClickLiked = () => {

        const data = {
            "userId": sessionStorage.getItem("userID")
        }

        if(userLiked == true) {
            API.delete("/boards/like", {
                headers: {
                    "X-ACCESS-TOKEN": sessionStorage.getItem("userJWT")
                },
                body: {
                    userId: sessionStorage.getItem("userID")
                }
            })
            .then((response) => {
                console.log(response.data);
                setUserLiked(false);
            })
            console.log("unlike");
        }
        else {
            API.post("/boards/like", data, {
                headers: {
                    "X-ACCESS-TOKEN": sessionStorage.getItem("userJWT")
                }
            })
            .then((response) => {
                console.log(response.data);
                setUserLiked(true);
            })
            console.log("like");
        }
        // window.location.reload();
    }

    const onClickDelete = () => {
        API.delete("/boards/" + postId, {
            headers: {
                "X-ACCESS-TOKEN": sessionStorage.getItem("userJWT")
            },
            body: {
                userId: sessionStorage.getItem("userID")
            }
        })
        .then((response) => console.log(response.data))
    }


    // console.log("inputs : ", inputs);

    return (
        <Fragment>
            <Container>
                <ProfileBox>
                    <ProfileImage>
                        <ProfileImageShow src={dogImg} />
                    </ProfileImage>
                    <ProfileInfo>
                        <ProfileName>{inputs.nickname}</ProfileName>
                        <ProfileDate>{dateTrans()}</ProfileDate>
                    </ProfileInfo>
                </ProfileBox>
                <TitleBox>
                    <Category>{categoryText}</Category>
                    <Title>{inputs.title}</Title>
                </TitleBox>
                <hr />

                <ContentBox>
                    {inputs.content}
                </ContentBox>
                <ImgBox>
                    {imgList.map((image) => (
                        <Img
                            src={image}
                        />
                    ))}
                </ImgBox>
                
            </Container>
            <ExtraBox>
                <ExtraInfo>
                    좋아요 {inputs.likeCount} 댓글 {inputs.commentCount} 조회수 {inputs.hits} {" "}
                    {userLiked ? 
                    <FontAwesomeIcon style={{color: "black"}} icon={faHeart} onClick={onClickLiked}/>
                    :
                    <FontAwesomeIcon style={{color: "#BDBDBD"}} icon={faHeart} onClick={onClickLiked} />    
                    }
                </ExtraInfo>
                
                <ExtraButton>
                    {checkState ? (<Button>수정</Button>) : null}
                    <Link to="/board">
                    {checkState ? (<Button onClick={onClickDelete}>삭제</Button>) : null}
                    </Link>
                </ExtraButton>
            </ExtraBox>
        </Fragment>
    );
};




BoardContent.defaultProps = {
    postId: 1,
};