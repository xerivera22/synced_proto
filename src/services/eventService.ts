import API_BASE_URL from "@/config/api";

export const eventService = {
  async getEvents() {
    const response = await fetch(`${API_BASE_URL}/events`);
    if (!response.ok) {
      throw new Error('Failed to fetch events');
    }
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

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({ message: 'Failed to create event.' }));
      throw new Error(errorData.message || 'An unknown error occurred.');
    }
    
    return response.json();
  },

  async updateEvent(id: string, data: any) {
    const response = await fetch(`${API_BASE_URL}/events/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({ message: 'Failed to update event.' }));
      throw new Error(errorData.message || 'An unknown error occurred.');
    }
    
    return response.json();
  },

  async deleteEvent(id: string) {
    const response = await fetch(`${API_BASE_URL}/events/${id}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({ message: 'Failed to delete event.' }));
      throw new Error(errorData.message || 'An unknown error occurred.');
    }
    
    return response.json();
  },
};
