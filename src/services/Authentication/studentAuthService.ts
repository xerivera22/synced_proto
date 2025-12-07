import API_BASE_URL from "@/config/api";
import axios from "axios";

export const studentAuthService = {
  async login(email: string, password: string) {
    try {
      const response = await axios.post(`${API_BASE_URL}/auth/student/login`, {
        email,
        password,
      });
      return response.data;
    } catch (error: any) {
      console.error("Login error:", error);
      // Return error response so UI can display it
      if (error.response) {
        return error.response.data;
      }
      throw error;
    }
  },

  async register(studentData: any) {
    try {
      const response = await axios.post(
        `${API_BASE_URL}/auth/student/register`,
        studentData
      );
      return response.data;
    } catch (error) {
      console.error("Error:", error);
    }
  },

  async getProfile(studentId: string) {
    const response = await axios.get(
      `${API_BASE_URL}/auth/student/profile/${studentId}`
    );
    return response.data;
  },
};
