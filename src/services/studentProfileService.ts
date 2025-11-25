import API_BASE_URL from "../config/api.js";

export const studentProfileService = {
  async getStudentProfiles() {
    const response = await fetch(`${API_BASE_URL}/student-profiles`);
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
    return response.json();
  },
};
