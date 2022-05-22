import React, { Component, Fragment, useEffect, useState  } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { BoardComment } from "../components/BoardComment";
import { BoardContent } from "../components/BoardContent";
import MyBoard from './../components/MyBoard';
import { useLocation } from "react-router-dom";


export const BoardDetail = () => {
    const location = useLocation();
    const myBoard = location.state.myBoard;
    let { postId } = useParams();


    return (
        <Fragment>
            <div>
                <BoardContent postId={postId} myBoard={myBoard}/>
            </div>
            <div>
                <BoardComment postId={postId}/>
            </div>
        </Fragment>
    );
}

