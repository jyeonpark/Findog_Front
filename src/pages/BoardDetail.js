import React, { Component, Fragment, useEffect, useState  } from "react";
import styled from "styled-components";
import { BoardComment } from "../components/BoardComment";
import { BoardContent } from "../components/BoardContent";


export const BoardDetail = () => {


    return (
        <Fragment>
            <div>
                <BoardContent />
            </div>
            <div>
                <BoardComment />
            </div>
        </Fragment>
    );
}