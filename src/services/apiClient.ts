const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:4000";

const apiClient = async (endpoint, options = {}) => {
  const url = `${API_BASE_URL}${endpoint}`;

  const config = {
    headers: {
      "Content-Type": "application/json",
      ...options.headers,
    },
    ...options,
  };

  const response = await fetch(url, config);

  if (!response.ok) {
    const error = new Error(`API Error: ${response.statusText}`);
    error.status = response.status;
    throw error;
  }

  return response.json();
};

export default apiClient;
