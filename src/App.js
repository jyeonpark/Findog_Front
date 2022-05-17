import React, { Component, useState, useEffect, useContext } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Header from "./components/Header";
import Tab from "./components/Tab";
import Login from "./pages/Login";
import { NotFound } from "./pages/NotFound";
import SignUp from "./pages/SignUp";
import { BoardEditor } from "./components/BoardEditor";
import { Board } from "./pages/Board";
import AbandonedAnimal from "./pages/AbandonedAnimal";
import MyPage from "./pages/MyPage";
import { BoardDetail } from "./pages/BoardDetail";
import CenterMap from './pages/CenterMap';
import { BoardUpdate } from "./components/BoardUpdate";


function App() {
  // 로그인 상태 관리
  const [isLogin, setIsLogin] = useState(sessionStorage.getItem("userJWT") != null ? true : false);

  useEffect(() => {
    if (isLogin === false) {
      console.log("false");
    } else {
      console.log("true");
    }
  });

  const currentTab = () => {
    let path = window.location.pathname;
    if (path == "/") return 1;
    else if (path == "/board") return 2;
    else if (path == "/*") return 3;
    else if (path.includes("/mypage/")) return 4;
  };

  const [tabMenu, setTabMenu] = useState(currentTab);

  const tabMenuChange = (tabMenu) => {
    setTabMenu(tabMenu);
  };

  const isLoginChange = (isLogin) => {
    setIsLogin(isLogin);
  };

  return (
    <div className="App">
      <BrowserRouter>
        <Header tabMenu={tabMenu} tabMenuChange={tabMenuChange} isLogin={isLogin} isLoginChange={isLoginChange}/>
        <Tab tabMenu={tabMenu} tabMenuChange={tabMenuChange} />
        <Routes>
          <Route path="/" element={<AbandonedAnimal />}></Route>
          <Route path="/board" element={<Board />}></Route>
          <Route path="/centermap" element={<CenterMap/>}></Route>
          <Route path="*" element={<NotFound />}></Route>
          <Route path="/mypage/*" element={<MyPage />}></Route>
          <Route path="/signup" element={<SignUp />}></Route>
          <Route path="/board/edit" element={<BoardEditor />}></Route>
          <Route path="/board/update" element={<BoardUpdate />}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/board/detail/:postId"  element={<BoardDetail />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
