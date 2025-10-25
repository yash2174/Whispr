import axios from "axios";

const BASE_URL =
  import.meta.env.MODE === "development"
    ? "http://localhost:5001/api"
    : "https://whispr-ysdh.onrender.com/api"; // ✅ Your Render backend URL

export const axiosInstance = axios.create({
  baseURL: BASE_URL,
  withCredentials: true, // Important for cookies
});
