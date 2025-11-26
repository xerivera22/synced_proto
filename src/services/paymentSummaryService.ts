import API_BASE_URL from "@/config/api";
export const paymentSummaryService = {
  async getPaymentSummary() {
    const response = await fetch(`${API_BASE_URL}/payment-summary`);
    return response.json();
  },

  async createPaymentSummary(data: any) {
    const response = await fetch(`${API_BASE_URL}/payment-summary`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    return response.json();
  },
};
