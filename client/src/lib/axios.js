import axios from 'axios';

const BASE_URL = import.meta.env.MODE === "development" ? "http://localhost:5000" : "/api";
// todo : update base url to make it work in deployment
export const axiosInstance = axios.create({
    baseURL: "https://swipematch.onrender.com/api",
    withCredentials: true,
})