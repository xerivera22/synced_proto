import API_BASE_URL from "@/config/api";

export const studentMetricsService = {
  async getStudentMetrics() {
    const response = await fetch(`${API_BASE_URL}/student-metrics`);
    return response.json();
  },

  async createStudentMetrics(data: any) {
    const response = await fetch(`${API_BASE_URL}/student-metrics`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    return response.json();
  },
};
