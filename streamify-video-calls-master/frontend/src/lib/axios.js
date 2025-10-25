import axios from "axios";

const BASE_URL =
  import.meta.env.MODE === "development"
    ? "https://whispr-delta.vercel.app/"
    : "https://whispr-ysdh.onrender.com"; // 👈 replace with your actual Render backend URL

export const axiosInstance = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});
