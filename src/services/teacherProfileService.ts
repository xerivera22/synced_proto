import API_BASE_URL from "@/config/api";

export const teacherProfileService = {
  async getTeacherProfiles() {
    const response = await fetch(`${API_BASE_URL}/teacher-profiles`);
    if (!response.ok) {
      throw new Error('Failed to fetch teacher profiles');
    }
    return response.json();
  },

  async getTeacherProfileById(id: string) {
    const response = await fetch(`${API_BASE_URL}/teacher-profiles/${id}`);
    if (!response.ok) {
      throw new Error('Failed to fetch teacher profile');
    }
    return response.json();
  },

  async createTeacherProfile(data: any) {
    const response = await fetch(`${API_BASE_URL}/teacher-profiles`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({ message: 'Failed to create teacher profile.' }));
      throw new Error(errorData.message || 'An unknown error occurred.');
    }
    return response.json();
  },

  async updateTeacherProfile(id: string, data: any) {
    const response = await fetch(`${API_BASE_URL}/teacher-profiles/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({ message: 'Failed to update teacher profile.' }));
      throw new Error(errorData.message || 'An unknown error occurred.');
    }
    return response.json();
  },

  async deleteTeacherProfile(id: string) {
    const response = await fetch(`${API_BASE_URL}/teacher-profiles/${id}`, {
      method: "DELETE",
    });
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({ message: 'Failed to delete teacher profile.' }));
      throw new Error(errorData.message || 'An unknown error occurred.');
    }
    return response.json();
  },
};
