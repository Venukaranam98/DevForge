import axios from "axios";

export const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:8000";

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("devforge_token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  
  const groqKey = localStorage.getItem("devforge_groq_key");
  if (groqKey) {
    config.headers["X-Groq-Api-Key"] = groqKey;
  }
  
  return config;
});

export default api;
