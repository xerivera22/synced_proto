import API_BASE_URL from "@/config/api";

export const studentRecordService = {
  async getStudentRecords() {
    const response = await fetch(`${API_BASE_URL}/student-records`);
    return response.json();
  },

  async createStudentRecord(data: any) {
    const response = await fetch(`${API_BASE_URL}/student-records`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    return response.json();
  },
};
