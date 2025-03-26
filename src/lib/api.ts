import axios from "axios";

const API_URL = process.env.NODE_ENV === "development" ? "http://localhost:8080/api/" : process.env.NEXT_PUBLIC_API_URL

export const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use(
  (config) => {
    const token = typeof window !== "undefined" ? localStorage.getItem("access_token") : null;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);


api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      console.log("Token expired or invalid");
      localStorage.removeItem("access_token");
    }
    return Promise.reject(error);
  }
);
