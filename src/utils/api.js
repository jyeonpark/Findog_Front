import axios from "axios";

const API =  axios.create({
    baseURL: 'http://3.39.156.161:8080',
    timeout: 30000,
})

export default API;