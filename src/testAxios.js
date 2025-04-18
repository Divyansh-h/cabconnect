// filepath: d:\project\src\testAxios.js
import axios from "axios";

// Use the environment variable for the backend URL
const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL, // Frontend environment variable
});

const fetchData = async () => {
  try {
    const response = await api.get("/api/users"); // Base URL is automatically prepended
    console.log("Data:", response.data);
  } catch (error) {
    console.error("Error fetching data:", error.response?.data || error.message);
  }
};

fetchData();