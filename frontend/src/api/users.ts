// frontend/src/api/users.ts
import axios from "axios";

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:8080";

const usersApi = axios.create({
  baseURL: `${API_BASE_URL}/api/users`,
  headers: { "Content-Type": "application/json" },
});

// 인터셉터를 사용하여 인증 토큰 자동 추가
usersApi.interceptors.request.use((config) => {
  const token = localStorage.getItem("accessToken");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const getUserProfile = async (userId: string) => {
  const response = await usersApi.get(`/${userId}/profile`);
  return response.data;
};

export const updateUserProfile = async (userId: string, profileData: any) => {
  const response = await usersApi.put(`/${userId}/profile`, profileData);
  return response.data;
};
