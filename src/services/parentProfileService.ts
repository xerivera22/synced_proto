import API_BASE_URL from "@/config/api";

export const parentProfileService = {
  async getParentProfiles() {
    const response = await fetch(`${API_BASE_URL}/parent-profiles`);
    if (!response.ok) {
      throw new Error('Failed to fetch parent profiles');
    }
    return response.json();
  },

  async getParentProfileById(id: string) {
    const response = await fetch(`${API_BASE_URL}/parent-profiles/${id}`);
    if (!response.ok) {
      throw new Error('Failed to fetch parent profile');
    }
    return response.json();
  },

  async createParentProfile(data: any) {
    const response = await fetch(`${API_BASE_URL}/parent-profiles`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({ message: 'Failed to create parent profile.' }));
      throw new Error(errorData.message || 'An unknown error occurred.');
    }
    return response.json();
  },

  async updateParentProfile(id: string, data: any) {
    const response = await fetch(`${API_BASE_URL}/parent-profiles/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({ message: 'Failed to update parent profile.' }));
      throw new Error(errorData.message || 'An unknown error occurred.');
    }
    return response.json();
  },

  async deleteParentProfile(id: string) {
    const response = await fetch(`${API_BASE_URL}/parent-profiles/${id}`, {
      method: "DELETE",
    });
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({ message: 'Failed to delete parent profile.' }));
      throw new Error(errorData.message || 'An unknown error occurred.');
    }
    return response.json();
  },
};
