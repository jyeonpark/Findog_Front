import React, { Fragment } from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import {BoardDetail} from "./pages/BoardDetail";
import {Main} from "./pages/Main";

ReactDOM.render(
  <React.StrictMode>
    <App />
    {/* <BoardDetail /> */}
  </React.StrictMode>,
  document.getElementById("root")
);

reportWebVitals();
