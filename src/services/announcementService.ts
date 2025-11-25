import API_BASE_URL from "@/config/api";

export const announcementService = {
  async getAnnouncements() {
    const response = await fetch(`${API_BASE_URL}/announcements`);
    return response.json();
  },

  async createAnnouncement(data: any) {
    const response = await fetch(`${API_BASE_URL}/announcements`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    return response.json();
  },
};
