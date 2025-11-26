import API_BASE_URL from "@/config/api";
import axios from "axios";

export const teacherAuthService = {
  async login(email: string, password: string) {
    const response = await axios.post(`${API_BASE_URL}/auth/teacher/login`, {
      email,
      password,
    });
    return response.data;
  },

  async register(teacherData: any) {
    const response = await axios.post(
      `${API_BASE_URL}/auth/teacher/register`,
      teacherData
    );
    return response.data;
  },

  async getProfile(employeeId: string) {
    const response = await axios.get(
      `${API_BASE_URL}/auth/teacher/profile/${employeeId}`
    );
    return response.data;
  },
};
