import React, {Fragment, useEffect, useState} from "react";
import styled from "styled-components";
import axios from "axios";
import {propTypes} from "react-bootstrap/esm/Image";
import setAuthorizationToken from "../utils/setAuthorizationToken";
import { getAllByPlaceholderText } from "@testing-library/react";

const Container = styled.div `
    width: 1000px;
    height: auto;
    padding: 30px;
    margin-left: auto;
    margin-right: auto;
    /* border-color: orange; */
    border: 2px orange solid;
`;
const ProfileBox = styled.div `
    width: max-content;
    /* background-color: black; */
    display: flex;
    
`;
const ProfileImage = styled.div `
    margin-right: 10px;
`;

const ProfileImageShow = styled.img`
    width: 50px;
    height: 50px;
    border-radius: 30%;
    object-fit: fill;
`;
const ProfileInfo = styled.div `
    width: fit-content;
    height: fit-content;
`;
const ProfileName = styled.div `
    font-size: 20px;
    font-weight: bold;
`;
const ProfileDate = styled.div `
    font-size: 15px;
`;
const TitleBox = styled.div `
    display: flex;
    margin-top: 15px;
`;
const Category = styled.div `
    height: 50px;
    padding-left: 10px;
    padding-right: 10px;
    text-align: center;
    line-height: 50px;
    font-size: 35px;
    color: gray;
    background-color: rgba(243,156,18, 0.22);
`;
const Title = styled.div `
    height: 50px;
    margin-left: 15px;
    font-size: 25px;
    font-weight: bold;
    line-height: 50px;
`;
const ContentBox = styled.div `
    font-size: 20px;
`;
const ExtraBox = styled.div `
    width: 1000px;
    margin-left: auto;
    margin-right: auto;
    margin-top: 15px;
    display: flex;
    justify-content: space-between;
`;
const ExtraInfo = styled.div `
    border: 2px solid rgba(64,64,64,0.5);
    padding-left: 10px;
    padding-right: 10px;
    font-size: 15px;
    font-weight: bold;
    line-height: 30px;
`;
const ExtraButton = styled.div `
`;

const Button = styled.button `
    font-size: large;
    font-weight: bold;
    padding-left: 10px;
    padding-right: 10px;
    margin-left: 10px;
    background-color: white;
    border: 2px solid rgba(64,64,64,0.5);
`;

export const BoardContent = ({postId}) => {

    // 1: "기타",
    // 2: "찾아주세요",
    // 3: "봤어요",
    // 4: "도와주세요",
    
    const [categoryText, setCategoryText] = useState("기타");
    
    
    // const [inputs, setInputs] = useState({
    //     category: 2,
    //     content: "Test Content 뚱뚱이는 저에게 유일한 가족입니다... ㅁㄴㅇㅁㄴㅇㅁㄴㅇㅁㄴㅇㅁㄴㅇㅁㄴㅇㅁㄴㅇㅁㄴㅇㅁ니ㅓㅇㅊㅁ오밍ㅁㅈ니ㅏㅇㅁㅈ니ㅏ오ㅓ마ㅓㅗ임지ㅏㅓㅇㅁ지낭미ㅏ",
    //     hits: 205,
    //     userImgUrl: "",
    //     imgUrl: [],
    //     likeCount: 50,
    //     postCreateAt: "2020.02.02 (목) 22:45",
    //     title: "Test Title",
    //     userId: 0,
    //     nickName: "Test NickName",
    //     commentCount: 7
    // });

    const [inputs, setInputs] = useState({
        userId: 1,
        nickname: "",
        userImgUrl: "",
        title: "",
        category: 1,
        content: "",
        postCreateAt: "",
        likeCount: 0,
        commentCount: 0,
        hits: 0,
        userLiked: false
    });

    useEffect(() => {

        console.log("Content component start");
        console.log("postId: " + postId)


        axios.get('http://3.39.156.161:8080/boards/' + postId, {
            headers: {
                "X-ACCESS-TOKEN": sessionStorage.getItem("userJWT"),
            },
        })
        // .then((response) => setInputs({
        //     userId: response.data.result.board.userId,
        //     nickname: response.data.result.board.nickname,
        //     userImgUrl: response.data.result.board.userImgUrl,
        //     title: response.data.result.board.title,
        //     category: response.data.result.board.category,
        //     content: response.data.result.board.content,
        //     postCreateAt: response.data.result.board.postCreateAt,
        //     likeCount: response.data.result.board.likeCount,
        //     commentCount: response.data.result.board.commentCount,
        //     hits: response.data.result.board.hits,
        //     userLiked: response.data.result.board.userLiked
        // }))
        .then((response) => console.log(response.data.result))
        // .then((response) => console.log("response:", response.data))
        .catch(err =>console.log("error:", err)); 

        
    
        var date = new Date(inputs.postCreateAt);
        date = date.getFullYear() + "." + (date.getMonth()+1) + "." + date.getDate() + " " + date.getHours() + ":" + date.getMinutes();
        console.log(date)

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

    return (
        <Fragment>
            <Container>
                <ProfileBox>
                    <ProfileImage>
                        <ProfileImageShow src={require("../images/dog2.jpeg")}/>
                    </ProfileImage>
                    <ProfileInfo>
                        <ProfileName>{inputs.nickName}</ProfileName>
                        <ProfileDate>{inputs.postCreateAt}</ProfileDate>
                    </ProfileInfo>
                </ProfileBox>
                <TitleBox>
                    <Category>{categoryText}</Category>
                    <Title>{inputs.title}</Title>
                </TitleBox>
                <hr/>

                <ContentBox>{inputs.content}</ContentBox>

            </Container>
            <ExtraBox>
                <ExtraInfo>좋아요 {inputs.likeCount} 댓글 {inputs.commentCount} 조회수 {inputs.hits}</ExtraInfo>
                <ExtraButton>
                    <Button>수정</Button>
                    <Button>삭제</Button>
                    </ExtraButton>
            </ExtraBox>
        </Fragment>
    );
}

BoardContent.defaultProps = {
    postId: 1
}
