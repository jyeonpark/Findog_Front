import React, { Component } from "react";
import {Fragment} from "react"
import styled, { keyframes } from "styled-components";
import myImage from '../images/dog.jpeg';
import profile from '../images/profileImage.png'

const Container = styled.div`
    width: 850px;
    height: 160px;
    background-color: rgb(251, 223, 169);
    margin-left: auto;
    margin-right: auto;
    display: flex;
    padding: 20px; 
    margin-bottom: 30px;
`;

const Box1 = styled.div`
    width: 540px;
`;

const Box2 = styled.div`
    width: 200px;
    height: 120px;
    background-color: red;
    margin-left: auto;
    margin-right: auto;
`;

const Title = styled.div`
    width: 550px;
    font-weight: bold;
    font-size: large;
    text-align: start;
    padding-inline-start: 4px;
 `;

const Content = styled.div`
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    width: 550px;
    height: 40px;
    line-height: 20px;
    overflow: hidden;
    text-overflow: ellipsis;

    margin-top: 10px;
    margin-bottom: 20px;
`;

const BoxProfile = styled.div`
    display: flex;
    text-align: center;
    font-size: small;
`;

const TextInfo = styled.div`
    margin-right: 5px;
    margin-top: 3px;
`;

const BoxProfilePhoto = styled.div`
    margin-right: 10px;
`;

const BoxPhoto = styled.div`
`;

const Photo = styled.img`
    object-fit: fill;
    width: 230px;
    height: 120px;
`;

const ProfileImage = styled.img`
    width: 20px;
`;

export const BoardBox = () => {

    return (
        <Fragment>
            <Container>
                <Box1>
                    <Title>
                        강사모 - 반려견 훈련 교육법, 강아지 종류 유기견 입양 방법 안내
                    </Title>
                    <Content>
                        저희 뽀삐가 항상 말을 안듣더라구요... ㅠㅠ 항상 사람들만 보면 저렇게 물려고 웃으면서 쳐다봐요 저희 뽀삐가 항상 말을 안듣더라구요... ㅠㅠ
                        항상 사람들만 보면 저렇게 물려고 웃으면서 쳐다봐요 흑...
                    </Content>
                    <BoxProfile>
                        <BoxProfilePhoto>
                            <ProfileImage alt="profile" src={profile}/>
                        </BoxProfilePhoto>
                        <TextInfo>도키도키</TextInfo>
                        <TextInfo>좋아요</TextInfo>
                        <TextInfo>댓글</TextInfo>
                        <TextInfo>조회수</TextInfo>
                    </BoxProfile>
                </Box1>
                <Box2>
                    <Photo alt="profile" src={myImage}/>
                </Box2>

            </Container>

        </Fragment>
    )
}