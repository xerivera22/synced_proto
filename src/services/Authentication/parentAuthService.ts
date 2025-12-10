import API_BASE_URL from "@/config/api";
import axios from "axios";

export const parentAuthService = {
  async login(email: string, password: string) {
    try {
      const response = await axios.post(`${API_BASE_URL}/auth/parent/login`, {
        email,
        password,
      });
      return response.data;
    } catch (error) {
      console.error("Error:", error);
      throw error; // Important: re-throw the error so it can be caught by the calling function
    }
  },

  async register(parentData: any) {
    try {
      const response = await axios.post(
        `${API_BASE_URL}/auth/parent/register`,
        parentData
      );
      return response.data;
    } catch (error) {
      console.error("Error:", error);
      throw error;
    }
  },
};
