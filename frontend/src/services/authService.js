import api from "./api";

export const authService = {
  async login(email, password) {
    const response = await api.post("/api/v1/auth/login", { email, password });
    const { access_token, user } = response.data;
    if (access_token) {
      localStorage.setItem("devforge_token", access_token);
      localStorage.setItem("devforge_user", JSON.stringify(user));
    }
    return { token: access_token, user };
  },

  async register(email, password, fullName) {
    const response = await api.post("/api/v1/auth/register", {
      email,
      password,
      full_name: fullName,
    });
    const { access_token, user } = response.data;
    if (access_token) {
      localStorage.setItem("devforge_token", access_token);
      localStorage.setItem("devforge_user", JSON.stringify(user));
    }
    return { token: access_token, user };
  },

  async getMe() {
    try {
      const response = await api.get("/api/v1/auth/me");
      if (response.data) {
        localStorage.setItem("devforge_user", JSON.stringify(response.data));
      }
      return response.data;
    } catch (err) {
      this.logout();
      throw err;
    }
  },

  logout() {
    localStorage.removeItem("devforge_token");
    localStorage.removeItem("devforge_user");
  },

  getCurrentUser() {
    const userStr = localStorage.getItem("devforge_user");
    if (!userStr) return null;
    try {
      return JSON.parse(userStr);
    } catch {
      return null;
    }
  },

  getToken() {
    return localStorage.getItem("devforge_token");
  },
};
