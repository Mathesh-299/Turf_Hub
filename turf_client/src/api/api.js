import axios from "axios";

const API = axios.create({
    baseURL: "https://turf-hub.onrender.com/api"
})

export default API;