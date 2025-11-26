import API_BASE_URL from "@/config/api";
import axios from "axios";

export const announcementService = {
  async getAnnouncements() {
    const response = await axios.get(`${API_BASE_URL}/announcements`);
    return response.data;
  },

  async createAnnouncement(data: any) {
    const response = await axios.post(`${API_BASE_URL}/announcements`, data);
    return response.data;
  },
};
