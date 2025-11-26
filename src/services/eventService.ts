import API_BASE_URL from "@/config/api";

export const eventService = {
  async getEvents() {
    const response = await fetch(`${API_BASE_URL}/events`);
    return response.json();
  },

  async createEvent(data: any) {
    const response = await fetch(`${API_BASE_URL}/events`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    return response.json();
  },
};
