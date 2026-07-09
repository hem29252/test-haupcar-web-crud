import axios from "axios";

const httpClient = axios.create({
  baseURL: import.meta.env.VITE_HAUPCAR_API_BASE_URL || "http://localhost:3000",
});

export default httpClient;
