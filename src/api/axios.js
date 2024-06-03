import axios from "axios";


export const axiosPrivate = axios.create({
    baseURL: import.meta.env.VITE_API_URL || "http://localhost:8080",
    withCredentials: true,
    headers: {
        "Content-Type": "application/json",

    }
})
