import API_BASE_URL from "../config/api.js";

export const paymentRecordService = {
  async getPaymentRecords() {
    const response = await fetch(`${API_BASE_URL}/payment-records`);
    return response.json();
  },

  async createPaymentRecord(data: any) {
    const response = await fetch(`${API_BASE_URL}/payment-records`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    return response.json();
  },
};
