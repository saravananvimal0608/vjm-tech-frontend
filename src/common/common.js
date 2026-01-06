import axios from "axios";

const API = axios.create({
    baseURL: process.env.REACT_APP_BASE_URL + "/api",
    headers: {
        "Content-Type": "application/json",
    },
});

API.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("token"); 
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export const postApi = (url, data) => API.post(url, data);
export const getApi = (url) => API.get(url);
export const putApi = (url, data) => API.put(url, data);
export const deleteApi = (url) => API.delete(url);

export default API;
