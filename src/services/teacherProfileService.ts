import API_BASE_URL from "../config/api.js";

export const teacherProfileService = {
  async getTeacherProfiles() {
    const response = await fetch(`${API_BASE_URL}/teacher-profiles`);
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
    return response.json();
  },
};
