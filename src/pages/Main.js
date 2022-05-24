import React, { Fragment  } from "react";
import styled from "styled-components";
import { BoardComment } from "../components/BoardComment";
import { BoardContent } from "../components/BoardContent";

export const Main = () => {
    return (
        <Fragment>
            <div>
                <BoardContent />
            </div>
            <div>
                <BoardComment />
            </div>
        </Fragment>
    )
}