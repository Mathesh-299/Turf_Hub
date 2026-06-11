import axios from "axios";

export const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5678/api";
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