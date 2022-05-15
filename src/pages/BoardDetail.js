import React, { Component, Fragment, useEffect, useState  } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { BoardComment } from "../components/BoardComment";
import { BoardContent } from "../components/BoardContent";


export const BoardDetail = () => {
    let { postId } = useParams();
    console.log("==BoardDetail Start==");
    console.log("postId : ",postId);

    

    return (
        <Fragment>
            <div>
                <BoardContent postId={postId}/>
            </div>
            <div>
                <BoardComment postId={postId}/>
            </div>
        </Fragment>
    );
}

