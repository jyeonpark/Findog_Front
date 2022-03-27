import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import {Login} from './pages/Login';
import Tab from './components/Tab'
import Header from './components/Header';


ReactDOM.render(
  <React.StrictMode>
    <Header/>
    <Tab/>
    <Login/>
  </React.StrictMode>,
  document.getElementById("root")
);

reportWebVitals();
