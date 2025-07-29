
// src/utils/axios.js (ou autre selon ton projet)
import axios from "axios";

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL, // 🔥 bien utilisé ici
  withCredentials: true,
});

API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token"); // récupère le token
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default API;
