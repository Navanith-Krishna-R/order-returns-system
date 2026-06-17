import axios from "axios";

const API_BASE_URL =
  import.meta.env.VITE_API_URL || "http://localhost:5000";

const api = axios.create({
  baseURL: `${API_BASE_URL}/api/returns`,
});

export const fetchReturns = async () => {
  const response = await api.get("/");
  return response.data;
};

export const createReturn = async (returnData) => {
  const response = await api.post("/", returnData);
  return response.data;
};

export const deleteReturn = async (id) => {
  const response = await api.delete(`/${id}`);
  return response.data;
};
