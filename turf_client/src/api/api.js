import axios from "axios";

const API = axios.create({
    baseURL: "https://turf-hub.onrender.com/api"
})

API.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response && error.response.status === 401) {
            localStorage.removeItem("token");
            window.location.href("/login");
        }
        return Promise.reject(error);
    }
)

export default API;




// https://turf-hub.onrender.com/api