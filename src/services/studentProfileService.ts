import API_BASE_URL from "@/config/api";

export const studentProfileService = {
  async getStudentProfiles() {
    const response = await fetch(`${API_BASE_URL}/student-profiles`);
    if (!response.ok) {
      throw new Error('Failed to fetch student profiles');
    }
    return response.json();
  },

  async getStudentProfileById(id: string) {
    const response = await fetch(`${API_BASE_URL}/student-profiles/${id}`);
    if (!response.ok) {
      throw new Error('Failed to fetch student profile');
    }
    return response.json();
  },

  async createStudentProfile(data: any) {
    const response = await fetch(`${API_BASE_URL}/student-profiles`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({ message: 'Failed to create student profile.' }));
      throw new Error(errorData.message || 'An unknown error occurred.');
    }
    return response.json();
  },

  async updateStudentProfile(id: string, data: any) {
    const response = await fetch(`${API_BASE_URL}/student-profiles/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({ message: 'Failed to update student profile.' }));
      throw new Error(errorData.message || 'An unknown error occurred.');
    }
    return response.json();
  },

  async deleteStudentProfile(id: string) {
    const response = await fetch(`${API_BASE_URL}/student-profiles/${id}`, {
      method: "DELETE",
    });
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({ message: 'Failed to delete student profile.' }));
      throw new Error(errorData.message || 'An unknown error occurred.');
    }
    return response.json();
  },
};
