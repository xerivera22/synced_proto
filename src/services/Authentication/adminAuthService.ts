import API_BASE_URL from "@/config/api";
import axios from "axios";

export const adminAuthService = {
  async login(email: string, password: string) {
    const response = await axios.post(`${API_BASE_URL}/auth/admin/login`, {
      email,
      password,
    });
    return response.data;
  },

  async register(adminData: any) {
    const response = await axios.post(
      `${API_BASE_URL}/auth/admin/register`,
      adminData
    );
    return response.data;
  },
};
