import React, {Component} from "react";
import {BrowserRouter, Routes, Route} from "react-router-dom";
import "./App.css";
import Header from "./components/Header";
import Tab from "./components/Tab";
import {Main} from "./pages/Main";
import {Login} from "./pages/Login";
import {NotFound} from "./pages/NotFound";
import SignUp from "./pages/SignUp";

function App() {
    return (
        <div className="App">
            <BrowserRouter>
                <Header />
                <Tab />
                <Routes>
                    <Route path="/" element={<Main />}></Route>
                    <Route path="/login" element={<Login />}></Route>
                    <Route path="*" element={<NotFound />}></Route>
                    <Route path="/signUp" element={<SignUp />}></Route>
                </Routes>

            </BrowserRouter>
        </div>
    );
}

export default App;
