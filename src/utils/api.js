import axios from "axios";

const API = axios.create({
  baseURL: "",
  timeout: 30000,
});

export default API;
