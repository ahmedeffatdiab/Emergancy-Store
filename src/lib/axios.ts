// lib/axios.ts
import axios from "axios";
import { toast } from "sonner";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.response.use(
  res => res,
  error => {
    if (!error.response) {
      toast.error("Network error: Please check your internet connection.");
    }
    return Promise.reject(error);
  }
);

export default api;
