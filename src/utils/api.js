import axios from "axios";

const API =  axios.create({
   
    baseURL: 'https://findog-server.shop',
    timeout: 30000,
    
})

export default API;