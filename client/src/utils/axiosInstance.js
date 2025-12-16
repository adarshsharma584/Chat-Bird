import axios from "axios";

// Provide a sensible fallback for local development when VITE_API_URL isn't set.
const baseURL = import.meta.env.VITE_API_URL;

const axiosInstance = axios.create({
  baseURL,
  withCredentials: true,
});

export default axiosInstance;
