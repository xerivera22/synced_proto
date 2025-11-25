import API_BASE_URL from "../config/api.js";

export const subjectService = {
  async getSubjects() {
    const response = await fetch(`${API_BASE_URL}/subjects`);
    return response.json();
  },

  async createSubject(data: any) {
    const response = await fetch(`${API_BASE_URL}/subjects`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    return response.json();
  },
};
