import axios from "axios";

const API =  axios.create({

    baseURL: 'https://findog-server.shop',

})

export default API;