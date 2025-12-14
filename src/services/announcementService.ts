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

  async updateAnnouncement(id: string, data: any) {
    const response = await axios.put(`${API_BASE_URL}/announcements/${id}`, data);
    return response.data;
  },

  async deleteAnnouncement(id: string) {
    const response = await axios.delete(`${API_BASE_URL}/announcements/${id}`);
    return response.data;
  },
};
