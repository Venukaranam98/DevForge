import axios from "axios";

export const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:8000";

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 300000, // 5 minutes for AI project generation
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

// Request Interceptor: Attach JWT token and custom headers
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("devforge_token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    const groqKey = localStorage.getItem("devforge_groq_key");
    if (groqKey) {
      config.headers["X-Groq-Api-Key"] = groqKey;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

// Response Interceptor: Handle global response errors and 401 unauthorized
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      const currentPath = window.location.pathname;
      const isAuthEndpoint = error.config.url?.includes("/auth/login") || error.config.url?.includes("/auth/register");
      if (!isAuthEndpoint) {
        localStorage.removeItem("devforge_token");
        localStorage.removeItem("devforge_user");
      }
    }
    return Promise.reject(error);
  }
);

export default api;
