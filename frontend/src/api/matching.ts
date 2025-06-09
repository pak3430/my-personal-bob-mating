// frontend/src/api/matching.ts
import axios from "axios";

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:8080";

const matchingApi = axios.create({
  baseURL: `${API_BASE_URL}/api/matching`,
  headers: { "Content-Type": "application/json" },
});

matchingApi.interceptors.request.use((config) => {
  const token = localStorage.getItem("accessToken");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const createMatchingRequest = async (requestData: any) => {
  const response = await matchingApi.post("/request", requestData);
  return response.data;
};

export const getMatchingResults = async (userId: string) => {
  const response = await matchingApi.get(`/results/${userId}`);
  return response.data;
};

export const acceptMatching = async (matchId: string) => {
  const response = await matchingApi.post(`/accept/${matchId}`);
  return response.data;
};

export const rejectMatching = async (matchId: string) => {
  const response = await matchingApi.post(`/reject/${matchId}`);
  return response.data;
};
