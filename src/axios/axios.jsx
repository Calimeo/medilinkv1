import axios from "axios";

const api = axios.create({
    baseURL: "https://backend-medilink-2.onrender.com",

})

export default api;
