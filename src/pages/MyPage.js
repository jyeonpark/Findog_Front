import React, { Component, useState, useEffect } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  useNavigate,
} from "react-router-dom";
import MyPageTab from "../components/MyPageTab";
import styled from "styled-components";
import MyBoard from "./../components/MyBoard";
import MyComment from "./../components/MyComment";
import MyInterestedAnimal from "./../components/MyInterestedAnimal";
import MyInterestedBoard from "./../components/MyInterestedBoard";
import EditMyInfo from "./../components/EditMyInfo";
import { Nav } from "react-bootstrap";

const Container = styled.div`
  width: 1000px;
  display: flex;
  white-space: nowrap;
  margin-left: auto;
  margin-right: auto;
`;

function MyPage() {
  return (
    <Container>
      <MyPageTab></MyPageTab>
      <Routes>
        <Route path="" element={<MyBoard />}></Route>

        <Route path="my_comment" element={<MyComment />}></Route>

        <Route
          path="my_interested_animal"
          element={<MyInterestedAnimal />}
        ></Route>

        <Route
          path="my_interested_board"
          element={<MyInterestedBoard />}
        ></Route>
        <Route path="edit_info" element={<EditMyInfo />}></Route>

        <Route path="*" element={<Navigate to="/mypage" replace />} />
      </Routes>
    </Container>
  );
}

export default MyPage;
