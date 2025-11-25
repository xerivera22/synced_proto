import API_BASE_URL from "../config/api.js";

export const facultyRecordService = {
  async getFacultyRecords() {
    const response = await fetch(`${API_BASE_URL}/faculty-records`);
    return response.json();
  },

  async createFacultyRecord(data: any) {
    const response = await fetch(`${API_BASE_URL}/faculty-records`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    return response.json();
  },
};
