import axios from "axios";

const BASE_URL =
  import.meta.env.MODE === "development"
    ? "http://localhost:5001/api" // local backend
    : "https://whispr-ysdh.onrender.com/api"; // Render backend

export const axiosInstance = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});
