import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";

import Header from "./components/Header";
import { Login } from "./pages/Login";
import Tab from "./components/Tab";
import SignUp from './pages/SignUp';

ReactDOM.render(
  <React.StrictMode>
    <Header />
    <Tab />
    <SignUp />
  </React.StrictMode>,
  document.getElementById("root")
);

reportWebVitals();
