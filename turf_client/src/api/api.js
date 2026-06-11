import axios from "axios";

export const API_BASE_URL = "https://turf-hub.onrender.com/";
export const IMAGE_BASE_URL = API_BASE_URL.replace(/\/api$/, "");

const API = axios.create({
    baseURL: API_BASE_URL
})

API.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response && error.response.status === 401) {
            localStorage.removeItem("token");
            window.location.href = "/login";
        }
        return Promise.reject(error);
    }
)

export default API;